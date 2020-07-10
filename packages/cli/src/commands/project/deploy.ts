import { flags } from '@oclif/command';
import { main } from '@rockset/core';
import { QueryLambdaVersionResponse, ErrorModel } from '@rockset/client/dist/codegen/api';
import { LambdaEntity } from '@rockset/core/dist/types';
import { RockCommand } from '../../base-command';
import * as chalk from 'chalk';

class DeployQueryLambda extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
    tag: flags.string({
      char: 't',
      helpValue: ` Specify a tag name to be applied to these Query Lambda versions. `,
    }),
    workspace: flags.string({
      char: 'w',
      description: 'The qualified name of the workspace to deploy',
    }),
    lambda: flags.string({
      char: 'l',
      description: 'The qualified name of the lambda to deploy',
      exclusive: ['workspace'],
    }),
    createMissingWorkspaces: flags.boolean({
      description: 'If a workspace does not exist in the remote, create it',
      default: false,
    }),
    dryRun: flags.boolean({
      description:
        'If this flag is set, the tool will print out the names of the query lambdas it would deploy and return',
      default: false,
    }),
  };

  static description = `
Deploy Query Lambda entities to Rockset from your local project. 

If a workspace parameter is passed, only that workspace will be deployed
If a lambda parameter is passed, only that lambda will be deployed
These two parameters are mutually exclusive, only one may be passed.

`;

  async run() {
    const { flags } = this.parse(DeployQueryLambda);
    await main.deployQueryLambdas(
      {
        onDeployStart: (lambda: LambdaEntity) => {
          if (flags.dryRun) {
            this.log(chalk.green(lambda.fullName));
          }
        },
        onDeployVersionSuccess: (lambda: QueryLambdaVersionResponse) => {
          this.log(
            chalk`Successfully updated {green ${lambda.data?.workspace}.${lambda.data?.name}} — version {green ${lambda.data?.version}}`,
          );
        },
        onDeployTagSuccess: (lambda: QueryLambdaVersionResponse) => {
          this.log(
            chalk`Successfully tagged {blueBright ${lambda.data?.workspace}.${lambda.data?.name}} version {blueBright ${lambda.data?.version}} with tag {blueBright "${flags.tag}"}`,
          );
        },
        onDeployError: (error: ErrorModel, lambda: LambdaEntity) => {
          this.error(error.message ?? `Unknown error deploying lambda ${lambda.fullName}`);
        },
        onSkipQueryLambda: (queryLambdaName) => {
          this.warn(`Skipping: ${queryLambdaName}`);
        },
      },
      {
        tag: flags.tag,
        workspace: flags.workspace,
        lambda: flags.lambda,
        dryRun: flags.dryRun,
        createMissingWorkspace: flags.createMissingWorkspaces,
      },
    );
  }
}

export default DeployQueryLambda;
