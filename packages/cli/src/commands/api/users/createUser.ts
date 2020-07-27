/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = `email: hello@rockset.com
roles:
  - admin
  - member
  - read-only
`;

class CreateUser extends RockCommand {
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

  static description = `create a new user for an organization
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `POST: /v1/orgs/self/users`,
  )}
${chalk.bold(`This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       `)}
Example Body (YAML):
email: hello@rockset.com
roles:
  - admin
  - member
  - read-only


Endpoint Reference
POST: /v1/orgs/self/users
Create User
Create a new user for an organization.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#createuser`)}`;

  static examples = [
    '$ rockset api:users:createUser  --body body.yaml\n$ cat body.yaml\nemail: hello@rockset.com\nroles:\n  - admin\n  - member\n  - read-only\n\n',
  ];

  async run() {
    const { args, flags } = this.parse(CreateUser);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = CreateUser.args;

    // apicall
    const apicall = client.users.createUser.bind(client.users);

    // endpoint
    const endpoint = '/v1/orgs/self/users';
    const method = 'POST';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default CreateUser;
