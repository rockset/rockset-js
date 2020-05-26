import { flags } from '@oclif/command';
import { auth } from '@rockset/core';
import { parseAuthProfile } from '@rockset/core/dist/filesystem/auth';
import { RockCommand } from '../../base-command';

class AddProfile extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
    activate: flags.boolean({
      char: 'a',
      default: true,
      description: 'Whether to activate the profile after creating it',
    }),
  };

  static args = [
    {
      name: 'name',
      required: true,
      hidden: false,
      description: 'The name of the profile you wish to create.',
    },
    {
      name: 'apikey',
      required: true,
      hidden: false,
      description: 'The apikey for your account',
    },
    {
      name: 'apiserver',
      required: false,
      hidden: false,
      description: 'The url for the apiserver to include in this profile',
      default: 'https://api.rs2.usw2.rockset.com',
    },
  ];

  static description = `
  Create a new profile with the specified name and apikey.
`;

  async run() {
    const { args, flags } = this.parse(AddProfile);

    // Will throw for invalid qualified name
    await auth.createAuthProfile(
      args.name,
      parseAuthProfile({
        apikey: args.apikey as unknown,
        apiserver: args.apiserver as unknown,
      }),
    );
    if (flags.activate) {
      await auth.activateAuthProfile(args.name);
    }
  }
}

export default AddProfile;
