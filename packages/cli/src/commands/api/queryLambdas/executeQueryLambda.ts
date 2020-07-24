/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import { cli } from 'cli-ux';

class ExecuteQueryLambda extends RockCommand {
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
Run Query Lambda

Run a particular version of a Query Lambda.

Endpoint: POST: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions/{version}

Endpoint Documentation: https://docs.rockset.com/rest-api#executequerylambda

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  static usage = 'api:queryLambdas:executeQueryLambda -f request.yaml';

  async run() {
    const { args, flags } = this.parse(ExecuteQueryLambda);

    // Rockset client object
    const client = await main.createClient();

    // Arguments for API call. These arguments are the same as ExecuteQueryLambda.args for a GET request
    const namedArgs: Args = [
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
      {
        name: 'body',
        description:
          'JSON Body for this POST request. Full schema at https://docs.rockset.com/rest-api#executequerylambda ',
        required: true,
        hidden: false,
      },
    ];

    // apicall
    const apicall = client.queryLambdas.executeQueryLambda.bind(client.queryLambdas);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions/{version}';
    const method = 'POST';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint });
  }
}

export default ExecuteQueryLambda;
