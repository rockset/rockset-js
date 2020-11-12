/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class ListQueryLambdasInCollection extends RockCommand {
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
      name: 'collection',
      description: 'name of the collection',
      required: true,
      hidden: false,
    },
  ];

  static description = `get all query lambdas that hit a specific rockset collection
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/ws/{workspace}/collections/{collection}/lambdas`,
  )}


Endpoint Reference
GET: /v1/orgs/self/ws/{workspace}/collections/{collection}/lambdas
Get Query Lambdas for Collection
Get all Query Lambdas that hit a specific Rockset Collection.

More documentation at ${chalk.underline(
    `https://docs.rockset.com/rest-api#listquerylambdasincollection`,
  )}`;

  static examples = ['$ rockset api:collections:listQueryLambdasInCollection WORKSPACE COLLECTION'];

  async run() {
    const { args, flags } = this.parse(ListQueryLambdasInCollection);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = ListQueryLambdasInCollection.args;

    // apicall
    const apicall = client.collections.listQueryLambdasInCollection.bind(client.collections);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/collections/{collection}/lambdas';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default ListQueryLambdasInCollection;
