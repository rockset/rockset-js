/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class GetCurrentUser extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),

    raw: flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags({ only: ['columns', 'output'] }),
  };

  static args = [];

  static description = `
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/users/self`,
  )}


Endpoint Reference
GET: /v1/orgs/self/users/self
Get Current User
Retrieve currently active user.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#getcurrentuser`)}`;

  static examples = ['$ rockset api:users:getCurrentUser '];

  async run() {
    const { args, flags } = this.parse(GetCurrentUser);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = GetCurrentUser.args;

    // apicall
    const apicall = client.users.getCurrentUser.bind(client.users);

    // endpoint
    const endpoint = '/v1/orgs/self/users/self';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default GetCurrentUser;
