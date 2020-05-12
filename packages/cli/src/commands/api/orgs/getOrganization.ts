/* eslint-disable unicorn/filename-case */

// Generated file, please do not edit directly

import { Command, flags } from '@oclif/command';
import { createClient } from '@rockset/core';
import { runApiCall, Args } from '../../../helper/util';

class GetOrganization extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
    file: flags.string({
      char: 'f',
      description: 'The config file to execute this command from. Format must be [yaml|json]',
    }),
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
    const client = await createClient();

    // Arguments
    const namedArgs: Args = GetOrganization.args;

    // apicall
    const apicall = client.orgs.getOrganization.bind(client.orgs);

    runApiCall.bind(this)({ args, flags, namedArgs, apicall });
  }
}

export default GetOrganization;
