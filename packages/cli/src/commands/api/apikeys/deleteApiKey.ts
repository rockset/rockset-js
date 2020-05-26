/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

class DeleteApiKey extends RockCommand {
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

    // Arguments
    const namedArgs: Args = DeleteApiKey.args;

    // apicall
    const apicall = client.apikeys.deleteApiKey.bind(client.apikeys);

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall });
  }
}

export default DeleteApiKey;
