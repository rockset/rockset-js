/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import { cli } from 'cli-ux';

class DeleteIntegration extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
    file: flags.string({
      char: 'f',
      description:
        'The config file to execute this command from. Format must be json. Keys are translated into arguments of the same name. If no BODY argument is specified, the whole object, minus keys used as other arguments, will be passed in as the BODY.',
    }),
    full: flags.boolean({
      description: 'Show the full results JSON object',
    }),
    ...cli.table.flags(),
  };

  static args = [
    {
      name: 'integration',
      description: 'name of the integration',
      required: false,
      hidden: false,
    },
  ];

  static description = `
Delete Integration

Remove an integration.

Endpoint: DELETE: /v1/orgs/self/integrations/{integration}

Endpoint Documentation: https://docs.rockset.com/rest-api#deleteintegration

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(DeleteIntegration);

    // Rockset client object
    const client = await main.createClient();

    // Arguments
    const namedArgs: Args = DeleteIntegration.args;

    // apicall
    const apicall = client.integrations.deleteIntegration.bind(client.integrations);

    // endpoint
    const endpoint = '/v1/orgs/self/integrations/{integration}';
    const method = 'DELETE';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint });
  }
}

export default DeleteIntegration;
