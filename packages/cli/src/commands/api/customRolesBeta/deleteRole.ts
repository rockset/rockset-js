/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class DeleteRole extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),

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

  static description = `delete a role for your organization
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `DELETE: /v1/orgs/self/roles/{roleName}`,
  )}


Endpoint Reference
DELETE: /v1/orgs/self/roles/{roleName}
Delete a Role
Delete a role for your organization.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#deleterole`)}`;

  static examples = ['$ rockset api:customRolesBeta:deleteRole ROLENAME'];

  async run() {
    const { args, flags } = this.parse(DeleteRole);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = DeleteRole.args;

    // apicall
    const apicall = client.customRolesBeta.deleteRole.bind(client.customRolesBeta);

    // endpoint
    const endpoint = '/v1/orgs/self/roles/{roleName}';
    const method = 'DELETE';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default DeleteRole;
