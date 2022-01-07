/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Flags } from '@oclif/core';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = `name: myQueryLambda
description: production version foo
sql:
  query: SELECT 'Foo'
  default_parameters:
    - name: _id
      type: string
      value: 85beb391
`;

class CreateQueryLambda extends RockCommand {
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

  static args = [
    {
      name: 'workspace',
      description: 'name of the workspace',
      required: true,
      hidden: false,
    },
  ];

  static description = `create a query lambda in given workspace
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `POST: /v1/orgs/self/ws/{workspace}/lambdas`,
  )}
${chalk.bold(`This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       `)}
Example Body (YAML):
name: myQueryLambda
description: production version foo
sql:
  query: SELECT 'Foo'
  default_parameters:
    - name: _id
      type: string
      value: 85beb391


Endpoint Reference
POST: /v1/orgs/self/ws/{workspace}/lambdas
Create Query Lambda
Create a Query Lambda in given workspace.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#createquerylambda`)}`;

  static examples = [
    "$ rockset api:queryLambdas:createQueryLambda WORKSPACE --body body.yaml\n$ cat body.yaml\nname: myQueryLambda\ndescription: production version foo\nsql:\n  query: SELECT 'Foo'\n  default_parameters:\n    - name: _id\n      type: string\n      value: 85beb391\n\n",
  ];

  async run() {
    const { args, flags } = await this.parse(CreateQueryLambda);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = CreateQueryLambda.args;

    // apicall
    const apicall = client.queryLambdas.createQueryLambda.bind(client.queryLambdas);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/lambdas';
    const method = 'POST';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default CreateQueryLambda;
