import Command from '@oclif/command';
import { prettyPrint, wait } from '@rockset/core/dist/helper';
import _ = require('lodash');
import { RockClientException } from '@rockset/core/dist/exception/exception';
import { CLIError } from '@oclif/errors';
import { ErrorModel } from '@rockset/client/dist/codegen/api';
import { main, auth } from '@rockset/core';
import AbortController from 'abort-controller';
import * as chalk from 'chalk';

// Globally handle all unhandled promise rejections
process.on('unhandledRejection', function (reason, p) {
  // If we aren't in debug mode, swallow unhandled promise rejections
  if (process.env.ROCKSET_CLI_DEBUG_MODE) {
    // Log unhandled promise errors if we are in debug mode
    console.error('Unhandled', reason, p);
    console.error(
      'This is likely a bug in the Rockset CLI. Please contact Rockset Support with the error message to resolve this issue.',
    );
  }
});

type ThrownError = string | Error | CLIError | ErrorModel | unknown;
export abstract class RockCommand extends Command {
  async catch(err: ThrownError) {
    // This is necessary because oclif seems to throw errors sometimes to exit logic early...
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (err instanceof CLIError && err?.oclif?.exit === 0) {
      return;
    }

    this.logTelemetrics({ error: err });

    const finalErr = `

${_.truncate(prettyPrint(err), { length: 500 })}

${err}
    `;
    this.error(finalErr);
  }

  info(param: string) {
    console.error(chalk.gray`[INFO]: ${param}`);
  }

  async init() {
    this.logTelemetrics();
  }

  logTelemetrics({
    error,
  }: {
    error?: ThrownError;
  } = {}) {
    try {
      // Don't want to log the actual error object
      const errorId = error && error instanceof RockClientException ? error.id : null;
      const { name: commandClassName } = this.constructor;
      const { version, platform, arch, shell } = this.config;
      const commandName = this.id;
      const timestamp = Date.now();
      const readable = new Date();
      const timestampReadable = readable.toUTCString();
      const type = errorId ? 'ERROR' : 'INFO';

      const allTelemetrics = {
        commandClassName,
        version,
        platform,
        arch,
        shell,
        commandName,
        timestamp,
        timestampReadable,
        type,
        errorId,
      };

      // Don't block for this
      if (!process.env.ROCKSET_CLI_TELEMETRY_OPTOUT) {
        const controller = new AbortController();
        main
          .createClient()
          .then(async (client) => {
            const { api_server } = await auth.getAuthProfile();
            const body = JSON.stringify({
              event: allTelemetrics,
            });

            const endpoint = `${api_server}/v1/telemetry`;
            const options = {
              method: 'POST',
              body,
              headers: {
                'Content-Type': 'application/json',
              },
              signal: controller.signal,
            };
            const prom = client._fetch(endpoint, options);

            // cancel the request in 50ms
            // Note that this just rejects the promise, doesn't cancel a request that has been sent
            // Doing this prevents the process from staying alive if the request is taking too long
            await wait(50);
            controller.abort();
            return prom;
          })
          .catch(() => {});
      }
    } catch (_) {
      // Something went wrong, fail silently
    }
  }
}
