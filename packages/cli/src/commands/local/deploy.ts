import { Flags } from '@oclif/core';
import { main } from '@rockset/core';
import { QueryLambdaVersionResponse, ErrorModel } from '@rockset/client/dist/codegen/api';
import { LambdaEntity } from '@rockset/core/dist/types';
import { RockCommand } from '../../base-command';
import * as chalk from 'chalk';

class DeployQueryLambda extends RockCommand {
  static flags = {
    help: Flags.help({ char: 'h' }),
    tag: Flags.string({
      char: 't',
      helpValue: `specify a tag name to be applied to deployed Query Lambda versions`,
    }),
    workspace: Flags.string({
      char: 'w',
      description: 'the qualified name of the workspace to deploy',
    }),
    lambda: Flags.string({
      char: 'l',
      description: 'the qualified name of the lambda to deploy',
      exclusive: ['workspace'],
    }),
    failOnMissingWorkspace: Flags.boolean({
      description:
        'if a workspace does not exist in the remote, the deploy will fail instead of creating one',
      default: false,
    }),
    dryRun: Flags.boolean({
      description: 'print out the names of the Query Lambdas that would be deployed and return',
      default: false,
    }),
    onlyDeployIfFlagged: Flags.boolean({
      description:
        'if true, only lambdas with the flag of shouldDeploy in the local metadata file will be deployed',
      default: false,
    }),
  };

  static description = `deploy Query Lambda entities to Rockset

If a workspace parameter is passed, only Query Lambdas in that workspace will be deployed.
If a lambda parameter is passed, only that Query Lambda will be deployed.
`;

  async run() {
    const { flags } = await this.parse(DeployQueryLambda);
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
        createMissingWorkspace: !flags.failOnMissingWorkspace,
        onlyDeployIfFlagged: flags.onlyDeployIfFlagged,
      },
    );
  }
}

export default DeployQueryLambda;
