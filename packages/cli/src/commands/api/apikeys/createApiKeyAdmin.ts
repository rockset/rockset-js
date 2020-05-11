// Generated file, please do not edit directly

import { Command, flags } from '@oclif/command';
import * as _ from 'lodash';
import { createClient } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';


class CreateApiKeyAdmin extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
    file: flags.string({
      char: 'f',
      description: 'The config file to execute this command from. Format must be [yaml|json]',
    }),
  };

  static args = [
  {
    "name": "body",
    "description": "JSON object",
    "required": true,
    "hidden": false
  },
  {
    "name": "user",
    "required": true,
    "hidden": false
  }
];
  static description = `
Create API Key for any user (admin only)

Create a new API key for any user (admin only).

Endpoint: POST: /v1/orgs/self/users/{user}/apikeys

Endpoint Documentation: https://docs.rockset.com/rest-api#createapikeyadmin

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(CreateApiKeyAdmin);

    // Rockset client object
    const client = await createClient();

    // Arguments
    const namedArgs :Args = [
  {
    "name": "body",
    "description": "JSON object",
    "required": true,
    "hidden": false
  },
  {
    "name": "user",
    "required": true,
    "hidden": false
  }
];

    // apicall 
    const apicall = client.apikeys.createApiKeyAdmin.bind(client.apikeys);

    runApiCall({args, flags, namedArgs, apicall, log: this.log, error: this.error});
  }
}

export default CreateApiKeyAdmin;
