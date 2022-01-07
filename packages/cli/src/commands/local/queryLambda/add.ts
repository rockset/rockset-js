import { Flags } from '@oclif/core';
import { types, fileutil, pathutil } from '@rockset/core';
import { RockCommand } from '../../../base-command';
import * as chalk from 'chalk';

class AddEntity extends RockCommand {
  static flags = {
    help: Flags.help({ char: 'h' }),
    description: Flags.string({
      char: 'd',
      description: 'set the description for the Query Lambda',
    }),
  };

  static args = [
    {
      name: 'name',
      required: true,
      hidden: false,
      description:
        'the fully qualified name of the lambda you wish to add (eg. "{workspace}.{name}") ',
    },
  ];

  static examples = [
    ` $ rockset local:queryLambda:add commons.helloWorld -d "my lambda"
Successfully added Query Lambda commons.helloWorld to path /Users/tchordia/rockset/src/commons/helloWorld.lambda.json
  `,
  ];

  static description = `add a Query Lambda to the current project`;

  async run() {
    const { args, flags } = await this.parse(AddEntity);

    // Will throw for invalid qualified name
    const qualifiedName = types.parseLambdaQualifiedName(args.name as string);

    const srcPath = await fileutil.getSrcPath();
    const lambda = await pathutil.resolvePathFromQualifiedName(qualifiedName, 'lambda', srcPath);

    const lambdaExists = await fileutil.exists(lambda);
    if (lambdaExists) {
      this.error(`${qualifiedName} already exists.`);
    }

    const entity = await types.createEmptyQLEntity(qualifiedName, flags?.description);
    await fileutil.writeLambda(entity);
    this.log(
      chalk`Successfully added Query Lambda {green ${qualifiedName}} to path {green ${lambda}}`,
    );
  }
}

export default AddEntity;
