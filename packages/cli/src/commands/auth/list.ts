import { flags } from '@oclif/command';
import { auth } from '@rockset/core';
import _ = require('lodash');
import { cli } from 'cli-ux';
import { RockCommand } from '../../base-command';

enum KeyState {
  ACTIVE = '*',
  INACTIVE = '',
}

const censorApiKey = (key: string | undefined) => {
  return key?.replace(key?.substring(4, key?.length - 4), '*********');
};

class ListProfiles extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
    showKeys: flags.boolean({ char: 's', description: 'uncensor all API Keys' }),
  };

  static description = `list all of the available profiles, and show the active profile`;

  async run() {
    const { flags } = this.parse(ListProfiles);
    // First check if there is a profile active at all
    const allAuth = await auth.listAuthProfiles();

    const configList = _.map(allAuth?.config?.profiles, (v, name) => ({
      ...v,
      name,
      active:
        name === allAuth.config?.active_profile && !allAuth.env.active
          ? KeyState.ACTIVE
          : KeyState.INACTIVE,
    }));

    const envProfile = allAuth.env.active
      ? [
          {
            ...allAuth.env.profile,
            name: 'ENV',
            active: KeyState.ACTIVE,
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
    const censoredKeys = flags.showKeys
      ? rows
      : rows.map(({ api_key, ...rest }) => ({ api_key: censorApiKey(api_key), ...rest }));
    if (rows.length > 0) {
      cli.table(censoredKeys, {
        active: {},
        name: {},
        api_server: {
          header: 'API Server',
        },
        api_key: {
          header: 'API Key',
        },
      });
    } else {
      this.error(
        'No profiles found! Please add a profile first using `rockset auth:add [profile] [apikey] [apiserver]`',
      );
    }
  }
}

export default ListProfiles;
