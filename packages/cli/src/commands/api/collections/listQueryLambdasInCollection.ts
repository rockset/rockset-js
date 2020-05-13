/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Command, flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';

class ListQueryLambdasInCollection extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
    file: flags.string({
      char: 'f',
      description: 'The config file to execute this command from. Format must be [yaml|json]',
    }),
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

    // Arguments
    const namedArgs: Args = ListQueryLambdasInCollection.args;

    // apicall
    const apicall = client.collections.listQueryLambdasInCollection.bind(client.collections);

    runApiCall.bind(this)({ args, flags, namedArgs, apicall });
  }
}

export default ListQueryLambdasInCollection;
