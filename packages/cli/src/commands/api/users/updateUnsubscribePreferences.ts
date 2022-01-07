/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Flags } from '@oclif/core';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = `data:
  - notificationType: create_apikey
`;

class UpdateUnsubscribePreferences extends RockCommand {
  static flags = {
    help: Flags.help({ char: 'h' }),
    body: Flags.string({
      required: true,
      description:
        'Path to a file whose contents will be passed as the POST body of this request. Format must be [json|yaml]. An example schema is shown below.',
    }),
    raw: Flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags({ only: ['columns', 'output'] }),
  };

  static args = [];

  static description = `update notification preference
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `POST: /v1/orgs/self/users/self/preferences`,
  )}
${chalk.bold(`This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       `)}
Example Body (YAML):
data:
  - notificationType: create_apikey


Endpoint Reference
POST: /v1/orgs/self/users/self/preferences
Update notification preferences
Update notification preference.

More documentation at ${chalk.underline(
    `https://docs.rockset.com/rest-api#updateunsubscribepreferences`,
  )}`;

  static examples = [
    '$ rockset api:users:updateUnsubscribePreferences  --body body.yaml\n$ cat body.yaml\ndata:\n  - notificationType: create_apikey\n\n',
  ];

  async run() {
    const { args, flags } = await this.parse(UpdateUnsubscribePreferences);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = UpdateUnsubscribePreferences.args;

    // apicall
    const apicall = client.users.updateUnsubscribePreferences.bind(client.users);

    // endpoint
    const endpoint = '/v1/orgs/self/users/self/preferences';
    const method = 'POST';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default UpdateUnsubscribePreferences;
