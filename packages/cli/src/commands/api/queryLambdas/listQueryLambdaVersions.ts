/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class ListQueryLambdaVersions extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),

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

  static description = `
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions`,
  )}


Endpoint Reference
GET: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions
List Query Lambda Versions
List all versions of a Query Lambda.

More documentation at ${chalk.underline(
    `https://docs.rockset.com/rest-api#listquerylambdaversions`,
  )}`;

  static examples = ['$ rockset api:queryLambdas:listQueryLambdaVersions WORKSPACE QUERYLAMBDA'];

  async run() {
    const { args, flags } = this.parse(ListQueryLambdaVersions);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = ListQueryLambdaVersions.args;

    // apicall
    const apicall = client.queryLambdas.listQueryLambdaVersions.bind(client.queryLambdas);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default ListQueryLambdaVersions;
