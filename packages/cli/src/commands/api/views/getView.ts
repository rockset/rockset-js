/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Flags } from '@oclif/core';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class GetView extends RockCommand {
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
    {
      name: 'view',
      description: 'name of the view',
      required: true,
      hidden: false,
    },
  ];

  static description = `get details about a view
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/ws/{workspace}/views/{view}`,
  )}


Endpoint Reference
GET: /v1/orgs/self/ws/{workspace}/views/{view}
Retrieve View
Get details about a view

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#getview`)}`;

  static examples = ['$ rockset api:views:getView WORKSPACE VIEW'];

  async run() {
    const { args, flags } = await this.parse(GetView);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = GetView.args;

    // apicall
    const apicall = client.views.getView.bind(client.views);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/views/{view}';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default GetView;
