import { flags } from '@oclif/command';
import { types, fileutil } from '@rockset/core';
import { RockCommand } from '../../base-command';

class AddEntity extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
    entity: flags.string({
      char: 'e',
      options: ['lambda'],
      default: 'lambda',
      description: 'the type of entity you wish to add',
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
  Add an empty entity with the specified name to the project. The path for the entity is the same
  as would be created with 'rockset project:resolve'


`;

  async run() {
    const { args, flags } = this.parse(AddEntity);

    // Will throw for invalid qualified name
    const qualifiedName = types.parseQualifiedName(args.name as string);

    if (flags.entity === 'lambda' && args.name) {
      const entity = await types.createEmptyQLEntity(qualifiedName);
      await fileutil.writeLambda(entity);
    } else {
      this.error(`Unsupported entity type: ${flags.entity}`);
    }
  }
}

export default AddEntity;
