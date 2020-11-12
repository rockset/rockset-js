/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class ListApiKeysAdmin extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),

    raw: flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags({ only: ['columns', 'output'] }),
  };

  static args = [
    {
      name: 'user',
      description: 'user email',
      required: true,
      hidden: false,
    },
  ];

  static description = `list all api keys for any user in your organization. accessible to admin users only
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/users/{user}/apikeys`,
  )}


Endpoint Reference
GET: /v1/orgs/self/users/{user}/apikeys
List API Keys (any user)
List all API keys for any user in your organization. Accessible to Admin users only.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#listapikeysadmin`)}`;

  static examples = ['$ rockset api:apikeys:listApiKeysAdmin USER'];

  async run() {
    const { args, flags } = this.parse(ListApiKeysAdmin);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = ListApiKeysAdmin.args;

    // apicall
    const apicall = client.apikeys.listApiKeysAdmin.bind(client.apikeys);

    // endpoint
    const endpoint = '/v1/orgs/self/users/{user}/apikeys';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default ListApiKeysAdmin;
