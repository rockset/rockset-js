/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import { cli } from 'cli-ux';

class GetIntegration extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),

    raw: flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags(),
  };

  static args = [
    {
      name: 'integration',
      description: 'name of the integration',
      required: true,
      hidden: false,
    },
  ];

  static description = `
Get Integration

Get information about a single integration.

Endpoint: GET: /v1/orgs/self/integrations/{integration}

Endpoint Documentation: https://docs.rockset.com/rest-api#getintegration

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(GetIntegration);

    // Rockset client object
    const client = await main.createClient();

    // Arguments for API call. These arguments are the same as GetIntegration.args for a GET request
    const namedArgs: Args = [
      {
        name: 'integration',
        description: 'name of the integration',
        required: true,
        hidden: false,
      },
    ];

    // apicall
    const apicall = client.integrations.getIntegration.bind(client.integrations);

    // endpoint
    const endpoint = '/v1/orgs/self/integrations/{integration}';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint });
  }
}

export default GetIntegration;
