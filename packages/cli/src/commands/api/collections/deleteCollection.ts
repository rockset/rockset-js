/* eslint-disable unicorn/filename-case */

// Generated file, please do not edit directly

import { Command, flags } from '@oclif/command';
import { createClient } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';

class DeleteCollection extends Command {
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
Delete Collection

Delete a collection and all its documents from Rockset.

Endpoint: DELETE: /v1/orgs/self/ws/{workspace}/collections/{collection}

Endpoint Documentation: https://docs.rockset.com/rest-api#deletecollection

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(DeleteCollection);

    // Rockset client object
    const client = await createClient();

    // Arguments
    const namedArgs: Args = DeleteCollection.args;

    // apicall
    const apicall = client.collections.deleteCollection.bind(client.collections);

    runApiCall.bind(this)({ args, flags, namedArgs, apicall });
  }
}

export default DeleteCollection;
