/* eslint-disable unicorn/filename-case */

// Generated file, please do not edit directly

import { Command, flags } from '@oclif/command';
import { createClient } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';

class DeleteWorkspace extends Command {
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
Delete Workspace

Remove a workspace.

Endpoint: DELETE: /v1/orgs/self/ws/{workspace}

Endpoint Documentation: https://docs.rockset.com/rest-api#deleteworkspace

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(DeleteWorkspace);

    // Rockset client object
    const client = await createClient();

    // Arguments
    const namedArgs: Args = DeleteWorkspace.args;

    // apicall
    const apicall = client.workspaces.deleteWorkspace.bind(client.workspaces);

    runApiCall.bind(this)({ args, flags, namedArgs, apicall });
  }
}

export default DeleteWorkspace;
