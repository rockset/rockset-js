/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class ListWorkspaces extends RockCommand {
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
      name: 'fetch_across_regions',
      required: true,
      hidden: false,
    },
  ];

  static description = `list all workspaces in an organization
Arguments to this command will be passed as URL parameters to ${chalk.bold(`GET: /v1/orgs/self/ws`)}


Endpoint Reference
GET: /v1/orgs/self/ws
List Workspaces
List all workspaces in an organization.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#listworkspaces`)}`;

  static examples = ['$ rockset api:workspaces:listWorkspaces FETCH_ACROSS_REGIONS'];

  async run() {
    const { args, flags } = this.parse(ListWorkspaces);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = ListWorkspaces.args;

    // apicall
    const apicall = client.workspaces.listWorkspaces.bind(client.workspaces);

    // endpoint
    const endpoint = '/v1/orgs/self/ws';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default ListWorkspaces;
