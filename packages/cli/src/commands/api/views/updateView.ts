/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Flags } from '@oclif/core';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = `description: view of awesome collection
query: SELECT * FROM foo
`;

class UpdateView extends RockCommand {
  static flags = {
    help: Flags.help({ char: 'h' }),
    body: Flags.string({
      required: true,
      description:
        'Path to a file whose contents will be passed as the POST body of this request. Format must be [json|yaml]. An example schema is shown below.',
    }),
    raw: Flags.boolean({
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
      name: 'view',
      description: 'name of the view',
      required: true,
      hidden: false,
    },
  ];

  static description = `update a view
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `POST: /v1/orgs/self/ws/{workspace}/views/{view}`,
  )}
${chalk.bold(`This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       `)}
Example Body (YAML):
description: view of awesome collection
query: SELECT * FROM foo


Endpoint Reference
POST: /v1/orgs/self/ws/{workspace}/views/{view}
Update View
Update a view

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#updateview`)}`;

  static examples = [
    '$ rockset api:views:updateView WORKSPACE VIEW --body body.yaml\n$ cat body.yaml\ndescription: view of awesome collection\nquery: SELECT * FROM foo\n\n',
  ];

  async run() {
    const { args, flags } = await this.parse(UpdateView);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = UpdateView.args;

    // apicall
    const apicall = client.views.updateView.bind(client.views);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/views/{view}';
    const method = 'POST';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default UpdateView;
