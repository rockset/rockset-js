/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Flags } from '@oclif/core';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class ListRoles extends RockCommand {
  static flags = {
    help: Flags.help({ char: 'h' }),
    raw: Flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags({ only: ['columns', 'output'] }),
  };

  static args = [];

  static description = `list all roles for your organization
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/roles`,
  )}


Endpoint Reference
GET: /v1/orgs/self/roles
List Roles
List all roles for your organization.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#listroles`)}`;

  static examples = ['$ rockset api:customRolesBeta:listRoles '];

  async run() {
    const { args, flags } = await this.parse(ListRoles);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = ListRoles.args;

    // apicall
    const apicall = client.customRolesBeta.listRoles.bind(client.customRolesBeta);

    // endpoint
    const endpoint = '/v1/orgs/self/roles';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default ListRoles;
