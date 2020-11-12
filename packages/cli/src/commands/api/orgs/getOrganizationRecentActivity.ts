/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class GetOrganizationRecentActivity extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),

    raw: flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags({ only: ['columns', 'output'] }),
  };

  static args = [];

  static description = `get information about organization's recent activity
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/activity`,
  )}


Endpoint Reference
GET: /v1/orgs/self/activity
Get Organization Recent Activity
Get information about organization's recent activity.

More documentation at ${chalk.underline(
    `https://docs.rockset.com/rest-api#getorganizationrecentactivity`,
  )}`;

  static examples = ['$ rockset api:orgs:getOrganizationRecentActivity '];

  async run() {
    const { args, flags } = this.parse(GetOrganizationRecentActivity);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = GetOrganizationRecentActivity.args;

    // apicall
    const apicall = client.orgs.getOrganizationRecentActivity.bind(client.orgs);

    // endpoint
    const endpoint = '/v1/orgs/self/activity';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default GetOrganizationRecentActivity;
