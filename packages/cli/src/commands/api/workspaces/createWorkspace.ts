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
      description:
        'The config file to execute this command from. Format must be [json|yaml]. Keys are translated into arguments of the same name. If no BODY argument is specified, the whole object, minus keys used as other arguments, will be passed in as the BODY.',
    }),
    full: flags.boolean({
      description: 'Show the full results JSON object',
    }),
    ...cli.table.flags(),
  };

  static args = [
    {
      name: 'body',
      description:
        'JSON Body for this POST request. Full schema at https://docs.rockset.com/rest-api#createworkspace ',
      required: false,
      hidden: false,
    },
  ];

  static description = `
Create Workspace

Create a new workspace in your org.

Endpoint: POST: /v1/orgs/self/ws

Endpoint Documentation: https://docs.rockset.com/rest-api#createworkspace

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(CreateWorkspace);

    // Rockset client object
    const client = await main.createClient();

    // Arguments
    const namedArgs: Args = CreateWorkspace.args;

    // apicall
    const apicall = client.workspaces.createWorkspace.bind(client.workspaces);

    // endpoint
    const endpoint = '/v1/orgs/self/ws';
    const method = 'POST';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint });
  }
}

export default CreateWorkspace;
