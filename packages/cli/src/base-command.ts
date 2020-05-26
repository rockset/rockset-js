import Command from '@oclif/command';

export abstract class RockCommand extends Command {
  async catch(err: string | Error) {
    this.error(err);
  }
}
