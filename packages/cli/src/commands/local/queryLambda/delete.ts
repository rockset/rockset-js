import { Flags } from '@oclif/core';
import { main, types } from '@rockset/core';
import { RockCommand } from '../../../base-command';
import * as prompts from 'prompts';

class CleanEntities extends RockCommand {
  static flags = {
    help: Flags.help({ char: 'h' }),
    yes: Flags.boolean({
      char: 'y',
      default: false,
      description: 'bypass the safety checks, and automatically engage in dangerous actions',
    }),
  };

  static args = [
    {
      name: 'name',
      required: true,
      hidden: false,
      description:
        'the fully qualified name of the lambda you wish to delete (eg. "{workspace}.{name}") ',
    },
  ];

  static description = `delete a Query Lambda from the current project`;

  static examples = [
    `$ rockset local:queryLambda:delete commons.foo
✔ WARNING: This operation will delete commons.foo, and all associated files in the current project, and can result in a loss of work. Are you sure you would like to proceed? … no`,
  ];

  async run() {
    const { flags, args } = await this.parse(CleanEntities);
    // Will throw for invalid qualified name
    const qualifiedName = types.parseLambdaQualifiedName(args.name as string);
    if (flags.yes) {
      await main.deleteQueryLambdas({ lambda: qualifiedName });
    } else {
      const message = `WARNING: This operation will delete ${qualifiedName}, and all associated files in the current project, and can result in a loss of work. Are you sure you would like to proceed?`;

      const { c } = (await prompts({
        type: 'confirm',
        name: 'c',
        initial: false,
        message,
      })) as { c: boolean };

      if (c) {
        await main.deleteQueryLambdas({ lambda: qualifiedName });
      }
    }
  }
}

export default CleanEntities;
