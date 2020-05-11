// Generated file, please do not edit directly

import { Command, flags } from '@oclif/command';
import * as _ from 'lodash';
import { createClient } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';


class DeleteIntegration extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
    file: flags.string({
      char: 'f',
      description: 'The config file to execute this command from. Format must be [yaml|json]',
    }),
  };

  static args = [
  {
    "name": "integration",
    "description": "name of the integration",
    "required": true,
    "hidden": false
  }
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
    const client = await createClient();

    // Arguments
    const namedArgs :Args = [
  {
    "name": "integration",
    "description": "name of the integration",
    "required": true,
    "hidden": false
  }
];

    // apicall 
    const apicall = client.integrations.deleteIntegration.bind(client.integrations);

    runApiCall({args, flags, namedArgs, apicall, log: this.log, error: this.error});
  }
}

export default DeleteIntegration;
