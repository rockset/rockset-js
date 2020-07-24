/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class ListQueryLambdaTagVersions extends RockCommand {
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
      name: 'tag',
      description: 'name of the tag',
      required: true,
      hidden: false,
    },
  ];

  static description = `
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/lambdas/tags/{tag}`,
  )}


Endpoint Reference
GET: /v1/orgs/self/lambdas/tags/{tag}
List Query Lambda Tag Versions
List all Query Lambda versions associated with a tag

More documentation at ${chalk.underline(
    `https://docs.rockset.com/rest-api#listquerylambdatagversions`,
  )}`;

  static examples = ['$ rockset api:queryLambdas:listQueryLambdaTagVersions TAG'];

  async run() {
    const { args, flags } = this.parse(ListQueryLambdaTagVersions);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = ListQueryLambdaTagVersions.args;

    // apicall
    const apicall = client.queryLambdas.listQueryLambdaTagVersions.bind(client.queryLambdas);

    // endpoint
    const endpoint = '/v1/orgs/self/lambdas/tags/{tag}';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default ListQueryLambdaTagVersions;
