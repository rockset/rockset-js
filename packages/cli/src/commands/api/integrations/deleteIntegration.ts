/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Flags } from '@oclif/core';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class DeleteIntegration extends RockCommand {
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
      name: 'integration',
      description: 'name of the integration',
      required: true,
      hidden: false,
    },
  ];

  static description = `remove an integration
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `DELETE: /v1/orgs/self/integrations/{integration}`,
  )}


Endpoint Reference
DELETE: /v1/orgs/self/integrations/{integration}
Delete Integration
Remove an integration.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#deleteintegration`)}`;

  static examples = ['$ rockset api:integrations:deleteIntegration INTEGRATION'];

  async run() {
    const { args, flags } = await this.parse(DeleteIntegration);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = DeleteIntegration.args;

    // apicall
    const apicall = client.integrations.deleteIntegration.bind(client.integrations);

    // endpoint
    const endpoint = '/v1/orgs/self/integrations/{integration}';
    const method = 'DELETE';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default DeleteIntegration;
