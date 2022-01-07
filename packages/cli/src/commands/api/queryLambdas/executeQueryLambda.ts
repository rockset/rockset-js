/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Flags } from '@oclif/core';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = `parameters:
  - name: _id
    type: string
    value: 85beb391
default_row_limit: null
generate_warnings: null
paginate: null
initial_paginate_response_doc_count: null
`;

class ExecuteQueryLambda extends RockCommand {
  static flags = {
    help: Flags.help({ char: 'h' }),
    body: Flags.string({
      required: false,
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

  static args = [
    {
      name: 'workspace',
      description: 'name of the workspace',
      required: true,
      hidden: false,
    },
    {
      name: 'queryLambda',
      description: 'name of the Query Lambda',
      required: true,
      hidden: false,
    },
    {
      name: 'version',
      description: 'version',
      required: true,
      hidden: false,
    },
  ];

  static description = `execute a particular version of a query lambda
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `POST: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions/{version}`,
  )}
${chalk.bold(`This endpoint optionally accepts a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       `)}
Example Body (YAML):
parameters:
  - name: _id
    type: string
    value: 85beb391
default_row_limit: null
generate_warnings: null
paginate: null
initial_paginate_response_doc_count: null


Endpoint Reference
POST: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions/{version}
Execute Query Lambda By Version
Execute a particular version of a Query Lambda.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#executequerylambda`)}`;

  static examples = [
    '$ rockset api:queryLambdas:executeQueryLambda WORKSPACE QUERYLAMBDA VERSION',
    '$ rockset api:queryLambdas:executeQueryLambda WORKSPACE QUERYLAMBDA VERSION --body body.yaml\n$ cat body.yaml\nparameters:\n  - name: _id\n    type: string\n    value: 85beb391\ndefault_row_limit: null\ngenerate_warnings: null\npaginate: null\ninitial_paginate_response_doc_count: null\n\n',
  ];

  async run() {
    const { args, flags } = await this.parse(ExecuteQueryLambda);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = ExecuteQueryLambda.args;

    // apicall
    const apicall = client.queryLambdas.executeQueryLambda.bind(client.queryLambdas);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions/{version}';
    const method = 'POST';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default ExecuteQueryLambda;
