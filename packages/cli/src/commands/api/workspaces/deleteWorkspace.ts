/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Flags } from '@oclif/core';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class DeleteWorkspace extends RockCommand {
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

  static description = `remove a workspace
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `DELETE: /v1/orgs/self/ws/{workspace}`,
  )}


Endpoint Reference
DELETE: /v1/orgs/self/ws/{workspace}
Delete Workspace
Remove a workspace.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#deleteworkspace`)}`;

  static examples = ['$ rockset api:workspaces:deleteWorkspace WORKSPACE'];

  async run() {
    const { args, flags } = await this.parse(DeleteWorkspace);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = DeleteWorkspace.args;

    // apicall
    const apicall = client.workspaces.deleteWorkspace.bind(client.workspaces);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}';
    const method = 'DELETE';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default DeleteWorkspace;
