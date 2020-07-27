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
      description: 'a JSON string of parameters to execute the query with.',
      required: false,
      hidden: false,
      helpValue: `[{"name":"param","value":"foo","type":"string"}]`,
    }),
  };

  static args = [
    {
      name: 'name',
      required: true,
      hidden: false,
      description:
        'the fully qualified name of the lambda you wish to execute (eg. "{workspace}.{name}") ',
    },
  ];

  static examples = [`$ rockset local:queryLambda:execute commons.helloWorld`];

  static description = `execute a Query Lambda in the current project`;

  async run() {
    const { args, flags } = this.parse(ExecuteQueryLambda);

    const params = flags.parameters ? parseQueryParameterArray(flags.parameters) : [];

    // This should always be true as name is required
    if (args.name) {
      const qualifiedName = types.parseLambdaQualifiedName(args.name);
      await main.executeLocalQueryLambda(
        {
          onBeforeExecute: (sql, params) => {
            this.info(`About to execute ${args.name} from local project...`);
            this.info(`SQL: \n${sql}`);
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
