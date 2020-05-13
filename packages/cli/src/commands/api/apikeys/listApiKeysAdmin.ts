/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Command, flags } from '@oclif/command';
import { createClient } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';

class ListApiKeysAdmin extends Command {
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
      required: true,
      hidden: false,
    },
  ];

  static description = `
List API Keys for any user (admin only)

List all API keys for any user (admin only).

Endpoint: GET: /v1/orgs/self/users/{user}/apikeys

Endpoint Documentation: https://docs.rockset.com/rest-api#listapikeysadmin

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(ListApiKeysAdmin);

    // Rockset client object
    const client = await createClient();

    // Arguments
    const namedArgs: Args = ListApiKeysAdmin.args;

    // apicall
    const apicall = client.apikeys.listApiKeysAdmin.bind(client.apikeys);

    runApiCall.bind(this)({ args, flags, namedArgs, apicall });
  }
}

export default ListApiKeysAdmin;
