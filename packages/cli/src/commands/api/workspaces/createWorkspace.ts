/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import { cli } from 'cli-ux';

class CreateWorkspace extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
    file: flags.string({
      char: 'f',
      required: true,
      description:
        'The config file to execute this command from. Format must be [json|yaml]. Keys are translated into arguments of the same name. If no BODY argument is specified, the whole object, minus keys used as other arguments, will be passed in as the BODY.',
    }),

    raw: flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags(),
  };

  static args = [];

  static description = `
Create Workspace

Create a new workspace in your org.

Endpoint: POST: /v1/orgs/self/ws

Endpoint Documentation: https://docs.rockset.com/rest-api#createworkspace

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  static usage = 'api:workspaces:createWorkspace -f request.yaml';

  async run() {
    const { args, flags } = this.parse(CreateWorkspace);

    // Rockset client object
    const client = await main.createClient();

    // Arguments for API call. These arguments are the same as CreateWorkspace.args for a GET request
    const namedArgs: Args = [
      {
        name: 'body',
        description:
          'JSON Body for this POST request. Full schema at https://docs.rockset.com/rest-api#createworkspace ',
        required: true,
        hidden: false,
      },
    ];

    // apicall
    const apicall = client.workspaces.createWorkspace.bind(client.workspaces);

    // endpoint
    const endpoint = '/v1/orgs/self/ws';
    const method = 'POST';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint });
  }
}

export default CreateWorkspace;
