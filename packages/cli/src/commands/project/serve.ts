import { flags } from '@oclif/command';
import { RockCommand } from '../../base-command';
import { serve } from '@rockset/dev-server';

class ServeQls extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
    port: flags.integer({
      char: 'p',
      default: 3001,
      description: 'The port to start the server at',
    }),
  };

  static description = `
  Start a development server that allows you to execute Query Lambdas from your local project from a development UI.


`;

  async run() {
    const { flags } = this.parse(ServeQls);
    await serve(flags.port);
  }
}

export default ServeQls;
