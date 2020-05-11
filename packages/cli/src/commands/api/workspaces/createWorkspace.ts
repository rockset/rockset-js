// Generated file, please do not edit directly

import { Command, flags } from '@oclif/command';
import * as _ from 'lodash';
import { createClient } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';


class CreateWorkspace extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
    file: flags.string({
      char: 'f',
      description: 'The config file to execute this command from. Format must be [yaml|json]',
    }),
  };

  static args = [
  {
    "name": "body",
    "description": "workspace details",
    "required": true,
    "hidden": false
  }
];
  static description = `
Create Workspace

Create a new workspace in your org.

Endpoint: POST: /v1/orgs/self/ws

Endpoint Documentation: https://docs.rockset.com/rest-api#createworkspace

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(CreateWorkspace);

    // Rockset client object
    const client = await createClient();

    // Arguments
    const namedArgs :Args = CreateWorkspace.args;

    // apicall 
    const apicall = client.workspaces.createWorkspace.bind(client.workspaces);

    runApiCall.bind(this)({args, flags, namedArgs, apicall});
  }
}

export default CreateWorkspace;
