import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { RockCommand } from '../../base-command';
import * as prompts from 'prompts';
import * as chalk from 'chalk';

class DownloadQueryLambda extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
    yes: flags.boolean({
      char: 'y',
      default: false,
      description: 'bypass the safety checks, and automatically engage in dangerous actions',
    }),
    tag: flags.string({
      char: 't',
      description: `only download Query Lambda versions marked with this tag`,
      helpValue: 'production',
    }),
  };

  static description = `download Query Lambda entities from Rockset to your local project`;

  async run() {
    const { flags } = this.parse(DownloadQueryLambda);

    const downloadLambdas = () =>
      main.downloadQueryLambdas(
        {
          onWriteLambda: (lambda) => {
            this.log(chalk`Downloaded lambda {green ${lambda.fullName}}`);
          },
          onNoOp: () => this.log('No lambdas found.'),
        },
        {
          useLambdaTag: flags.tag,
        },
      );

    if (flags.yes) {
      await downloadLambdas();
    } else {
      const { c } = (await prompts({
        type: 'confirm',
        name: 'c',
        initial: false,
        message: `WARNING: This will overwrite all Query Lambda objects downloaded to the current project, and can result in loss of work. Are you sure?`,
      })) as { c: boolean };

      if (c) {
        await downloadLambdas();
      }
    }
  }
}

export default DownloadQueryLambda;
