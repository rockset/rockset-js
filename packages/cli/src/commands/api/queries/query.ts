/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import { cli } from 'cli-ux';

class Query extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
    file: flags.string({
      char: 'f',
      required: true,
      description:
        'The config file to execute this command from. Format must be [json|yaml]. Keys are translated into arguments of the same name. If no BODY argument is specified, the whole object, minus keys used as other arguments, will be passed in as the BODY.',
    }),

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
Query

Make a SQL query to Rockset.

Endpoint: POST: /v1/orgs/self/queries

Endpoint Documentation: https://docs.rockset.com/rest-api#query

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  static usage = 'api:queries:query -f request.yaml';

  async run() {
    const { args, flags } = this.parse(Query);

    // Rockset client object
    const client = await main.createClient();

    // Arguments for API call. These arguments are the same as Query.args for a GET request
    const namedArgs: Args = [
      {
        name: 'body',
        description:
          'JSON Body for this POST request. Full schema at https://docs.rockset.com/rest-api#query ',
        required: true,
        hidden: false,
      },
    ];

    // apicall
    const apicall = client.queries.query.bind(client.queries);

    // endpoint
    const endpoint = '/v1/orgs/self/queries';
    const method = 'POST';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint });
  }
}

export default Query;
