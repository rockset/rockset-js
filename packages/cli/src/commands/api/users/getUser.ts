/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class GetUser extends RockCommand {
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
      name: 'user',
      description: 'user email',
      required: true,
      hidden: false,
    },
  ];

  static description = `retrieve user by email
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/users/{user}`,
  )}


Endpoint Reference
GET: /v1/orgs/self/users/{user}
Retrieve User
Retrieve user by email.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#getuser`)}`;

  static examples = ['$ rockset api:users:getUser USER'];

  async run() {
    const { args, flags } = this.parse(GetUser);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = GetUser.args;

    // apicall
    const apicall = client.users.getUser.bind(client.users);

    // endpoint
    const endpoint = '/v1/orgs/self/users/{user}';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default GetUser;
