/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Flags } from '@oclif/core';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class GetQueryLambdaTagVersion extends RockCommand {
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
      name: 'tag',
      description: 'name of the tag',
      required: true,
      hidden: false,
    },
  ];

  static description = `retrieve the query lambda version associated with a given tag
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags/{tag}`,
  )}


Endpoint Reference
GET: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags/{tag}
Retrieve Query Lambda Tag
Retrieve the Query Lambda version associated with a given tag.

More documentation at ${chalk.underline(
    `https://docs.rockset.com/rest-api#getquerylambdatagversion`,
  )}`;

  static examples = [
    '$ rockset api:queryLambdas:getQueryLambdaTagVersion WORKSPACE QUERYLAMBDA TAG',
  ];

  async run() {
    const { args, flags } = await this.parse(GetQueryLambdaTagVersion);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = GetQueryLambdaTagVersion.args;

    // apicall
    const apicall = client.queryLambdas.getQueryLambdaTagVersion.bind(client.queryLambdas);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags/{tag}';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default GetQueryLambdaTagVersion;
