import { Command, flags } from '@oclif/command';
import { promises as fs } from 'fs';
import * as prompts from 'prompts';
import { helper, types } from '@rockset/core';

class InitializeProject extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
    file: flags.string({
      char: 'f',
      description: 'The config file to execute this command from. Format must be [yaml|json]',
    }),
  };

  static args = [
    {
      name: 'body',
      description: 'JSON object',
      required: true,
      hidden: false,
    },
  ];

  static description = `
Initialize your project.

This command initializes your project with a rockconfig.json file.


`;

  async run() {
    const cwd = process.cwd();
    const isEmpty = (await fs.readdir(cwd)).length === 0;

    if (!isEmpty) {
      throw new Error('Directory must be empty during initialization.');
    }

    try {
      const { root } = await prompts({
        type: 'text',
        name: 'root',
        message: 'Enter the root path for your Query Lambdas',
        initial: 'src',
      });

      const { c } = await prompts({
        type: 'confirm',
        name: 'c',
        initial: true,
        message: `Creating an ${types.ROOT_CONFIG} file including
${helper.prettyPrint({ root })}
Is this okay?`,
      });

      if (c) {
        fs.writeFile(types.ROOT_CONFIG, helper.prettyPrint({ root }));
      } else {
        this.log(`Did not create ${types.ROOT_CONFIG}`);
      }
    } catch (error) {
      this.log(error);
    }
  }
}

export default InitializeProject;
