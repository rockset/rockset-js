import { flags } from '@oclif/command';
import { types, fileutil, pathutil } from '@rockset/core';
import { getSrcPath } from '@rockset/core/dist/filesystem/fileutil';
import { RockCommand } from '../../base-command';

class ResolvePath extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
    entity: flags.string({
      char: 'e',
      options: ['lambda', 'workspace'],
      default: 'lambda',
      description: 'the type of entity you wish to resolve',
    }),

    exists: flags.boolean({
      description: 'return with an error if file does not exist',
      default: true,
      allowNo: true,
    }),

    sql: flags.boolean({
      description: 'return the SQL file path (only for Query Lambdas)',
    }),
  };

  static args = [
    {
      name: 'name',
      required: true,
      hidden: false,
      description:
        'the fully qualified name of the lambda you wish to resolve (eg. "{workspace}.{name}") ',
    },
  ];

  static description = `resolve the absolute path of an entity in the current project`;

  static examples = [
    `$ rockset local:resolve commons.myLambda`,
    `$ rockset local:resolve commons.myLambda --sql`,
  ];

  async run() {
    const { args, flags } = this.parse(ResolvePath);

    // These must be specified, as they are marked required above
    const entity = flags.entity as 'lambda' | 'workspace';
    const name = args.name as string;

    // Report the path to the user
    const reportPath = async (p: string) => {
      if ((await fileutil.exists(p)) || !flags.exists) {
        this.log(p);
      } else {
        this.error(`The entity "${name}" resolves to path '${p}', which does not exist.`);
      }
    };

    // In the case of a lambda
    if (entity === 'lambda') {
      const qualifiedName = types.parseLambdaQualifiedName(name);
      if (flags.sql) {
        const path = await fileutil
          .getLambdaSqlPathFromQualifiedName(qualifiedName)
          .catch((error: unknown) => {
            this.error(
              `There was an error while trying to parse your lambda config. Are you sure this lambda exists and is formatted correctly? ${error}`,
            );
          });
        await reportPath(path);
      } else {
        const srcPath = await getSrcPath();
        const p = pathutil.resolvePathFromQualifiedName(qualifiedName, entity, srcPath);
        await reportPath(p);
      }
    } else {
      // This is a workspace
      const qualifiedName = types.parseWorkspaceQualifiedName(name);
      const srcPath = await getSrcPath();
      const p = pathutil.resolvePathFromQualifiedName(qualifiedName, entity, srcPath);
      await reportPath(p);
    }
  }
}

export default ResolvePath;
