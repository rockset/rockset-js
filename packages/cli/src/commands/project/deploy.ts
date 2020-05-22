import { Command, flags } from '@oclif/command';
import { main } from '@rockset/core';
import { QueryLambdaVersionResponse, ErrorModel } from '@rockset/client/dist/codegen/api';
import { LambdaEntity } from '@rockset/core/dist/types';

// (TODO) add flags / args that support deploying certain workspace / file globs
class DeployQueryLambda extends Command {
  static flags = {
    help: flags.help({ char: 'h' }),
    tag: flags.string({
      char: 't',
      helpValue: `
        Specify a tag name to be applied to these Query Lambda versions.
      `,
    }),
  };

  static description = `
Deploy Query Lambda entities to Rockset from your local project.

`;

  async run() {
    const { flags } = this.parse(DeployQueryLambda);
    await main.deployQueryLambdas(
      {
        onDeployVersionSuccess: (lambda: QueryLambdaVersionResponse) => {
          this.log(
            `Successfully updated ${lambda.data?.workspace}.${lambda.data?.name} — version ${lambda.data?.version}`,
          );
        },
        onDeployTagSuccess: (lambda: QueryLambdaVersionResponse) => {
          this.log(
            `Successfully tagged ${lambda.data?.workspace}.${lambda.data?.name} version ${lambda.data?.version} with tag "${flags.tag}"`,
          );
        },
        onDeployError: (error: ErrorModel, lambda: LambdaEntity) => {
          this.error(error.message ?? `Unknown error deploying lambda ${lambda.fullName}`);
        },
      },
      {
        tag: flags.tag,
      },
    );
  }
}

export default DeployQueryLambda;
