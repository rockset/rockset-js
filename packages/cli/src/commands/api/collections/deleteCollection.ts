/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class DeleteCollection extends RockCommand {
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

  static description = `delete a collection and all its documents from rockset
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `DELETE: /v1/orgs/self/ws/{workspace}/collections/{collection}`,
  )}


Endpoint Reference
DELETE: /v1/orgs/self/ws/{workspace}/collections/{collection}
Delete Collection
Delete a collection and all its documents from Rockset.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#deletecollection`)}`;

  static examples = ['$ rockset api:collections:deleteCollection WORKSPACE COLLECTION'];

  async run() {
    const { args, flags } = this.parse(DeleteCollection);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = DeleteCollection.args;

    // apicall
    const apicall = client.collections.deleteCollection.bind(client.collections);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/collections/{collection}';
    const method = 'DELETE';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default DeleteCollection;
