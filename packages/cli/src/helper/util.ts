
import * as Parser from '@oclif/parser';

export type Args = Parser.args.Input;
export type Flags = {file: string};
export type Apicall = (...a: any) => Promise<any>;

export const runApiCall = async ({args, flags, namedArgs, apicall, log, error}: {
  args: Record<string, string>,
  flags: Flags,
  namedArgs: Args,
  apicall: Apicall,
  log: Function,
  error: Function
}) => {

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