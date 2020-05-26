/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

class CreateUser extends RockCommand {
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
Create User

Create a new user for an organization.

Endpoint: POST: /v1/orgs/self/users

Endpoint Documentation: https://docs.rockset.com/rest-api#createuser

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(CreateUser);

    // Rockset client object
    const client = await main.createClient();

    // Arguments
    const namedArgs: Args = CreateUser.args;

    // apicall
    const apicall = client.users.createUser.bind(client.users);

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall });
  }
}

export default CreateUser;
