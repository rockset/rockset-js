/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class ListCollections extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),

    raw: flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags({ only: ['columns', 'output'] }),
  };

  static args = [];

  static description = `retrieve all collections in an organization
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/collections`,
  )}


Endpoint Reference
GET: /v1/orgs/self/collections
List Collections
Retrieve all collections in an organization.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#listcollections`)}`;

  static examples = ['$ rockset api:collections:listCollections '];

  async run() {
    const { args, flags } = this.parse(ListCollections);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = ListCollections.args;

    // apicall
    const apicall = client.collections.listCollections.bind(client.collections);

    // endpoint
    const endpoint = '/v1/orgs/self/collections';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default ListCollections;
