/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

class ListWorkspaces extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
    file: flags.string({
      char: 'f',
      description:
        'The config file to execute this command from. Format must be json. Keys are translated into arguments of the same name. If no BODY argument is specified, the whole object, minus keys used as other arguments, will be passed in as the BODY.',
    }),
  };

  static args = [];

  static description = `
List Workspaces

List all workspaces.

Endpoint: GET: /v1/orgs/self/ws

Endpoint Documentation: https://docs.rockset.com/rest-api#listworkspaces

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(ListWorkspaces);

    // Rockset client object
    const client = await main.createClient();

    // Arguments
    const namedArgs: Args = ListWorkspaces.args;

    // apicall
    const apicall = client.workspaces.listWorkspaces.bind(client.workspaces);

    // endpoint
    const endpoint = '/v1/orgs/self/ws';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint });
  }
}

export default ListWorkspaces;
