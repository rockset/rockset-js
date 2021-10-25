/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class ListViews extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),

    raw: flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags({ only: ['columns', 'output'] }),
  };

  static args = [];

  static description = `retrieve all views in an organization
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/views`,
  )}


Endpoint Reference
GET: /v1/orgs/self/views
List Views
Retrieve all views in an organization

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#listviews`)}`;

  static examples = ['$ rockset api:views:listViews '];

  async run() {
    const { args, flags } = this.parse(ListViews);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = ListViews.args;

    // apicall
    const apicall = client.views.listViews.bind(client.views);

    // endpoint
    const endpoint = '/v1/orgs/self/views';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default ListViews;
