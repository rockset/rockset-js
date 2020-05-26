import { flags } from '@oclif/command';
import { auth } from '@rockset/core';
import _ = require('lodash');
import { cli } from 'cli-ux';
import { RockCommand } from '../../base-command';

class ListProfiles extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
  };

  static description = `
  List all of the available profiles.
`;

  async run() {
    // First check if there is a profile active at all
    const allAuth = await auth.listAuthProfiles();

    const configList = _.map(allAuth?.config?.profiles, (v, name) => ({
      ...v,
      name,
      active: name === allAuth.config?.activeProfile && !allAuth.env.active,
    }));

    const envProfile = allAuth.env.active
      ? [
          {
            ...allAuth.env.profile,
            name: 'ENV',
            active: true,
          },
        ]
      : [];

    const rows = envProfile.concat(configList);

    if (allAuth.env.active) {
      this.warn(`
The current authentication profile is configured from the environment.
If you would like to activate a different profile, please first clear the following environment variables.
ROCKSET_APIKEY
ROCKSET_APISERVER
        `);
    }
    if (rows.length > 0) {
      cli.table(rows, {
        active: {},
        name: {},
        apiserver: {},
        apikey: {},
      });
    } else {
      this.log('No profiles found! Please add a profile first.');
    }
  }
}

export default ListProfiles;
