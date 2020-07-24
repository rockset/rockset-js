/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import { cli } from 'cli-ux';

class DeleteUser extends RockCommand {
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

    // Arguments for API call. These arguments are the same as DeleteUser.args for a GET request
    const namedArgs: Args = [
      {
        name: 'user',
        description: 'user email',
        required: true,
        hidden: false,
      },
    ];

    // apicall
    const apicall = client.users.deleteUser.bind(client.users);

    // endpoint
    const endpoint = '/v1/orgs/self/users/{user}';
    const method = 'DELETE';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint });
  }
}

export default DeleteUser;
