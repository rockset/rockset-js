/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Command, flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';

class CreateQueryLambda extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
    file: flags.string({
      char: 'f',
      description: 'The config file to execute this command from. Format must be [yaml|json]',
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
      name: 'body',
      description: 'JSON object',
      required: true,
      hidden: false,
    },
  ];

  static description = `
Create Query Lambda

Create a Query Lambda in given workspace.

Endpoint: POST: /v1/orgs/self/ws/{workspace}/lambdas

Endpoint Documentation: https://docs.rockset.com/rest-api#createquerylambda

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(CreateQueryLambda);

    // Rockset client object
    const client = await main.createClient();

    // Arguments
    const namedArgs: Args = CreateQueryLambda.args;

    // apicall
    const apicall = client.queryLambdas.createQueryLambda.bind(client.queryLambdas);

    runApiCall.bind(this)({ args, flags, namedArgs, apicall });
  }
}

export default CreateQueryLambda;
