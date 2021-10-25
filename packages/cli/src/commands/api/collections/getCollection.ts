/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class GetCollection extends RockCommand {
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

  static description = `get details about a collection
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/ws/{workspace}/collections/{collection}`,
  )}


Endpoint Reference
GET: /v1/orgs/self/ws/{workspace}/collections/{collection}
Retrieve Collection
Get details about a collection.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#getcollection`)}`;

  static examples = ['$ rockset api:collections:getCollection WORKSPACE COLLECTION'];

  async run() {
    const { args, flags } = this.parse(GetCollection);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = GetCollection.args;

    // apicall
    const apicall = client.collections.getCollection.bind(client.collections);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/collections/{collection}';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default GetCollection;
