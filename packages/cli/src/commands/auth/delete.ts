import { Flags } from '@oclif/core';
import { auth } from '@rockset/core';
import { RockCommand } from '../../base-command';

class AddProfile extends RockCommand {
  static flags = {
    help: Flags.help({ char: 'h' }),
  };

  static args = [
    {
      name: 'name',
      required: true,
      hidden: false,
      description: 'the name of the profile you wish to delete',
    },
  ];

  static description = `delete a profile with the specified name`;

  async run() {
    const { args } = await this.parse(AddProfile);

    await auth.deleteAuthProfile(args.name);
  }
}

export default AddProfile;
