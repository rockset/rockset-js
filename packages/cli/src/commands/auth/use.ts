import { Flags } from '@oclif/core';
import { auth } from '@rockset/core';
import { RockCommand } from '../../base-command';

class UseProfile extends RockCommand {
  static flags = {
    help: Flags.help({ char: 'h' }),
  };

  static args = [
    {
      name: 'name',
      required: true,
      hidden: false,
      description: 'The name of the profile you wish to use.',
    },
  ];

  static description = `use a specific authentication profile`;

  async run() {
    const { args } = await this.parse(UseProfile);
    await auth.activateAuthProfile(args.name);
    this.info(`Successfully activated profile ${args.name}`);
  }
}

export default UseProfile;
