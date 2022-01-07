import { Flags } from '@oclif/core';
import { main } from '@rockset/core';
import { RockCommand } from '../../base-command';
import * as prompts from 'prompts';
import * as chalk from 'chalk';
import { prettyPrint } from '@rockset/core/dist/helper';

class DownloadQueryLambda extends RockCommand {
  static flags = {
    help: Flags.help({ char: 'h' }),
    yes: Flags.boolean({
      char: 'y',
      default: false,
      description: 'bypass the safety checks, and automatically engage in dangerous actions',
    }),
    tag: Flags.string({
      char: 't',
      description: `only download Query Lambda versions marked with this tag`,
      helpValue: 'production',
    }),
  };

  static description = `download Query Lambda entities from Rockset to your local project
  
  Note: For operating systems that are case insensitive (eg. MacOS and Windows), it is possible that two different Query Lambdas from the server will be associated with the same paths on disk. This command will skip Query Lambdas that would otherwise overwrite each other.`;

  async run() {
    const { flags } = await this.parse(DownloadQueryLambda);

    const downloadLambdas = () =>
      main.downloadQueryLambdas(
        {
          onWriteLambda: (lambda) => {
            this.log(chalk`Downloaded lambda {green ${lambda.fullName}}`);
          },
          onNoOp: () => this.log('No lambdas found.'),
          onDuplicateLambdas: (duplicates) => {
            this.warn(
              `Your filesystem is case-insensitive, and we have found multiple Query Lambdas that map to the same path. Skipping all of the following Query Lambdas.
              ${prettyPrint(duplicates)}
Please delete or rename Query Lambdas that are duplicates before re-attempting to download them.
              `,
            );
          },
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
