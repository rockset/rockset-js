/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class GetIntegration extends RockCommand {
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
      name: 'integration',
      description: 'name of the integration',
      required: true,
      hidden: false,
    },
  ];

  static description = `get information about a single integration
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/integrations/{integration}`,
  )}


Endpoint Reference
GET: /v1/orgs/self/integrations/{integration}
Get Integration
Get information about a single integration.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#getintegration`)}`;

  static examples = ['$ rockset api:integrations:getIntegration INTEGRATION'];

  async run() {
    const { args, flags } = this.parse(GetIntegration);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = GetIntegration.args;

    // apicall
    const apicall = client.integrations.getIntegration.bind(client.integrations);

    // endpoint
    const endpoint = '/v1/orgs/self/integrations/{integration}';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default GetIntegration;
