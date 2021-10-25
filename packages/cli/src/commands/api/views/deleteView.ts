/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class DeleteView extends RockCommand {
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
    {
      name: 'view',
      description: 'name of the view',
      required: true,
      hidden: false,
    },
  ];

  static description = `delete a view
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `DELETE: /v1/orgs/self/ws/{workspace}/views/{view}`,
  )}


Endpoint Reference
DELETE: /v1/orgs/self/ws/{workspace}/views/{view}
Delete View
Delete a view

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#deleteview`)}`;

  static examples = ['$ rockset api:views:deleteView WORKSPACE VIEW'];

  async run() {
    const { args, flags } = this.parse(DeleteView);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = DeleteView.args;

    // apicall
    const apicall = client.views.deleteView.bind(client.views);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/views/{view}';
    const method = 'DELETE';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default DeleteView;
