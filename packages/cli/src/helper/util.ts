/* eslint-disable unicorn/no-abusive-eslint-disable */
import * as Parser from '@oclif/parser';
import Command from '@oclif/command';
import * as _ from 'lodash';

export type Args = Parser.args.Input;
export type Flags = { file?: string };
export type Apicall<A extends unknown[], Return> = (...a: A) => Promise<Return>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function runApiCall<A extends any[], Return>(
  this: Command,
  {
    args,
    flags,
    namedArgs,
    apicall,
  }: {
    args: Record<string, string>;
    flags: Flags;
    namedArgs: Args;
    apicall: Apicall<A, Return>;
  },
) {
  const log = this.log.bind(this) ?? console.log;
  const error = this.error.bind(this) ?? console.error;
  let allArgs = [];

  if (flags.file) {
    // Load the specified file
    const config: Record<string, unknown> = require(flags.file) as Record<string, unknown>;
    const ordArgs = namedArgs.map((arg) => config[arg.name]);
    const body = _.filter(config, (key: string) => !namedArgs.some(({ name }) => name === key));
    allArgs = [...ordArgs, body];
  } else {
    // Pass the arguments directly into the api call
    allArgs = namedArgs.map((arg) => args[arg.name]);
  }

  try {
    type R = Return & { results?: unknown };
    const data = (await apicall(...(allArgs as A))) as R;

    log(JSON.stringify(data?.results ?? data, null, 2));
  } catch (error2) {
    error(JSON.stringify(error2, null, 2));
  }
}
