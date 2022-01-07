import { Flags } from '@oclif/core';
import { RockCommand } from '../../base-command';
import { serve } from '@rockset/dev-server';

class ServeQls extends RockCommand {
  static flags = {
    help: Flags.help({ char: 'h' }),
    port: Flags.integer({
      char: 'p',
      default: 3001,
      description: 'the port to listen at',
    }),
  };

  static description = `start development server and open the Developer UI. Used to configure parameters and execute SQL files in your local project`;

  async run() {
    const { flags } = await this.parse(ServeQls);
    await serve(flags.port);
  }
}

export default ServeQls;
