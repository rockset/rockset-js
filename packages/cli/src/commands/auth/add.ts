import { flags } from '@oclif/command';
import { auth } from '@rockset/core';
import { parseAuthProfile } from '@rockset/core/dist/filesystem/auth';
import { RockCommand } from '../../base-command';
import * as chalk from 'chalk';

class AddProfile extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
    activate: flags.boolean({
      char: 'a',
      default: true,
      description: 'whether to activate the profile after creating it',
      allowNo: true,
    }),
  };

  static args = [
    {
      name: 'name',
      required: true,
      hidden: false,
      description: 'the name of the profile you wish to create',
    },
    {
      name: 'apikey',
      required: true,
      hidden: false,
      description: 'the apikey for your account',
    },
    {
      name: 'apiserver',
      required: false,
      hidden: false,
      description: 'the url for the Rockset API server to use',
      default: 'https://api.rs2.usw2.rockset.com',
    },
  ];

  static description = chalk`create a new profile with the specified name and apikey.
  
  You can find an API Key for your account in the Rockset Console. {underline https://console.rockset.com/apikeys}
  `;

  async run() {
    const { args, flags } = this.parse(AddProfile);

    // Will throw for invalid qualified name
    await auth.createAuthProfile(
      args.name,
      parseAuthProfile({
        api_key: args.apikey as unknown,
        api_server: args.apiserver as unknown,
      }),
    );
    if (flags.activate) {
      await auth.activateAuthProfile(args.name);
      this.info(`Successfully added profile ${args.name}`);
    }
  }
}

export default AddProfile;
