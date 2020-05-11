import { Command, flags } from '@oclif/command';
import rocksetConfigure from '@rockset/client';
import * as _ from 'lodash';


const client = rocksetConfigure(
  '1LTIk1DMVeryu6wBhcvWxW0xa2RGxMga7D0LANJyY9zmOfSBh3HlLvxmaFNawdMI',
  'https://master-api.dev.rockset.com',
);

var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /^\s*(_?)(.+?)\1\s*$/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;

function getArgs(fn: Function) {
  const fnText = fn.toString().replace(STRIP_COMMENTS, '');
  const argDecl = fnText.match(FN_ARGS);
  const args =
    argDecl?.[1]
      .split(FN_ARG_SPLIT)
      .map((arg) => {
        return arg.match(FN_ARG)?.[2];
      })
      .filter((x) => x) ?? [];

  return args as string[];
}

const generateClass = (fn: Function) => {
  const namedArgs = getArgs(fn);
  const namedArgsObj = namedArgs?.map((name) => ({ name }));

  class CreateCollection extends Command {
    static description = 'describe the command here';

    static examples = [`$ rock api:query "Select 5" `];

    static flags = {
      help: flags.help({ char: 'h' }),
      // flag with a value (-n, --name=VALUE)
      file: flags.string({
        char: 'f',
        description: 'The config file to execute this command from',
      }),
    };

    static args = namedArgsObj;

    async run() {
      const { args, flags } = this.parse(CreateCollection);

      let allArgs = [];

      if (flags.file) {
        const config: Record<string, any> = require(flags.file);
        const ordArgs = namedArgs.map((arg) => config[arg]);
        const body = _.filter(config, (key: string) => !namedArgs.includes(key));
        allArgs = [...ordArgs, body];
      } else {
        allArgs = namedArgs.map((arg) => args[arg]);
      }

      try {
        const data = await fn(...allArgs);
        console.log(JSON.stringify(data?.results));
      } catch (e) {
        this.error(JSON.stringify(e, null, 2));
      }
    }
  }

  return CreateCollection as any;
};

const ListCollections = generateClass(client.collections.listCollections.bind(client.collections));
export type t = typeof ListCollections;
export default ListCollections;
