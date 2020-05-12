/* eslint-disable unicorn/filename-case */

// Generated file, please do not edit directly

import { Command, flags } from '@oclif/command';
import { createClient } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';

class GetIntegration extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
    file: flags.string({
      char: 'f',
      description: 'The config file to execute this command from. Format must be [yaml|json]',
    }),
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
    const client = await createClient();

    // Arguments
    const namedArgs: Args = GetIntegration.args;

    // apicall
    const apicall = client.integrations.getIntegration.bind(client.integrations);

    runApiCall.bind(this)({ args, flags, namedArgs, apicall });
  }
}

export default GetIntegration;
