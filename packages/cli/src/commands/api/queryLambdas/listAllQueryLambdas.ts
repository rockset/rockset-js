/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import { cli } from 'cli-ux';

class ListAllQueryLambdas extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),

    raw: flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags(),
    loadTestRps: flags.integer({
      char: 'l',
      description:
        'If this flag is active, a load test will be conducted using this apicall. The value passed to this flag determines how many requests per second will be sent',
    }),
    yes: flags.boolean({
      char: 'y',
      description: 'Skip all safety prompts',
      default: false,
    }),
  };

  static args = [];

  static description = `
List Query Lambdas

List all Query Lambdas.

Endpoint: GET: /v1/orgs/self/lambdas

Endpoint Documentation: https://docs.rockset.com/rest-api#listallquerylambdas

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(ListAllQueryLambdas);

    // Rockset client object
    const client = await main.createClient();

    // Arguments for API call. These arguments are the same as ListAllQueryLambdas.args for a GET request
    const namedArgs: Args = [];

    // apicall
    const apicall = client.queryLambdas.listAllQueryLambdas.bind(client.queryLambdas);

    // endpoint
    const endpoint = '/v1/orgs/self/lambdas';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint });
  }
}

export default ListAllQueryLambdas;
