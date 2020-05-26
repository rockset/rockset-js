/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

class WorkspaceCollections extends RockCommand {
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
List Collections for Workspace

Retrieve all collections in a workspace.

Endpoint: GET: /v1/orgs/self/ws/{workspace}/collections

Endpoint Documentation: https://docs.rockset.com/rest-api#workspacecollections

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(WorkspaceCollections);

    // Rockset client object
    const client = await main.createClient();

    // Arguments
    const namedArgs: Args = WorkspaceCollections.args;

    // apicall
    const apicall = client.collections.workspaceCollections.bind(client.collections);

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall });
  }
}

export default WorkspaceCollections;
