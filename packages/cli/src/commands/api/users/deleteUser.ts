/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Flags } from '@oclif/core';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class DeleteUser extends RockCommand {
  static flags = {
    help: Flags.help({ char: 'h' }),
    raw: Flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags({ only: ['columns', 'output'] }),
  };

  static args = [
    {
      name: 'user',
      description: 'user email',
      required: true,
      hidden: false,
    },
  ];

  static description = `delete a user from an organization
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `DELETE: /v1/orgs/self/users/{user}`,
  )}


Endpoint Reference
DELETE: /v1/orgs/self/users/{user}
Delete User
Delete a user from an organization.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#deleteuser`)}`;

  static examples = ['$ rockset api:users:deleteUser USER'];

  async run() {
    const { args, flags } = await this.parse(DeleteUser);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = DeleteUser.args;

    // apicall
    const apicall = client.users.deleteUser.bind(client.users);

    // endpoint
    const endpoint = '/v1/orgs/self/users/{user}';
    const method = 'DELETE';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default DeleteUser;
