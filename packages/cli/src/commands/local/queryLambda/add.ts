import { flags } from '@oclif/command';
import { types, fileutil, pathutil } from '@rockset/core';
import { RockCommand } from '../../../base-command';
import { CLIError } from '@oclif/errors';

class AddEntity extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
  };

  static args = [
    {
      name: 'name',
      required: true,
      hidden: false,
      description: 'The fully qualified name of the lambda you wish to add',
    },
  ];

  static description = `
    Add an empty lambda with the specified name to the project. The path for the lambda is the same
    as would be created with 'rockset local:resolve'.
`;

  async run() {
    const { args } = this.parse(AddEntity);

    // Will throw for invalid qualified name
    const qualifiedName = types.parseQualifiedName(args.name as string);

    const { ws, name } = pathutil.getWsNamePair(qualifiedName);
    if (ws?.length <= 0 || name?.length <= 0)
      this.error(`Invalid qualified lambda name ${qualifiedName}.`);

    try {
      const lambda = await fileutil.readLambdaFromQualifiedName(qualifiedName);
      if (lambda) this.error(`${qualifiedName} already exists.`);
    } catch (err) {
      if (err instanceof CLIError) {
        this.error(err);
      }
    }

    const entity = await types.createEmptyQLEntity(qualifiedName);
    await fileutil.writeLambda(entity);
  }
}

export default AddEntity;
