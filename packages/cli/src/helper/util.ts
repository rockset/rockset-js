
import * as Parser from '@oclif/parser';
import Command from '@oclif/command';
import * as _ from 'lodash';

export type Args = Parser.args.Input;
export type Flags = {file?: string};
export type Apicall = (...a: any) => Promise<any>;

export async function runApiCall(this: Command, {args, flags, namedArgs, apicall}: {
  args: Record<string, string>,
  flags: Flags,
  namedArgs: Args,
  apicall: Apicall,
}) {

    const log = this.log.bind(this) ?? console.log;
    const error = this.error.bind(this) ?? console.error;
    let allArgs = [];

    if (flags.file) {
      // Load the specified file
      const config: Record<string, any> = require(flags.file);
      const ordArgs = namedArgs.map((arg) => config[arg.name]);
      const body = _.filter(config, (key: string) => !namedArgs.some(({ name }) => name === key));
      allArgs = [...ordArgs, body];
    } else {
      // Pass the arguments directly into the api call
      allArgs = namedArgs.map((arg) => args[arg.name]);
    }

    try {
      const data = await apicall(...allArgs);
      log(JSON.stringify(data?.results ?? data, null, 2));
    } catch (e) {
      error(JSON.stringify(e, null, 2));
    }
}