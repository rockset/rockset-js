/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Command, flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';

class GetWorkspace extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
    file: flags.string({
      char: 'f',
      description: 'The config file to execute this command from. Format must be [yaml|json]',
    }),
  };

  static args = [
    {
      name: 'workspace',
      description: 'name of the workspace',
      required: true,
      hidden: false,
    },
  ];

  static description = `
Get Workspace

Get information about a single workspace.

Endpoint: GET: /v1/orgs/self/ws/{workspace}

Endpoint Documentation: https://docs.rockset.com/rest-api#getworkspace

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(GetWorkspace);

    // Rockset client object
    const client = await main.createClient();

    // Arguments
    const namedArgs: Args = GetWorkspace.args;

    // apicall
    const apicall = client.workspaces.getWorkspace.bind(client.workspaces);

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall });
  }
}

export default GetWorkspace;
