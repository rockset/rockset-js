/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = `new_size: LARGE
new_type: null
`;

class SetVirtualInstance extends RockCommand {
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
      name: 'virtualInstanceId',
      description: 'uuid of the virtual instance',
      required: true,
      hidden: false,
    },
  ];

  static description = `update the size of a virtual instance
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `POST: /v1/orgs/self/virtualinstances/{virtualInstanceId}`,
  )}
${chalk.bold(`This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       `)}
Example Body (YAML):
new_size: LARGE
new_type: null


Endpoint Reference
POST: /v1/orgs/self/virtualinstances/{virtualInstanceId}
Update Virtual Instance
Update the size of a virtual instance.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#setvirtualinstance`)}`;

  static examples = [
    '$ rockset api:virtualInstances:setVirtualInstance VIRTUALINSTANCEID --body body.yaml\n$ cat body.yaml\nnew_size: LARGE\nnew_type: null\n\n',
  ];

  async run() {
    const { args, flags } = this.parse(SetVirtualInstance);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = SetVirtualInstance.args;

    // apicall
    const apicall = client.virtualInstances.setVirtualInstance.bind(client.virtualInstances);

    // endpoint
    const endpoint = '/v1/orgs/self/virtualinstances/{virtualInstanceId}';
    const method = 'POST';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default SetVirtualInstance;
