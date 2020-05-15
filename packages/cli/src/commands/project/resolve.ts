import { Command, flags } from '@oclif/command';
import { pathutil, fileutil } from '@rockset/core';
import { getSrcPath } from '@rockset/core/dist/filesystem/fileutil';

class ResolvePath extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
    entity: flags.string({
      char: 'e',
      options: ['lambda', 'workspace'],
      default: 'lambda',
      description: 'the type of entity you wish to resolve',
    }),

    exists: flags.boolean({
      description: 'Return with an error if file does not exist',
    }),
  };

  static args = [
    {
      name: 'name',
      required: true,
      hidden: false,
      description: 'The fully qualified name of the entity you wish to resolve',
    },
  ];

  static description = `
  Resolve the absolute path of an entity in the current project.
  
  You must specify the fully qualified name of the entity: eg. 'commons.foo'.

  You must specify the type of entity that will be resolved.

`;

  async run() {
    const { args, flags } = this.parse(ResolvePath);

    if ((flags.entity === 'lambda' || flags.entity === 'workspace') && args.name) {
      const srcPath = await getSrcPath();
      const p = pathutil.resolvePathFromQualifiedName(args.name, flags.entity, srcPath);
      if ((await fileutil.exists(p)) || !flags.exists) {
        this.log(p);
      } else {
        this.error(`The entity "${args.name}" resolves to path '${p}', which does not exist.`);
      }
    } else {
      this.error(`Unsupported entity type: ${flags.entity}`);
    }
  }
}

export default ResolvePath;
