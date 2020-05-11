// Generated file, please do not edit directly

import { Command, flags } from '@oclif/command';
import * as _ from 'lodash';
import { createClient } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';


class ListApiKeys extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
    file: flags.string({
      char: 'f',
      description: 'The config file to execute this command from. Format must be [yaml|json]',
    }),
  };

  static args = [];
  static description = `
List API Keys

List all API keys for the authenticated user.

Endpoint: GET: /v1/orgs/self/users/self/apikeys

Endpoint Documentation: https://docs.rockset.com/rest-api#listapikeys

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(ListApiKeys);

    // Rockset client object
    const client = await createClient();

    // Arguments
    const namedArgs :Args = [];

    // apicall 
    const apicall = client.apikeys.listApiKeys.bind(client.apikeys);

    runApiCall({args, flags, namedArgs, apicall, log: this.log, error: this.error});
  }
}

export default ListApiKeys;
