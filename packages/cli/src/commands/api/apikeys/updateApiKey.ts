/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = `state: ACTIVE
`;

class UpdateApiKey extends RockCommand {
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

  static args = [
    {
      name: 'name',
      description: 'Name of the API key.',
      required: true,
      hidden: false,
    },
    {
      name: 'user',
      description:
        'Email of the API key owner. Use `self` to specify the currently authenticated user.',
      required: true,
      hidden: false,
    },
  ];

  static description = `update the state of an api key for any user in your organization
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `POST: /v1/orgs/self/users/{user}/apikeys/{name}`,
  )}
${chalk.bold(`This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       `)}
Example Body (YAML):
state: ACTIVE


Endpoint Reference
POST: /v1/orgs/self/users/{user}/apikeys/{name}
Update an API key's state
Update the state of an API key for any user in your organization.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#updateapikey`)}`;

  static examples = [
    '$ rockset api:apikeys:updateApiKey NAME USER --body body.yaml\n$ cat body.yaml\nstate: ACTIVE\n\n',
  ];

  async run() {
    const { args, flags } = this.parse(UpdateApiKey);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = UpdateApiKey.args;

    // apicall
    const apicall = client.apikeys.updateApiKey.bind(client.apikeys);

    // endpoint
    const endpoint = '/v1/orgs/self/users/{user}/apikeys/{name}';
    const method = 'POST';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default UpdateApiKey;
