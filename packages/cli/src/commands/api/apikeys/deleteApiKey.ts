/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class DeleteApiKey extends RockCommand {
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
      name: 'name',
      description: 'name of the API key',
      required: true,
      hidden: false,
    },
  ];

  static description = `delete an api key for the authenticated user
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `DELETE: /v1/orgs/self/users/self/apikeys/{name}`,
  )}


Endpoint Reference
DELETE: /v1/orgs/self/users/self/apikeys/{name}
Delete API Key
Delete an API key for the authenticated user.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#deleteapikey`)}`;

  static examples = ['$ rockset api:apikeys:deleteApiKey NAME'];

  async run() {
    const { args, flags } = this.parse(DeleteApiKey);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = DeleteApiKey.args;

    // apicall
    const apicall = client.apikeys.deleteApiKey.bind(client.apikeys);

    // endpoint
    const endpoint = '/v1/orgs/self/users/self/apikeys/{name}';
    const method = 'DELETE';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default DeleteApiKey;
