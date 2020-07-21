import { flags } from '@oclif/command';
import { types, fileutil, pathutil } from '@rockset/core';
import { RockCommand } from '../../../base-command';
import * as chalk from 'chalk';

class AddEntity extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
  };

  static args = [
    {
      name: 'name',
      required: true,
      hidden: false,
      description:
        'The fully qualified name of the lambda you wish to add. A Qualified Name is a string formatted like "{ws}.{name}". ',
    },
  ];

  static examples = [
    ` $ rockset local:queryLambda:add commons.helloWorld
Successfully added Query Lambda commons.helloWorld to path /Users/tchordia/rockset/src/commons/helloWorld.lambda.json
  `,
  ];

  static description = `
    Add an empty lambda with the specified name to the project. The path for the lambda is the same
    as would be created with 'rockset local:resolve'.
`;

  async run() {
    const { args } = this.parse(AddEntity);

    // Will throw for invalid qualified name
    const qualifiedName = types.parseLambdaQualifiedName(args.name as string);

    const srcPath = await fileutil.getSrcPath();
    const lambda = await pathutil.resolvePathFromQualifiedName(qualifiedName, 'lambda', srcPath);

    const lambdaExists = await fileutil.exists(lambda);
    if (lambdaExists) {
      this.error(`${qualifiedName} already exists.`);
    }

    const entity = await types.createEmptyQLEntity(qualifiedName);
    await fileutil.writeLambda(entity);
    this.log(
      chalk`Successfully added Query Lambda {green ${qualifiedName}} to path {green ${lambda}}`,
    );
  }
}

export default AddEntity;
