/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Command, flags } from '@oclif/command';
import { createClient } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';

class CreateApiKey extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
    file: flags.string({
      char: 'f',
      description: 'The config file to execute this command from. Format must be [yaml|json]',
    }),
  };

  static args = [
    {
      name: 'body',
      description: 'JSON object',
      required: true,
      hidden: false,
    },
  ];

  static description = `
Create API Key

Create a new API key for the authenticated user.

Endpoint: POST: /v1/orgs/self/users/self/apikeys

Endpoint Documentation: https://docs.rockset.com/rest-api#createapikey

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(CreateApiKey);

    // Rockset client object
    const client = await createClient();

    // Arguments
    const namedArgs: Args = CreateApiKey.args;

    // apicall
    const apicall = client.apikeys.createApiKey.bind(client.apikeys);

    runApiCall.bind(this)({ args, flags, namedArgs, apicall });
  }
}

export default CreateApiKey;
