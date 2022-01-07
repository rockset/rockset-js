/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Flags } from '@oclif/core';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = `description: version alias
collections:
  - commons.foo
  - prod.demo
`;

class UpdateAlias extends RockCommand {
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
      name: 'alias',
      description: 'name of the alias',
      required: true,
      hidden: false,
    },
  ];

  static description = `update alias in a workspace
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `POST: /v1/orgs/self/ws/{workspace}/aliases/{alias}`,
  )}
${chalk.bold(`This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       `)}
Example Body (YAML):
description: version alias
collections:
  - commons.foo
  - prod.demo


Endpoint Reference
POST: /v1/orgs/self/ws/{workspace}/aliases/{alias}
Update Alias
Update alias in a workspace.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#updatealias`)}`;

  static examples = [
    '$ rockset api:aliases:updateAlias WORKSPACE ALIAS --body body.yaml\n$ cat body.yaml\ndescription: version alias\ncollections:\n  - commons.foo\n  - prod.demo\n\n',
  ];

  async run() {
    const { args, flags } = await this.parse(UpdateAlias);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = UpdateAlias.args;

    // apicall
    const apicall = client.aliases.updateAlias.bind(client.aliases);

    // endpoint
    const endpoint = '/v1/orgs/self/ws/{workspace}/aliases/{alias}';
    const method = 'POST';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default UpdateAlias;
