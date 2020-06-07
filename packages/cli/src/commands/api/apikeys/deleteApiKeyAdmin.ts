/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

class DeleteApiKeyAdmin extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
    file: flags.string({
      char: 'f',
      description:
        'The config file to execute this command from. Format must be json. Keys are translated into arguments of the same name. If no BODY argument is specified, the whole object, minus keys used as other arguments, will be passed in as the BODY.',
    }),
  };

  static args = [
    {
      name: 'name',
      description: 'name of the API key',
      required: false,
      hidden: false,
    },
    {
      name: 'user',
      required: false,
      hidden: false,
    },
  ];

  static description = `
Delete API Key for any user (admin only)

Delete an API key for any user (admin only).

Endpoint: DELETE: /v1/orgs/self/users/{user}/apikeys/{name}

Endpoint Documentation: https://docs.rockset.com/rest-api#deleteapikeyadmin

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(DeleteApiKeyAdmin);

    // Rockset client object
    const client = await main.createClient();

    // Arguments
    const namedArgs: Args = DeleteApiKeyAdmin.args;

    // apicall
    const apicall = client.apikeys.deleteApiKeyAdmin.bind(client.apikeys);

    // endpoint
    const endpoint = '/v1/orgs/self/users/{user}/apikeys/{name}';
    const method = 'DELETE';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint });
  }
}

export default DeleteApiKeyAdmin;
