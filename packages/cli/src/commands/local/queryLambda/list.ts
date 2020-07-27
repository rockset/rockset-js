import { flags } from '@oclif/command';
import { listEntityNames } from '@rockset/core/dist/main';
import { RockCommand } from '../../../base-command';

class ListEntities extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
  };

  static description = `list all of the Query Lambdas in the current project`;

  async run() {
    this.parse(ListEntities);

    // Will throw for invalid qualified name

    const { lambdas } = await listEntityNames();
    this.log(lambdas.map((lambda) => lambda[0]).join('\n'));
  }
}

export default ListEntities;
