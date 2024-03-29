import { Flags } from '@oclif/core';
import * as prompts from 'prompts';
import { types, fileutil } from '@rockset/core';
import { RockCommand } from '../../base-command';
import * as chalk from 'chalk';

export const DEFAULT_SOURCE_ROOT = 'src';

class InitializeProject extends RockCommand {
  static flags = {
    help: Flags.help({ char: 'h' }),
    yes: Flags.boolean({ char: 'y' }),
  };

  static description = `initialize your project with a ${types.ROOT_CONFIG} file.`;

  async run() {
    const { flags } = await this.parse(InitializeProject);
    const writeRootConfig = async (source_root: string = DEFAULT_SOURCE_ROOT) => {
      await fileutil.writeRootConfig({
        source_root,
      });
      this.log(chalk`Created root config at {green ${types.ROOT_CONFIG}}`);
      await fileutil.ensureSrcDir();
    };

    if (flags.yes) {
      return writeRootConfig();
    }

    // Ask the user to choose the root path
    const { root } = (await prompts({
      type: 'text',
      name: 'root',
      message: 'Enter the root path for your Query Lambdas',
      initial: DEFAULT_SOURCE_ROOT,
    })) as { root: string };
    if (root) {
      await writeRootConfig(root);
    } else {
      this.log('Did not write config file');
    }
  }
}

export default InitializeProject;
