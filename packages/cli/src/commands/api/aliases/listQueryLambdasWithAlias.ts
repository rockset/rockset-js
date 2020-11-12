/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class ListQueryLambdasWithAlias extends RockCommand {
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
      required: true,
      hidden: false,
    },
    {
      name: 'alias',
      required: true,
      hidden: false,
    },
  ];

  static description = `get all query lambdas that hit a specific rockset alias
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/ws/{workspace}/aliases/{alias}/lambdas`,
  )}


Endpoint Reference
GET: /v1/orgs/self/ws/{workspace}/aliases/{alias}/lambdas
Get Query Lambdas with Alias
Get all Query Lambdas that hit a specific Rockset Alias.

More documentation at ${chalk.underline(
    `https://docs.rockset.com/rest-api#listquerylambdaswithalias`,
  )}`;

  static examples = ['$ rockset api:aliases:listQueryLambdasWithAlias WORKSPACE ALIAS'];

  async run() {
    const { args, flags } = this.parse(ListQueryLambdasWithAlias);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = ListQueryLambdasWithAlias.args;

    // apicall
    const apicall = client.aliases.listQueryLambdasWithAlias.bind(client.aliases);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/aliases/{alias}/lambdas';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default ListQueryLambdasWithAlias;
