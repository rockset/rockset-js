import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { RockCommand } from '../../../base-command';

class DownloadCollection extends RockCommand {
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
