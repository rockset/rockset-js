/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

class ListApiKeys extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
    file: flags.string({
      char: 'f',
      description: 'The config file to execute this command from. Format must be [yaml|json]',
    }),
  };

  static args = [];

  static description = `
List API Keys

List all API keys for the authenticated user.

Endpoint: GET: /v1/orgs/self/users/self/apikeys

Endpoint Documentation: https://docs.rockset.com/rest-api#listapikeys

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(ListApiKeys);

    // Rockset client object
    const client = await main.createClient();

    // Arguments
    const namedArgs: Args = ListApiKeys.args;

    // apicall
    const apicall = client.apikeys.listApiKeys.bind(client.apikeys);

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall });
  }
}

export default ListApiKeys;
