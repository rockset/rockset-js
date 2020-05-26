import { flags } from '@oclif/command';
import * as prompts from 'prompts';
import { helper, types, fileutil } from '@rockset/core';
import { RootConfig } from '@rockset/core/dist/types';
import { RockCommand } from '../../base-command';

class InitializeProject extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
  };

  static description = `
Initialize your project.

This command initializes your project with a rockconfig.json file.
`;

  async run() {
    try {
      const { root } = (await prompts({
        type: 'text',
        name: 'root',
        message: 'Enter the root path for your Query Lambdas',
        initial: 'src',
      })) as { root: string };

      const config: RootConfig = {
        source_root: root,
      };

      const { c } = (await prompts({
        type: 'confirm',
        name: 'c',
        initial: true,
        message: `Creating an ${types.ROOT_CONFIG} file including
${helper.prettyPrint(config)}
Is this okay?`,
      })) as { c: boolean };

      if (c) {
        await fileutil.writeRootConfig(config);
      } else {
        this.log(`Did not create ${types.ROOT_CONFIG}`);
      }
    } catch (error) {
      this.log(error);
    }
  }
}

export default InitializeProject;
