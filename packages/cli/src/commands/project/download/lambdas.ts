import { Command, flags } from '@oclif/command';
import { main } from '@rockset/core';

class DownloadQueryLambda extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
    tag: flags.string({
      char: 't',
      helpValue: `
        Specify a value to download all Query Lambda versions tagged with this tag. 
        Query Lambdas that do not have a version with this tag name will be skipped.
      `,
    }),
  };

  static description = `
Download Query Lambda entities from Rockset to your local project.

`;

  async run() {
    const { flags } = this.parse(DownloadQueryLambda);
    await main.downloadQueryLambdas(
      {
        onWriteLambda: (lambda) => {
          this.log(`Downloaded lambda ${lambda.fullName}`);
        },
      },
      {
        useLambdaTag: flags.tag,
      },
    );
  }
}

export default DownloadQueryLambda;
