/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Command, flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';

class GetQueryLambdaVersion extends Command {
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
    {
      name: 'version',
      description: 'version',
      required: true,
      hidden: false,
    },
  ];

  static description = `
Get Query Lambda Version

Get a specific version of a Query Lambda

Endpoint: GET: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions/{version}

Endpoint Documentation: https://docs.rockset.com/rest-api#getquerylambdaversion

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(GetQueryLambdaVersion);

    // Rockset client object
    const client = await main.createClient();

    // Arguments
    const namedArgs: Args = GetQueryLambdaVersion.args;

    // apicall
    const apicall = client.queryLambdas.getQueryLambdaVersion.bind(client.queryLambdas);

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall });
  }
}

export default GetQueryLambdaVersion;
