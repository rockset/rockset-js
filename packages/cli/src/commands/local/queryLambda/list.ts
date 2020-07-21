import { flags } from '@oclif/command';
import { listEntityNames } from '@rockset/core/dist/main';
import { RockCommand } from '../../../base-command';

class ListEntities extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
  };

  static description = `
  List all of the entities in the current project. Note: this does not list entities on remote. For that, please use
  the API endpoints present in 'rockset api:...'


`;

  async run() {
    this.parse(ListEntities);

    // Will throw for invalid qualified name

    const { lambdas } = await listEntityNames();
    this.log(lambdas.map((lambda) => lambda[0]).join('\n'));
  }
}

export default ListEntities;
