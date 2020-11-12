/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class ListOrganizationTags extends RockCommand {
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

  static args = [];

  static description = `list all distinct query lambda tags in an organization
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/lambdas/tags`,
  )}


Endpoint Reference
GET: /v1/orgs/self/lambdas/tags
List All Query Lambda Tags
List all distinct Query Lambda tags in an organization.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#listorganizationtags`)}`;

  static examples = ['$ rockset api:queryLambdas:listOrganizationTags '];

  async run() {
    const { args, flags } = this.parse(ListOrganizationTags);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = ListOrganizationTags.args;

    // apicall
    const apicall = client.queryLambdas.listOrganizationTags.bind(client.queryLambdas);

    // endpoint
    const endpoint = '/v1/orgs/self/lambdas/tags';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default ListOrganizationTags;
