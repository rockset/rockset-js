import { flags } from '@oclif/command';
import { types, main, helper } from '@rockset/core';
import { RockCommand } from '../../../base-command';
import { QueryResponse, ErrorModel } from '@rockset/client/dist/codegen/api';
import { LambdaEntity, parseQueryParameterArray } from '@rockset/core/dist/types';

class ExecuteQueryLambda extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
    parameters: flags.string({
      char: 'p',
      description: 'A JSON string of parameters to execute the query with.',
      required: false,
      hidden: false,
    }),
  };

  static args = [
    {
      name: 'name',
      required: true,
      hidden: false,
      description: 'The fully qualified name of the Query Lambda you wish to execute',
    },
  ];

  static description = `
  Execute a specific version of a Query Lambda in the current project.
  
  You must specify the fully qualified name of the Query Lambda: eg. 'commons.foo'.

`;

  async run() {
    const { args, flags } = this.parse(ExecuteQueryLambda);

    const params = flags.parameters ? parseQueryParameterArray(flags.parameters) : [];

    // This should always be true as name is required
    if (args.name) {
      const qualifiedName = types.parseQualifiedName(args.name);
      await main.executeLocalQueryLambda(
        {
          onBeforeExecute: (sql, params) => {
            this.info(`About to execute ${args.name} from local project...`);
            this.info(`SQL: ${sql}`);
            this.info(`Parameters: ${helper.prettyPrint(params)}`);
          },
          onExecuteSuccess: (response: QueryResponse) => {
            this.info('Successfully executed query.');
            this.log(helper.prettyPrint(response));
          },
          onExecuteError: (error: ErrorModel, lambda: LambdaEntity) => {
            this.error(error.message ?? `Unknown error executing lambda ${lambda.fullName}`);
          },
        },
        qualifiedName,
        params,
      );
    }
  }
}

export default ExecuteQueryLambda;
