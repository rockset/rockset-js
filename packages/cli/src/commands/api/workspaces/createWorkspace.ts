/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = `name: event_logs
description: Datasets of system logs for the ops team.
`;

class CreateWorkspace extends RockCommand {
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

  static args = [];

  static description = `
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `POST: /v1/orgs/self/ws`,
  )}
${chalk.bold(`This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       `)}
Example Body:
name: event_logs
description: Datasets of system logs for the ops team.


Endpoint Reference
POST: /v1/orgs/self/ws
Create Workspace
Create a new workspace in your org.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#createworkspace`)}`;

  static examples = [
    '$ rockset api:workspaces:createWorkspace  --body body.yaml\n$ cat body.yaml\nname: event_logs\ndescription: Datasets of system logs for the ops team.\n\n',
  ];

  async run() {
    const { args, flags } = this.parse(CreateWorkspace);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = CreateWorkspace.args;

    // apicall
    const apicall = client.workspaces.createWorkspace.bind(client.workspaces);

    // endpoint
    const endpoint = '/v1/orgs/self/ws';
    const method = 'POST';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default CreateWorkspace;
