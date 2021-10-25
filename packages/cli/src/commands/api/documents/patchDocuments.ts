/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = `data:
  - _id: ca2d6832-1bfd-f88f-0620-d2aa27a5d86c
    patch:
      - op: ADD
        path: /foo/bar
        value: baz
        from: null
`;

class PatchDocuments extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
    body: flags.string({
      required: true,
      description:
        'Path to a file whose contents will be passed as the POST body of this request. Format must be [json|yaml]. An example schema is shown below.',
    }),

    raw: flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags({ only: ['columns', 'output'] }),
    loadTestRps: flags.integer({
      char: 'l',
      description:
        'If this flag is active, a load test will be conducted using this endpoint. The value passed to this flag determines how many requests per second will be sent',
    }),
    yes: flags.boolean({
      char: 'y',
      description: 'Skip all safety prompts',
      default: false,
    }),
  };

  static args = [
    {
      name: 'workspace',
      description: 'Name of the workspace.',
      required: true,
      hidden: false,
    },
    {
      name: 'collection',
      description: 'Name of the collection.',
      required: true,
      hidden: false,
    },
  ];

  static description = `update existing documents in a collection
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `PATCH: /v1/orgs/self/ws/{workspace}/collections/{collection}/docs`,
  )}
${chalk.bold(`This endpoint REQUIRES a PATCH body. To specify a PATCH body, please pass a JSON or YAML file to the --body flag.
       `)}
Example Body (YAML):
data:
  - _id: ca2d6832-1bfd-f88f-0620-d2aa27a5d86c
    patch:
      - op: ADD
        path: /foo/bar
        value: baz
        from: null


Endpoint Reference
PATCH: /v1/orgs/self/ws/{workspace}/collections/{collection}/docs
Patch Documents
Update existing documents in a collection.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#patchdocuments`)}`;

  static examples = [
    '$ rockset api:documents:patchDocuments WORKSPACE COLLECTION --body body.yaml\n$ cat body.yaml\ndata:\n  - _id: ca2d6832-1bfd-f88f-0620-d2aa27a5d86c\n    patch:\n      - op: ADD\n        path: /foo/bar\n        value: baz\n        from: null\n\n',
  ];

  async run() {
    const { args, flags } = this.parse(PatchDocuments);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = PatchDocuments.args;

    // apicall
    const apicall = client.documents.patchDocuments.bind(client.documents);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/collections/{collection}/docs';
    const method = 'PATCH';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default PatchDocuments;
