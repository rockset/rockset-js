import { flags } from '@oclif/command';
import { RockCommand } from '../../base-command';
import { serve } from '@rockset/dev-server';

class ServeQls extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
    port: flags.integer({
      char: 'p',
      default: 3001,
      description: 'the port to listen at',
    }),
  };

  static description = `start development server and open the Developer UI. Used to configure parameters and execute SQL files in your local project`;

  async run() {
    const { flags } = this.parse(ServeQls);
    await serve(flags.port);
  }
}

export default ServeQls;
