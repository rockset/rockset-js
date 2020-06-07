/* eslint-disable unicorn/no-abusive-eslint-disable */
import * as Parser from '@oclif/parser';
import * as _ from 'lodash';
import { readConfigFromPath, join, cwd } from '@rockset/core/dist/filesystem/pathutil';
import { RockCommand } from '../base-command';

export type Args = Parser.args.Input;
export type Flags = { file?: string };
export type Apicall<A extends unknown[], Return> = (...a: A) => Promise<Return>;

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
  },
) {
  const log = this.log.bind(this) ?? console.log;
  let allArgs = [];

  if (flags.file) {
    // Load the specified file

    const config: Record<string, unknown> = (await readConfigFromPath(
      join(cwd(), flags.file),
    )) as Record<string, string>;

    // For each of the named arguments, pull the corresponding key from the object
    const ordArgs = namedArgs.map((arg) => config[arg.name]).filter((x) => x);

    // The body parameter wasn't specified: extract it from the config
    if (ordArgs.length !== namedArgs.length && !config.body) {
      const body = _.chain(config)
        .entries()
        .filter(([key]) => !namedArgs.some(({ name }) => name === key))
        .fromPairs()
        .value();
      allArgs = [...ordArgs, body];
    } else {
      allArgs = ordArgs;
    }
  } else {
    // Pass the arguments directly into the api call
    allArgs = namedArgs.map((arg) => args[arg.name]);
  }

  this.info(`${method}: ${endpoint}`);
  this.info('Arguments:');
  const argObj = _.zipObject(
    namedArgs.map((arg) => arg.name),
    allArgs,
  );
  this.info(argObj);

  type R = Return & { results?: unknown; data?: unknown };
  const data = (await apicall(...(allArgs as A))) as R;

  log(JSON.stringify(data?.results ?? data?.data ?? data, null, 2));
}
