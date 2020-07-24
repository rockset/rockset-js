/* eslint-disable unicorn/filename-case */
// Generated file, please do not edit directly

import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';
import { RockCommand } from '../../../base-command';

import { cli } from 'cli-ux';

class GetOrganization extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),

    raw: flags.boolean({
      description:
        'Show the raw output from the server, instead of grabbing the results. Usually used in conjunction with --output=json',
    }),
    ...cli.table.flags(),
  };

  static args = [];

  static description = `
Get Organization

Retrieve information about current organization.

Endpoint: GET: /v1/orgs/self

Endpoint Documentation: https://docs.rockset.com/rest-api#getorganization

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

  async run() {
    const { args, flags } = this.parse(GetOrganization);

    // Rockset client object
    const client = await main.createClient();

    // Arguments for API call. These arguments are the same as GetOrganization.args for a GET request
    const namedArgs: Args = [];

    // apicall
    const apicall = client.orgs.getOrganization.bind(client.orgs);

    // endpoint
    const endpoint = '/v1/orgs/self';
    const method = 'GET';

    await runApiCall.bind(this)({ args, flags, namedArgs, apicall, method, endpoint });
  }
}

export default GetOrganization;
