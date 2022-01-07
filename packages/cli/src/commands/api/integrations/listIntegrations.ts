/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Flags } from '@oclif/core';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class ListIntegrations extends RockCommand {
  static flags = {
    help: Flags.help({ char: 'h' }),
    raw: Flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags({ only: ['columns', 'output'] }),
  };

  static args = [];

  static description = `list all integrations in an organization
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/integrations`,
  )}


Endpoint Reference
GET: /v1/orgs/self/integrations
List Integrations
List all integrations in an organization.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#listintegrations`)}`;

  static examples = ['$ rockset api:integrations:listIntegrations '];

  async run() {
    const { args, flags } = await this.parse(ListIntegrations);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = ListIntegrations.args;

    // apicall
    const apicall = client.integrations.listIntegrations.bind(client.integrations);

    // endpoint
    const endpoint = '/v1/orgs/self/integrations';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default ListIntegrations;
