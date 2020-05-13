/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Command, flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';

class GetCurrentUser extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
    file: flags.string({
      char: 'f',
      description: 'The config file to execute this command from. Format must be [yaml|json]',
    }),
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

    // Arguments
    const namedArgs: Args = GetCurrentUser.args;

    // apicall
    const apicall = client.users.getCurrentUser.bind(client.users);

    runApiCall.bind(this)({ args, flags, namedArgs, apicall });
  }
}

export default GetCurrentUser;
