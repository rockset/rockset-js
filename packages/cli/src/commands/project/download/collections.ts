import { Command, flags } from '@oclif/command';
import { main } from '@rockset/core';

class DownloadCollection extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
  };

  static description = `
Download collection entities from Rockset to your local project.

`;

  async run() {
    await main.downloadCollections({
      onWriteCollection: (collection) => {
        this.log(`Downloaded collection ${collection.fullName}`);
      },
    });
  }
}

export default DownloadCollection;
