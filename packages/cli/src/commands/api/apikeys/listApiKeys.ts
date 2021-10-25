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

  static args = [
    {
      name: 'user',
      description:
        'Email of the API key owner. Use `self` to specify the currently authenticated user.',
      required: true,
      hidden: false,
    },
  ];

  static description = `list api key metadata for any user in your organization
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/users/{user}/apikeys`,
  )}


Endpoint Reference
GET: /v1/orgs/self/users/{user}/apikeys
List API Keys.
List API key metadata for any user in your organization.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#listapikeys`)}`;

  static examples = ['$ rockset api:apikeys:listApiKeys USER'];

  async run() {
    const { args, flags } = this.parse(ListApiKeys);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = ListApiKeys.args;

    // apicall
    const apicall = client.apikeys.listApiKeys.bind(client.apikeys);

    // endpoint
    const endpoint = '/v1/orgs/self/users/{user}/apikeys';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default ListApiKeys;
