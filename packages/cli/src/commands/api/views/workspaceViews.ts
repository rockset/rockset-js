/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class WorkspaceViews extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),

    raw: flags.boolean({
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

  static description = `retrieve all views in a workspace
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/ws/{workspace}/views`,
  )}


Endpoint Reference
GET: /v1/orgs/self/ws/{workspace}/views
List Views in Workspace
Retrieve all views in a workspace.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#workspaceviews`)}`;

  static examples = ['$ rockset api:views:workspaceViews WORKSPACE'];

  async run() {
    const { args, flags } = this.parse(WorkspaceViews);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = WorkspaceViews.args;

    // apicall
    const apicall = client.views.workspaceViews.bind(client.views);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/views';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default WorkspaceViews;
