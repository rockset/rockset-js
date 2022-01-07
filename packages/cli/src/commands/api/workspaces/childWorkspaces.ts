/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Flags } from '@oclif/core';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class ChildWorkspaces extends RockCommand {
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

  static description = `list workspaces under given workspace
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/ws/{workspace}/ws`,
  )}


Endpoint Reference
GET: /v1/orgs/self/ws/{workspace}/ws
List Workspaces in Workspace
List workspaces under given workspace.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#childworkspaces`)}`;

  static examples = ['$ rockset api:workspaces:childWorkspaces WORKSPACE'];

  async run() {
    const { args, flags } = await this.parse(ChildWorkspaces);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = ChildWorkspaces.args;

    // apicall
    const apicall = client.workspaces.childWorkspaces.bind(client.workspaces);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/ws';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default ChildWorkspaces;
