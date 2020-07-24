/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import { cli } from 'cli-ux';

class GetCurrentUser extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),

    raw: flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags(),
  };

  static args = [];

  static description = `
Get Current User

Retrieve currently active user.

Endpoint: GET: /v1/orgs/self/users/self

Endpoint Documentation: https://docs.rockset.com/rest-api#getcurrentuser

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(GetCurrentUser);

    // Rockset client object
    const client = await main.createClient();

    // Arguments for API call. These arguments are the same as GetCurrentUser.args for a GET request
    const namedArgs: Args = [];

    // apicall
    const apicall = client.users.getCurrentUser.bind(client.users);

    // endpoint
    const endpoint = '/v1/orgs/self/users/self';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint });
  }
}

export default GetCurrentUser;
