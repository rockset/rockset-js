/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { Flags } from '@oclif/core';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import * as chalk from 'chalk';
import { cli } from 'cli-ux';

const bodySchema = ``;

class GetVirtualInstance extends RockCommand {
  static flags = {
    help: Flags.help({ char: 'h' }),
    raw: Flags.boolean({
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

  static description = `get details about a virtual instance
Arguments to this command will be passed as URL parameters to ${chalk.bold(
    `GET: /v1/orgs/self/virtualinstances/{virtualInstanceId}`,
  )}


Endpoint Reference
GET: /v1/orgs/self/virtualinstances/{virtualInstanceId}
Retrieve Virtual Instance
Get details about a virtual instance.

More documentation at ${chalk.underline(`https://docs.rockset.com/rest-api#getvirtualinstance`)}`;

  static examples = ['$ rockset api:virtualInstances:getVirtualInstance VIRTUALINSTANCEID'];

  async run() {
    const { args, flags } = await this.parse(GetVirtualInstance);

    // Rockset client object
    const client = await main.createClient();

    const namedArgs: Args = GetVirtualInstance.args;

    // apicall
    const apicall = client.virtualInstances.getVirtualInstance.bind(client.virtualInstances);

    // endpoint
    const endpoint = '/v1/orgs/self/virtualinstances/{virtualInstanceId}';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint, bodySchema });
  }
}

export default GetVirtualInstance;
