/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Command, flags } from '@oclif/command';
import { createClient } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';

class CreateIntegration extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
    file: flags.string({
      char: 'f',
      description: 'The config file to execute this command from. Format must be [yaml|json]',
    }),
  };

  static args = [
    {
      name: 'body',
      description: 'integration credentials',
      required: true,
      hidden: false,
    },
  ];

  static description = `
Create Integration

Create a new integration with Rockset.

Endpoint: POST: /v1/orgs/self/integrations

Endpoint Documentation: https://docs.rockset.com/rest-api#createintegration

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(CreateIntegration);

    // Rockset client object
    const client = await createClient();

    // Arguments
    const namedArgs: Args = CreateIntegration.args;

    // apicall
    const apicall = client.integrations.createIntegration.bind(client.integrations);

    runApiCall.bind(this)({ args, flags, namedArgs, apicall });
  }
}

export default CreateIntegration;
