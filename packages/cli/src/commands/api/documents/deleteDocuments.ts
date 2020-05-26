/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

class DeleteDocuments extends RockCommand {
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
    {
      name: 'body',
      description: 'JSON object',
      required: true,
      hidden: false,
    },
  ];

  static description = `
Delete Documents

Delete documents from a collection in Rockset.

Endpoint: DELETE: /v1/orgs/self/ws/{workspace}/collections/{collection}/docs

Endpoint Documentation: https://docs.rockset.com/rest-api#deletedocuments

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(DeleteDocuments);

    // Rockset client object
    const client = await main.createClient();

    // Arguments
    const namedArgs: Args = DeleteDocuments.args;

    // apicall
    const apicall = client.documents.deleteDocuments.bind(client.documents);

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall });
  }
}

export default DeleteDocuments;
