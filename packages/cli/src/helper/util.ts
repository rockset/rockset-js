/* eslint-disable unicorn/no-abusive-eslint-disable */
import * as Parser from '@oclif/parser';
import * as _ from 'lodash';
import { makeAbsolute, readConfigFromPath } from '@rockset/core/dist/filesystem/pathutil';
import { RockCommand } from '../base-command';
import { performance } from 'perf_hooks';
import { wait, prettyPrint } from '@rockset/core/dist/helper';
import { cli } from 'cli-ux';
import * as YAML from 'yaml';
import prompts = require('prompts');

export type Args = Parser.args.Input;
interface Options {
  [key: string]: unknown;
  sort?: string;
  filter?: string;
  columns?: string;
  extended?: boolean;
  'no-truncate'?: boolean;
  output?: string;
  'no-header'?: boolean;
  printLine?(s: unknown): unknown;
}
export interface Flags extends Options {
  body?: string;
  loadTestRps?: number;
  yes?: boolean;
  raw?: boolean;
}
export type Apicall<A extends unknown[], Return> = (...a: A) => Promise<Return>;

export function showTable(data: object[], flags: Options) {
  const columns = Object.getOwnPropertyNames(data?.[0] ?? {});
  const col = columns.reduce((obj, cur) => ({ ...obj, [cur]: { header: cur } }), {});

  cli.table(data, col, { ...flags });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function runApiCall<A extends any[], Return>(
  this: RockCommand,
  {
    args,
    flags,
    namedArgs,
    apicall,
    method,
    endpoint,
  }: {
    args: Record<string, string>;
    flags: Flags;
    namedArgs: Args;
    apicall: Apicall<A, Return>;
    method: string;
    endpoint: string;
    bodySchema: string;
  },
) {
  const log = this.log.bind(this) ?? console.log;

  // This function shows a regular object in a table by wrapping it in an array
  // Special case when the output is set to JSON or YAML (otherwise there will be an extra bracket in the output)
  function showObjectAsTable(data: object, flags: Options) {
    if (flags.output === 'json') {
      log(prettyPrint(data));
    } else if (flags.output === 'yaml') {
      log(YAML.stringify(data));
    } else {
      showTable([data], flags);
    }
  }

  // Pass the URL arguments directly into the api call
  const allArgs: unknown[] = namedArgs
    .filter((arg) => arg.name !== 'body')
    .map((arg) => args[arg.name]);

  // This path is only taken for POST requests
  if (flags.body) {
    // Load the specified file
    const configRaw: Record<string, unknown> = (await readConfigFromPath(
      makeAbsolute(flags.body),
      'YAML',
    )) as Record<string, string>;
    allArgs.push(configRaw);
  }

  this.info(`${method}: ${endpoint}`);
  const argObj = _.zipObject(
    namedArgs.map((arg) => arg.name),
    allArgs,
  );
  if (!_.isEmpty(argObj)) {
    this.info(`Arguments: \n${JSON.stringify(argObj, null, 2)}`);
  }

  const loadTestRps = flags.loadTestRps;
  if (loadTestRps) {
    await loadTest.bind(this)(() => apicall(...(allArgs as A)), loadTestRps, flags.yes);
  } else {
    type R = Return & { results?: unknown; data?: unknown };
    const data = (await apicall(...(allArgs as A))) as R;
    const uData = data?.results ?? data?.data ?? data;
    const unwrapData = flags.raw ? data : uData;

    if (_.isArray(unwrapData)) {
      showTable(unwrapData, { ...flags });
    } else if (_.isObject(unwrapData)) {
      showObjectAsTable(unwrapData, flags);
    } else {
      log(prettyPrint(unwrapData));
    }
  }
}

export async function shouldLoadTest(rps: number, skipConfirmation = false) {
  if (skipConfirmation) {
    return true;
  }
  const { c } = (await prompts({
    type: 'confirm',
    name: 'c',
    initial: false,
    message: `Please confirm that you would like to send ${rps} API requests per second to the endpoint show above.
Sending huge amounts of requests may cause performance issues for the rest of your organization. Please be careful`,
  })) as { c: boolean };

  return c;
}

export async function loadTest<Data>(
  this: RockCommand,
  apiCall: () => Promise<Data>,
  rps: number,
  skipConfirmation = false,
) {
  const proceed = await shouldLoadTest(rps, skipConfirmation);
  if (!proceed) {
    this.error('Load test aborted.');
  }

  const exceptions = [];
  const data = [];
  const successLatency: number[] = [];
  const errLatency: number[] = [];
  let total = 0;

  this.info('Starting load test');
  const execute = async () => {
    const startTime = performance.now();

    try {
      total += 1;
      const d = await apiCall();
      const endTime = performance.now();
      const latency = endTime - startTime;

      // Update the log
      data.push(d);
      successLatency.push(latency);
    } catch (error) {
      const endTime = performance.now();
      const latency = endTime - startTime;

      exceptions.push(error);
      errLatency.push(latency);
    }
  };

  // Execute rps api calls
  const arr = [...new Array(rps).keys()];
  const executeLoop = async () =>
    arr.map(async () => {
      // Wait a random amount of time less than 1 second (to distribute the load)
      await wait(Math.random() * 1000);
      return execute();
    });

  // Run once per second
  setInterval(() => {
    // Silence errors: they should be handled above
    executeLoop().catch(() => null);

    const avgLatency = successLatency.reduce((a, b) => a + b, 0) / successLatency.length;
    const avgFailLatency = errLatency.reduce((a, b) => a + b, 0) / errLatency.length;
    const pending = total - successLatency.length - errLatency.length;
    this.log(`
**** 
Sent: ${total}
Success: ${successLatency.length}
Failure: ${errLatency.length}
Pending: ${pending}
Average Success Latency: ${Math.round(avgLatency)} ms
Average Failure Latency: ${Math.round(avgFailLatency)} ms

    `);
  }, 1000);
}
