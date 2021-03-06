/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class DeleteApiKeyAdmin extends RockCommand {
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
    {
      name: 'user',
      description: 'user email',
      required: true,
      hidden: false,
    },
  ];

  static description = `delete an api key for any user in your organization. accessible to admin users only
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `DELETE: /v1/orgs/self/users/{user}/apikeys/{name}`,
  )}


Endpoint Reference
DELETE: /v1/orgs/self/users/{user}/apikeys/{name}
Delete API Key (any user)
Delete an API key for any user in your organization. Accessible to Admin users only.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#deleteapikeyadmin`)}`;

  static examples = ['$ rockset api:apikeys:deleteApiKeyAdmin NAME USER'];

  async run() {
    const { args, flags } = this.parse(DeleteApiKeyAdmin);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = DeleteApiKeyAdmin.args;

    // apicall
    const apicall = client.apikeys.deleteApiKeyAdmin.bind(client.apikeys);

    // endpoint
    const endpoint = '/v1/orgs/self/users/{user}/apikeys/{name}';
    const method = 'DELETE';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default DeleteApiKeyAdmin;
