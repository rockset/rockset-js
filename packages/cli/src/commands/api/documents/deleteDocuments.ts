/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = `data:
  - _id: 2cd61e3b
`;

class DeleteDocuments extends RockCommand {
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

  static description = `delete documents from a collection
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `DELETE: /v1/orgs/self/ws/{workspace}/collections/{collection}/docs`,
  )}
${chalk.bold(`This endpoint REQUIRES a DELETE body. To specify a DELETE body, please pass a JSON or YAML file to the --body flag.
       `)}
Example Body (YAML):
data:
  - _id: 2cd61e3b


Endpoint Reference
DELETE: /v1/orgs/self/ws/{workspace}/collections/{collection}/docs
Delete Documents
Delete documents from a collection.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#deletedocuments`)}`;

  static examples = [
    '$ rockset api:documents:deleteDocuments WORKSPACE COLLECTION --body body.yaml\n$ cat body.yaml\ndata:\n  - _id: 2cd61e3b\n\n',
  ];

  async run() {
    const { args, flags } = this.parse(DeleteDocuments);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = DeleteDocuments.args;

    // apicall
    const apicall = client.documents.deleteDocuments.bind(client.documents);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/collections/{collection}/docs';
    const method = 'DELETE';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default DeleteDocuments;
