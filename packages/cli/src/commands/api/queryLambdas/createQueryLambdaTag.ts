/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = `tag_name: production
version: 123ABC
`;

class CreateQueryLambdaTag extends RockCommand {
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
  ];

  static description = `create a tag for a specific query lambda version, or update if it exists
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `POST: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags`,
  )}
${chalk.bold(`This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       `)}
Example Body (YAML):
tag_name: production
version: 123ABC


Endpoint Reference
POST: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags
Create Query Lambda Tag
Create a tag for a specific Query Lambda version, or update if it exists

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#createquerylambdatag`)}`;

  static examples = [
    '$ rockset api:queryLambdas:createQueryLambdaTag WORKSPACE QUERYLAMBDA --body body.yaml\n$ cat body.yaml\ntag_name: production\nversion: 123ABC\n\n',
  ];

  async run() {
    const { args, flags } = this.parse(CreateQueryLambdaTag);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = CreateQueryLambdaTag.args;

    // apicall
    const apicall = client.queryLambdas.createQueryLambdaTag.bind(client.queryLambdas);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags';
    const method = 'POST';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default CreateQueryLambdaTag;
