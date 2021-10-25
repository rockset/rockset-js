/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = `description: Role with read and write privileges to all collections.
privileges:
  - action: Create collection
    resource_name: commons
    cluster: "*ALL*"
`;

class UpdateRole extends RockCommand {
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
      name: 'roleName',
      required: true,
      hidden: false,
    },
  ];

  static description = `update a role for your organization
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `POST: /v1/orgs/self/roles/{roleName}`,
  )}
${chalk.bold(`This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       `)}
Example Body (YAML):
description: Role with read and write privileges to all collections.
privileges:
  - action: Create collection
    resource_name: commons
    cluster: "*ALL*"


Endpoint Reference
POST: /v1/orgs/self/roles/{roleName}
Update a Role
Update a role for your organization.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#updaterole`)}`;

  static examples = [
    '$ rockset api:customRolesBeta:updateRole ROLENAME --body body.yaml\n$ cat body.yaml\ndescription: Role with read and write privileges to all collections.\nprivileges:\n  - action: Create collection\n    resource_name: commons\n    cluster: "*ALL*"\n\n',
  ];

  async run() {
    const { args, flags } = this.parse(UpdateRole);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = UpdateRole.args;

    // apicall
    const apicall = client.customRolesBeta.updateRole.bind(client.customRolesBeta);

    // endpoint
    const endpoint = '/v1/orgs/self/roles/{roleName}';
    const method = 'POST';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default UpdateRole;
