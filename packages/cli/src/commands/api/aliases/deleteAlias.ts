/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Flags } from '@oclif/core';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class DeleteAlias extends RockCommand {
  static flags = {
    help: Flags.help({ char: 'h' }),
    raw: Flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags({ only: ['columns', 'output'] }),
  };

  static args = [
    {
      name: 'workspace',
      description: 'name of the workspace',
      required: true,
      hidden: false,
    },
    {
      name: 'alias',
      description: 'name of the alias',
      required: true,
      hidden: false,
    },
  ];

  static description = `delete an alias
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `DELETE: /v1/orgs/self/ws/{workspace}/aliases/{alias}`,
  )}


Endpoint Reference
DELETE: /v1/orgs/self/ws/{workspace}/aliases/{alias}
Delete Alias
Delete an alias.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#deletealias`)}`;

  static examples = ['$ rockset api:aliases:deleteAlias WORKSPACE ALIAS'];

  async run() {
    const { args, flags } = await this.parse(DeleteAlias);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = DeleteAlias.args;

    // apicall
    const apicall = client.aliases.deleteAlias.bind(client.aliases);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/aliases/{alias}';
    const method = 'DELETE';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default DeleteAlias;
