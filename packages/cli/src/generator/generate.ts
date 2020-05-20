import { Get } from './swagger-types';
import _ = require('lodash');
import * as swagger from './swagger-generated.json';
import * as Handlebars from 'handlebars';

// Allow filesystem in this file because it is not invoked at runtime
// eslint-disable-next-line no-restricted-imports
import { promises as fs } from 'fs';
import * as p from 'path';

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

async function generate() {
  const paths = swagger.paths;
  try {
    const templateText = (
      await fs.readFile(p.join(__dirname, 'apiTemplate.ts.handlebars'))
    ).toString();
    const template = Handlebars.compile(templateText);
    const pp = (obj: unknown) => JSON.stringify(obj, null, 2);

    const output = _.flatMap(paths, (path, endpoint: string) =>
      _.map(path, (get: Get, method: string) => {
        const tag = _.camelCase(get.tags[0])
          .replace(/apiKey/, 'apikey')
          .replace(/organizations/, 'orgs');
        const operation = get.operationId;
        const apicall = `client.${tag}.${operation}.bind(client.${tag})`;
        const parameters = pp(
          (get.parameters ?? []).map(({ name, description, required }) => ({
            name,
            description,
            required,
            hidden: false,
          })),
        );

        const description = `
${get.summary}

${get.description}

Endpoint: ${method.toUpperCase()}: ${endpoint}

Endpoint Documentation: https://docs.rockset.com/rest-api#${operation.toLowerCase()}

This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.

`;

        const output = template({
          apicall,
          description,
          args: parameters,
          className: capitalize(operation),
        });
        return { topic: tag, filename: operation, value: output };
      }),
    );
    output.forEach(async (out) => {
      const d = p.join(p.dirname(__dirname), 'commands', 'api', out.topic);
      await fs.mkdir(d, { recursive: true });
      return fs.writeFile(p.join(d, `${out.filename}.ts`), out.value);
    });
  } catch (error) {
    console.log(error);
  }
}

generate().catch(console.error);
