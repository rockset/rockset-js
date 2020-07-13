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
    workspace: flags.string({
      char: 'w',
      description: 'The qualified name of the workspace to delete',
    }),
    lambda: flags.string({
      char: 'l',
      description: 'The qualified name of the lambda to delete',
      exclusive: ['workspace'],
    }),
  };

  static description = `
Delete all query lambdas from the project.

If a workspace parameter is passed, only that workspace will be deleted.
If a lambda parameter is passed, only that lambda will be deleted.
These two parameters are mutually exclusive, only one may be passed.

`;

  async run() {
    const { flags } = this.parse(CleanEntities);
    if (flags.yes) {
      await main.deleteQueryLambdas({ workspace: flags.workspace, lambda: flags.lambda });
    } else {
      const { c } = (await prompts({
        type: 'confirm',
        name: 'c',
        initial: false,
        message: `WARNING: This will delete ${flags.lambda ?? `all query lambda objects`} in ${
          flags.workspace ?? `the current project`
        } and can result in loss of work. Are you sure?`,
      })) as { c: boolean };

      if (c) {
        await main.deleteQueryLambdas({ workspace: flags.workspace, lambda: flags.lambda });
      }
    }
  }
}

export default CleanEntities;
