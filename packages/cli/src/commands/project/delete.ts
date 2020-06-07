import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { RockCommand } from '../../base-command';
import * as prompts from 'prompts';

class CleanEntities extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
    yes: flags.boolean({
      char: 'y',
      default: false,
      description: 'Bypass the safety checks, and automatically engage in dangerous actions.',
    }),
  };

  static description = `
Delete all query lambdas from the project.
`;

  async run() {
    const { flags } = this.parse(CleanEntities);
    if (flags.yes) {
      await main.deleteAllQueryLambdas();
    } else {
      const { c } = (await prompts({
        type: 'confirm',
        name: 'c',
        initial: false,
        message: `WARNING: This will delete all query lambda objects in the current project and can result in loss of work. Are you sure?`,
      })) as { c: boolean };

      if (c) {
        await main.deleteAllQueryLambdas();
      }
    }
  }
}

export default CleanEntities;
