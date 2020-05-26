import { flags } from '@oclif/command';
import { listEntityNames } from '@rockset/core/dist/main';
import { RockCommand } from '../../base-command';

class ListEntities extends RockCommand {
  static flags = {
    help: flags.help({ char: 'h' }),
    entity: flags.string({
      char: 'e',
      options: ['lambda'],
      default: 'lambda',
      description: 'the type of entity you wish to list',
    }),
  };

  static description = `
  List all of the entities in the current project. Note: this does not list entities on remote. For that, please use
  the API endpoints present in 'rock api:...'


`;

  async run() {
    const { flags } = this.parse(ListEntities);

    // Will throw for invalid qualified name

    if (flags.entity === 'lambda') {
      const { lambdas } = await listEntityNames();
      this.log(lambdas.map((lambda) => lambda[0]).join('\n'));
    } else {
      this.error(`Unsupported entity type: ${flags.entity}`);
    }
  }
}

export default ListEntities;
