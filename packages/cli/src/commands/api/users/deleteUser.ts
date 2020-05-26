/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

class DeleteUser extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
    file: flags.string({
      char: 'f',
      description: 'The config file to execute this command from. Format must be [yaml|json]',
    }),
  };

  static args = [
    {
      name: 'user',
      description: 'user email',
      required: true,
      hidden: false,
    },
  ];

  static description = `
Delete User

Delete a user from an organization.

Endpoint: DELETE: /v1/orgs/self/users/{user}

Endpoint Documentation: https://docs.rockset.com/rest-api#deleteuser

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(DeleteUser);

    // Rockset client object
    const client = await main.createClient();

    // Arguments
    const namedArgs: Args = DeleteUser.args;

    // apicall
    const apicall = client.users.deleteUser.bind(client.users);

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall });
  }
}

export default DeleteUser;
