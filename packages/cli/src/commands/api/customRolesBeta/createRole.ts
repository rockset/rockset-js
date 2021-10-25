/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = `role_name: read_write
description: Role with read and write privileges to all collections.
privileges:
  - action: Create collection
    resource_name: commons
    cluster: "*ALL*"
`;

class CreateRole extends RockCommand {
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

  static description = `create a role for your organization
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `POST: /v1/orgs/self/roles`,
  )}
${chalk.bold(`This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       `)}
Example Body (YAML):
role_name: read_write
description: Role with read and write privileges to all collections.
privileges:
  - action: Create collection
    resource_name: commons
    cluster: "*ALL*"


Endpoint Reference
POST: /v1/orgs/self/roles
Create a Role
Create a role for your organization.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#createrole`)}`;

  static examples = [
    '$ rockset api:customRolesBeta:createRole  --body body.yaml\n$ cat body.yaml\nrole_name: read_write\ndescription: Role with read and write privileges to all collections.\nprivileges:\n  - action: Create collection\n    resource_name: commons\n    cluster: "*ALL*"\n\n',
  ];

  async run() {
    const { args, flags } = this.parse(CreateRole);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = CreateRole.args;

    // apicall
    const apicall = client.customRolesBeta.createRole.bind(client.customRolesBeta);

    // endpoint
    const endpoint = '/v1/orgs/self/roles';
    const method = 'POST';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default CreateRole;
