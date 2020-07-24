/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import { cli } from 'cli-ux';

class CreateApiKey extends RockCommand {
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
  };

  static args = [];

  static description = `
Create API Key

Create a new API key for the authenticated user.

Endpoint: POST: /v1/orgs/self/users/self/apikeys

Endpoint Documentation: https://docs.rockset.com/rest-api#createapikey

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  static usage = 'api:apikeys:createApiKey -f request.yaml';

  async run() {
    const { args, flags } = this.parse(CreateApiKey);

    // Rockset client object
    const client = await main.createClient();

    // Arguments for API call. These arguments are the same as CreateApiKey.args for a GET request
    const namedArgs: Args = [
      {
        name: 'body',
        description:
          'JSON Body for this POST request. Full schema at https://docs.rockset.com/rest-api#createapikey ',
        required: true,
        hidden: false,
      },
    ];

    // apicall
    const apicall = client.apikeys.createApiKey.bind(client.apikeys);

    // endpoint
    const endpoint = '/v1/orgs/self/users/self/apikeys';
    const method = 'POST';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint });
  }
}

export default CreateApiKey;
