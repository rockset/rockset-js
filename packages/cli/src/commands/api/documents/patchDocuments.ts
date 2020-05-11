// Generated file, please do not edit directly

import { Command, flags } from '@oclif/command';
import * as _ from 'lodash';
import { createClient } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';


class PatchDocuments extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
    file: flags.string({
      char: 'f',
      description: 'The config file to execute this command from. Format must be [yaml|json]',
    }),
  };

  static args = [
  {
    "name": "workspace",
    "description": "name of the workspace",
    "required": true,
    "hidden": false
  },
  {
    "name": "collection",
    "description": "name of the collection",
    "required": true,
    "hidden": false
  },
  {
    "name": "body",
    "description": "JSON Patch objects",
    "required": true,
    "hidden": false
  }
];
  static description = `
Patch Documents

Patch documents in a collection

Endpoint: PATCH: /v1/orgs/self/ws/{workspace}/collections/{collection}/docs

Endpoint Documentation: https://docs.rockset.com/rest-api#patchdocuments

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(PatchDocuments);

    // Rockset client object
    const client = await createClient();

    // Arguments
    const namedArgs :Args = PatchDocuments.args;

    // apicall 
    const apicall = client.documents.patchDocuments.bind(client.documents);

    runApiCall.bind(this)({args, flags, namedArgs, apicall});
  }
}

export default PatchDocuments;
