// Generated file, please do not edit directly

import { Command, flags } from '@oclif/command';
import * as _ from 'lodash';
import { createClient } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';


class Query extends Command {
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
  }
];
  static description = `
Query

Make a SQL query to Rockset.

Endpoint: POST: /v1/orgs/self/queries

Endpoint Documentation: https://docs.rockset.com/rest-api#query

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(Query);

    // Rockset client object
    const client = await createClient();

    // Arguments
    const namedArgs :Args = [
  {
    "name": "body",
    "description": "JSON object",
    "required": true,
    "hidden": false
  }
];

    // apicall 
    const apicall = client.queries.query.bind(client.queries);

    runApiCall({args, flags, namedArgs, apicall, log: this.log, error: this.error});
  }
}

export default Query;
