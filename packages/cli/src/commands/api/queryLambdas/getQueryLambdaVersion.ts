/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Flags } from '@oclif/core';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class GetQueryLambdaVersion extends RockCommand {
  static flags = {
    help: Flags.help({ char: 'h' }),
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

  static description = `retrieve details for a specified version of a query lambda
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions/{version}`,
  )}


Endpoint Reference
GET: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions/{version}
Retrieve Query Lambda Version
Retrieve details for a specified version of a Query Lambda.

More documentation at ${chalk.underline(
    `https://docs.rockset.com/rest-api#getquerylambdaversion`,
  )}`;

  static examples = [
    '$ rockset api:queryLambdas:getQueryLambdaVersion WORKSPACE QUERYLAMBDA VERSION',
  ];

  async run() {
    const { args, flags } = await this.parse(GetQueryLambdaVersion);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = GetQueryLambdaVersion.args;

    // apicall
    const apicall = client.queryLambdas.getQueryLambdaVersion.bind(client.queryLambdas);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions/{version}';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default GetQueryLambdaVersion;
