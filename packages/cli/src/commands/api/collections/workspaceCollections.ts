// Generated file, please do not edit directly

import { Command, flags } from '@oclif/command';
import * as _ from 'lodash';
import { createClient } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';


class WorkspaceCollections extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
    file: flags.string({
      char: 'f',
      description: 'The config file to execute this command from. Format must be [yaml|json]',
    }),
  };

  static args = [
  {
    "name": "workspace",
    "description": "name of the workspace",
    "required": true,
    "hidden": false
  }
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
    const client = await createClient();

    // Arguments
    const namedArgs :Args = [
  {
    "name": "workspace",
    "description": "name of the workspace",
    "required": true,
    "hidden": false
  }
];

    // apicall 
    const apicall = client.collections.workspaceCollections.bind(client.collections);

    runApiCall({args, flags, namedArgs, apicall, log: this.log, error: this.error});
  }
}

export default WorkspaceCollections;
