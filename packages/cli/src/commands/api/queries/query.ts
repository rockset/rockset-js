/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Flags } from '@oclif/core';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = `sql:
  query: SELECT * FROM foo where _id = :_id
  generate_warnings: null
  profiling_enabled: null
  parameters:
    - name: _id
      type: string
      value: 85beb391
  default_row_limit: null
  paginate: null
  initial_paginate_response_doc_count: null
`;

class Query extends RockCommand {
  static flags = {
    help: Flags.help({ char: 'h' }),
    body: Flags.string({
      required: true,
      description:
        'Path to a file whose contents will be passed as the POST body of this request. Format must be [json|yaml]. An example schema is shown below.',
    }),
    raw: Flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags({ only: ['columns', 'output'] }),
    loadTestRps: Flags.integer({
      char: 'l',
      description:
        'If this flag is active, a load test will be conducted using this endpoint. The value passed to this flag determines how many requests per second will be sent',
    }),
    yes: Flags.boolean({
      char: 'y',
      description: 'Skip all safety prompts',
      default: false,
    }),
  };

  static args = [];

  static description = `make a sql query to rockset
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `POST: /v1/orgs/self/queries`,
  )}
${chalk.bold(`This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       `)}
The POST body request schema has been omitted because it is too long. Please view the documentation at ${chalk.underline(
    `https://docs.rockset.com/rest-api#query`,
  )} to see the example.

Endpoint Reference
POST: /v1/orgs/self/queries
Query
Make a SQL query to Rockset.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#query`)}`;

  static examples = [];

  async run() {
    const { args, flags } = await this.parse(Query);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = Query.args;

    // apicall
    const apicall = client.queries.query.bind(client.queries);

    // endpoint
    const endpoint = '/v1/orgs/self/queries';
    const method = 'POST';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default Query;
