/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = `name: event-logger
`;

class CreateApiKey extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
    body: flags.string({
      required: true,
      description:
        'Path to a file whose contents will be passed as the POST body of this request. Format must be [json|yaml]. An example schema is shown below.',
    }),

    raw: flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags({ only: ['columns', 'output'] }),
  };

  static args = [];

  static description = `
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `POST: /v1/orgs/self/users/self/apikeys`,
  )}
${chalk.bold(`This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       `)}
Example Body:
name: event-logger


Endpoint Reference
POST: /v1/orgs/self/users/self/apikeys
Create API Key
Create a new API key for the authenticated user.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#createapikey`)}`;

  static examples = [
    '$ rockset api:apikeys:createApiKey  --body body.yaml\n$ cat body.yaml\nname: event-logger\n\n',
  ];

  async run() {
    const { args, flags } = this.parse(CreateApiKey);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = CreateApiKey.args;

    // apicall
    const apicall = client.apikeys.createApiKey.bind(client.apikeys);

    // endpoint
    const endpoint = '/v1/orgs/self/users/self/apikeys';
    const method = 'POST';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default CreateApiKey;
