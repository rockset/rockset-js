import { flags } from '@oclif/command';
import { types, main } from '@rockset/core';
import { RockCommand } from '../../base-command';
import { QueryResponse, ErrorModel } from '@rockset/client/dist/codegen/api';
import { LambdaEntity } from '@rockset/core/dist/types';

class ExecuteQueryLambda extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
  };

  static args = [
    {
      name: 'name',
      required: true,
      hidden: false,
      description: 'The fully qualified name of the Query Lambda you wish to execute',
    },
    {
      name: 'version',
      required: true,
      hidden: false,
      description: 'The Query Lambda version you wish to execute',
    },
  ];

  static description = `
  Execute a specific version of a Query Lambda in the current project.
  
  You must specify the fully qualified name of the Query Lambda: eg. 'commons.foo'.

  You must specify the specific version to execute: eg. 'b1d7c9a34b50cd'.

`;

  async run() {
    const { args } = this.parse(ExecuteQueryLambda);

    if (args.name && args.version) {
      const qualifiedName = types.parseQualifiedName(args.name);
      await main.executeQueryLambda(
        {
          onExecuteSuccess: (response: QueryResponse) => {
            this.log(`Successfully executed: ${JSON.stringify(response.results)}"`);
          },
          onExecuteError: (error: ErrorModel, lambda: LambdaEntity) => {
            this.error(error.message ?? `Unknown error executing lambda ${lambda.fullName}`);
          },
        },
        qualifiedName,
        args.version,
      );
    }
  }
}

export default ExecuteQueryLambda;
