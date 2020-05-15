import { Command, flags } from '@oclif/command';
import { main } from '@rockset/core';

class DownloadProject extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
  };

  static description = `
Download project entites from Rockset to your local project.

`;

  async run() {
    main.download(
      {
        onWriteCollection: (collection) => {
          this.log(`Downloaded collection ${collection.fullName}`);
        },
        onWriteLambda: (lambda) => {
          this.log(`Downloaded lambda ${lambda.fullName}`);
        },
      },
      {
        writeLambdas: true,
      },
    );
  }
}

export default DownloadProject;
