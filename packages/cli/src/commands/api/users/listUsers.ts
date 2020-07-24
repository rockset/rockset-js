/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class ListUsers extends RockCommand {
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
    `GET: /v1/orgs/self/users`,
  )}


Endpoint Reference
GET: /v1/orgs/self/users
List Users
Retrieve all users for an organization.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#listusers`)}`;

  static examples = ['$ rockset api:users:listUsers '];

  async run() {
    const { args, flags } = this.parse(ListUsers);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = ListUsers.args;

    // apicall
    const apicall = client.users.listUsers.bind(client.users);

    // endpoint
    const endpoint = '/v1/orgs/self/users';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default ListUsers;
