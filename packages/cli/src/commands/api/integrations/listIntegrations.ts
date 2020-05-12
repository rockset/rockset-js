/* eslint-disable unicorn/filename-case */

// Generated file, please do not edit directly

import { Command, flags } from '@oclif/command';
import { createClient } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';

class ListIntegrations extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
    file: flags.string({
      char: 'f',
      description: 'The config file to execute this command from. Format must be [yaml|json]',
    }),
  };

  static args = [];

  static description = `
List Integrations

List all integrations for organization.

Endpoint: GET: /v1/orgs/self/integrations

Endpoint Documentation: https://docs.rockset.com/rest-api#listintegrations

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(ListIntegrations);

    // Rockset client object
    const client = await createClient();

    // Arguments
    const namedArgs: Args = ListIntegrations.args;

    // apicall
    const apicall = client.integrations.listIntegrations.bind(client.integrations);

    runApiCall.bind(this)({ args, flags, namedArgs, apicall });
  }
}

export default ListIntegrations;
