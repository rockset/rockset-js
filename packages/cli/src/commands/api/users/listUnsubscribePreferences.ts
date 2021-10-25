/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class ListUnsubscribePreferences extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),

    raw: flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags({ only: ['columns', 'output'] }),
  };

  static args = [];

  static description = `get all notification preferences
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/users/self/preferences`,
  )}


Endpoint Reference
GET: /v1/orgs/self/users/self/preferences
Get all notification preferences
Get all notification preferences.

More documentation at ${chalk.underline(
    `https://docs.rockset.com/rest-api#listunsubscribepreferences`,
  )}`;

  static examples = ['$ rockset api:users:listUnsubscribePreferences '];

  async run() {
    const { args, flags } = this.parse(ListUnsubscribePreferences);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = ListUnsubscribePreferences.args;

    // apicall
    const apicall = client.users.listUnsubscribePreferences.bind(client.users);

    // endpoint
    const endpoint = '/v1/orgs/self/users/self/preferences';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default ListUnsubscribePreferences;
