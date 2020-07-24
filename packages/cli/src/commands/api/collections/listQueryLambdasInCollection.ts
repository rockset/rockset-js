/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import { cli } from 'cli-ux';

class ListQueryLambdasInCollection extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),

    raw: flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags(),
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

  static description = `
Get Query Lambdas

Get all Query Lambdas that hit a specific Rockset Collection.

Endpoint: GET: /v1/orgs/self/ws/{workspace}/collections/{collection}/lambdas

Endpoint Documentation: https://docs.rockset.com/rest-api#listquerylambdasincollection

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(ListQueryLambdasInCollection);

    // Rockset client object
    const client = await main.createClient();

    // Arguments for API call. These arguments are the same as ListQueryLambdasInCollection.args for a GET request
    const namedArgs: Args = [
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

    // apicall
    const apicall = client.collections.listQueryLambdasInCollection.bind(client.collections);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/collections/{collection}/lambdas';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint });
  }
}

export default ListQueryLambdasInCollection;
