/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import { cli } from 'cli-ux';

class DeleteApiKey extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),

    raw: flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags(),
  };

  static args = [
    {
      name: 'name',
      description: 'name of the API key',
      required: true,
      hidden: false,
    },
  ];

  static description = `
Delete API Key

Delete an API key for the authenticated user.

Endpoint: DELETE: /v1/orgs/self/users/self/apikeys/{name}

Endpoint Documentation: https://docs.rockset.com/rest-api#deleteapikey

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(DeleteApiKey);

    // Rockset client object
    const client = await main.createClient();

    // Arguments for API call. These arguments are the same as DeleteApiKey.args for a GET request
    const namedArgs: Args = [
      {
        name: 'name',
        description: 'name of the API key',
        required: true,
        hidden: false,
      },
    ];

    // apicall
    const apicall = client.apikeys.deleteApiKey.bind(client.apikeys);

    // endpoint
    const endpoint = '/v1/orgs/self/users/self/apikeys/{name}';
    const method = 'DELETE';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint });
  }
}

export default DeleteApiKey;
