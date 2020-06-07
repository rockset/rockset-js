import Command from '@oclif/command';

export abstract class RockCommand extends Command {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async catch(err: string | Error | any) {
    // This is necessary because oclif seems to throw errors sometimes to exit logic early...
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (err?.oclif?.exit === 0) {
      return;
    }
    this.error(JSON.stringify(err, null, 2));
  }

  info(...params: Parameters<typeof console.error>) {
    console.error('[INFO]:', ...params);
  }
}
