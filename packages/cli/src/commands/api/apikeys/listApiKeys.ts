/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class ListApiKeys extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),

    raw: flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags({ only: ['columns', 'output'] }),
  };

  static args = [];

  static description = `list all api keys for the authenticated user
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/users/self/apikeys`,
  )}


Endpoint Reference
GET: /v1/orgs/self/users/self/apikeys
List API Keys
List all API keys for the authenticated user.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#listapikeys`)}`;

  static examples = ['$ rockset api:apikeys:listApiKeys '];

  async run() {
    const { args, flags } = this.parse(ListApiKeys);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = ListApiKeys.args;

    // apicall
    const apicall = client.apikeys.listApiKeys.bind(client.apikeys);

    // endpoint
    const endpoint = '/v1/orgs/self/users/self/apikeys';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default ListApiKeys;
