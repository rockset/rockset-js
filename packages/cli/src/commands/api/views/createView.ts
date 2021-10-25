/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = `name: myAwesomeView
description: view of awesome collection
query: SELECT * FROM foo
`;

class CreateView extends RockCommand {
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
  };

  static args = [
    {
      name: 'workspace',
      description: 'name of the workspace',
      required: true,
      hidden: false,
    },
  ];

  static description = `create a view
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `POST: /v1/orgs/self/ws/{workspace}/views`,
  )}
${chalk.bold(`This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       `)}
Example Body (YAML):
name: myAwesomeView
description: view of awesome collection
query: SELECT * FROM foo


Endpoint Reference
POST: /v1/orgs/self/ws/{workspace}/views
Create View
Create a view

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#createview`)}`;

  static examples = [
    '$ rockset api:views:createView WORKSPACE --body body.yaml\n$ cat body.yaml\nname: myAwesomeView\ndescription: view of awesome collection\nquery: SELECT * FROM foo\n\n',
  ];

  async run() {
    const { args, flags } = this.parse(CreateView);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = CreateView.args;

    // apicall
    const apicall = client.views.createView.bind(client.views);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/views';
    const method = 'POST';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default CreateView;
