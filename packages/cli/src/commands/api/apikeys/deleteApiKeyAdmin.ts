/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Command, flags } from '@oclif/command';
import { createClient } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';

class DeleteApiKeyAdmin extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
    file: flags.string({
      char: 'f',
      description: 'The config file to execute this command from. Format must be [yaml|json]',
    }),
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
      required: true,
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
    const client = await createClient();

    // Arguments
    const namedArgs: Args = DeleteApiKeyAdmin.args;

    // apicall
    const apicall = client.apikeys.deleteApiKeyAdmin.bind(client.apikeys);

    runApiCall.bind(this)({ args, flags, namedArgs, apicall });
  }
}

export default DeleteApiKeyAdmin;
