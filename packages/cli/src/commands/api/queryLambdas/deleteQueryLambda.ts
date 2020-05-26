/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

class DeleteQueryLambda extends RockCommand {
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
      name: 'queryLambda',
      description: 'name of the Query Lambda',
      required: true,
      hidden: false,
    },
  ];

  static description = `
Delete Query Lambda

Delete a Query Lambda.

Endpoint: DELETE: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}

Endpoint Documentation: https://docs.rockset.com/rest-api#deletequerylambda

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(DeleteQueryLambda);

    // Rockset client object
    const client = await main.createClient();

    // Arguments
    const namedArgs: Args = DeleteQueryLambda.args;

    // apicall
    const apicall = client.queryLambdas.deleteQueryLambda.bind(client.queryLambdas);

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall });
  }
}

export default DeleteQueryLambda;
