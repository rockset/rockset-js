/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Flags } from '@oclif/core';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class GetWorkspace extends RockCommand {
  static flags = {
    help: Flags.help({ char: 'h' }),
    raw: Flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags({ only: ['columns', 'output'] }),
  };

  static args = [
    {
      name: 'workspace',
      description: 'name of the workspace',
      required: true,
      hidden: false,
    },
  ];

  static description = `get information about a single workspace
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/ws/{workspace}`,
  )}


Endpoint Reference
GET: /v1/orgs/self/ws/{workspace}
Retrieve Workspace
Get information about a single workspace.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#getworkspace`)}`;

  static examples = ['$ rockset api:workspaces:getWorkspace WORKSPACE'];

  async run() {
    const { args, flags } = await this.parse(GetWorkspace);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = GetWorkspace.args;

    // apicall
    const apicall = client.workspaces.getWorkspace.bind(client.workspaces);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default GetWorkspace;
