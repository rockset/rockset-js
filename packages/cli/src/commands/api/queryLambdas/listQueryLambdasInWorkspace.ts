// Generated file, please do not edit directly

import { Command, flags } from '@oclif/command';
import * as _ from 'lodash';
import { createClient } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';


class ListQueryLambdasInWorkspace extends Command {
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
List Query Lambdas

List all Query Lambdas under given workspace.

Endpoint: GET: /v1/orgs/self/ws/{workspace}/lambdas

Endpoint Documentation: https://docs.rockset.com/rest-api#listquerylambdasinworkspace

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(ListQueryLambdasInWorkspace);

    // Rockset client object
    const client = await createClient();

    // Arguments
    const namedArgs :Args = ListQueryLambdasInWorkspace.args;

    // apicall 
    const apicall = client.queryLambdas.listQueryLambdasInWorkspace.bind(client.queryLambdas);

    runApiCall.bind(this)({args, flags, namedArgs, apicall});
  }
}

export default ListQueryLambdasInWorkspace;
