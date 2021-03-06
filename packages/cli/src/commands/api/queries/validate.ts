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

class Validate extends RockCommand {
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

  static args = [
    {
      name: 'parameters',
      required: true,
      hidden: false,
    },
  ];

  static description = `validate a sql query with rockset's parser and planner
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `POST: /v1/orgs/self/queries/validations`,
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
POST: /v1/orgs/self/queries/validations
Validate Query
Validate a SQL query with Rockset's parser and planner.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#validate`)}`;

  static examples = [
    '$ rockset api:queries:validate PARAMETERS --body body.yaml\n$ cat body.yaml\nsql:\n  parameters:\n    - name: _id\n      type: string\n      value: 85beb391\n  query: SELECT * FROM foo where _id = :_id\n  default_row_limit: null\n  generate_warnings: null\n  profiling_enabled: null\n\n',
  ];

  async run() {
    const { args, flags } = this.parse(Validate);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = Validate.args;

    // apicall
    const apicall = client.queries.validate.bind(client.queries);

    // endpoint
    const endpoint = '/v1/orgs/self/queries/validations';
    const method = 'POST';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default Validate;
