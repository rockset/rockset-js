/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = `sql:
  parameters:
    - name: _id
      type: string
      value: 85beb391
  query: SELECT * FROM foo where _id = :_id
  default_row_limit: null
  generate_warnings: null
  profiling_enabled: null
`;

class Query extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
    body: flags.string({
      required: true,
      description:
        'Path to a file whose contents will be passed as the POST body of this request. Format must be [json|yaml]. An example schema is shown below.',
    }),

    raw: flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags({ only: ['columns', 'output'] }),
    loadTestRps: flags.integer({
      char: 'l',
      description:
        'If this flag is active, a load test will be conducted using this endpoint. The value passed to this flag determines how many requests per second will be sent',
    }),
    yes: flags.boolean({
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
Example Body (YAML):
sql:
  parameters:
    - name: _id
      type: string
      value: 85beb391
  query: SELECT * FROM foo where _id = :_id
  default_row_limit: null
  generate_warnings: null
  profiling_enabled: null


Endpoint Reference
POST: /v1/orgs/self/queries
Query
Make a SQL query to Rockset.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#query`)}`;

  static examples = [
    '$ rockset api:queries:query  --body body.yaml\n$ cat body.yaml\nsql:\n  parameters:\n    - name: _id\n      type: string\n      value: 85beb391\n  query: SELECT * FROM foo where _id = :_id\n  default_row_limit: null\n  generate_warnings: null\n  profiling_enabled: null\n\n',
  ];

  async run() {
    const { args, flags } = this.parse(Query);

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
