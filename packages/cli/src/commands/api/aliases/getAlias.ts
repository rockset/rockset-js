/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class GetAlias extends RockCommand {
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

  static description = `get details about an alias
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/ws/{workspace}/aliases/{alias}`,
  )}


Endpoint Reference
GET: /v1/orgs/self/ws/{workspace}/aliases/{alias}
Retrieve Alias
Get details about an alias

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#getalias`)}`;

  static examples = ['$ rockset api:aliases:getAlias WORKSPACE ALIAS'];

  async run() {
    const { args, flags } = this.parse(GetAlias);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = GetAlias.args;

    // apicall
    const apicall = client.aliases.getAlias.bind(client.aliases);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/aliases/{alias}';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default GetAlias;
