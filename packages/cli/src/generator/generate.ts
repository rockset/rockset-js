/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Get, Parameter } from './swagger-types';
import _ = require('lodash');
import * as swagger from './swagger-generated.json';
import * as Handlebars from 'handlebars';

// Allow filesystem in this file because it is not invoked at runtime
// eslint-disable-next-line no-restricted-imports
import { promises as fs } from 'fs';
import * as p from 'path';
import * as YAML from 'yaml';
import { renderSchema } from './docs-codegen';
import { tuple } from '@rockset/core/dist/helper';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const getTemplate = async () => {
  const templateText = (
    await fs.readFile(p.join(__dirname, 'apiTemplate.ts.handlebars'))
  ).toString();
  const template = Handlebars.compile(templateText);
  return template;
};

const pp = (obj: unknown) => JSON.stringify(obj, null, 2);

function getBodySchema(bodyParams: Parameter[]) {
  if (bodyParams.length > 1) {
    throw new Error('More than one body parameter');
  } else if (bodyParams.length === 1) {
    const body = bodyParams[0];
    const bodySchema = renderSchema(bodyParams[0].schema?.$ref ?? '');
    const bodyRequired = body.required;
    return tuple(YAML.stringify(bodySchema), bodyRequired);
  } else {
    return tuple(undefined, false);
  }
}

async function generate() {
  try {
    // Get the template
    const template = await getTemplate();

    const output = _.flatMap(swagger.paths, (path, endpoint: string) =>
      _.map(path, (get: Get, rawMethod: string) => {
        const method = rawMethod.toUpperCase();
        const tag = getTag(get);
        const operation = get.operationId;
        const apicall = `client.${tag}.${operation}.bind(client.${tag})`;
        const rawRequestParams = get.parameters ?? [];
        const hasBody = rawRequestParams.some((x) => x.name.toLowerCase() === 'body');
        const [bodyParams, urlParams] = _.partition(
          rawRequestParams,
          ({ schema, in: location }) => schema && location === 'body',
        );
        const [bodySchema, bodyRequired] = getBodySchema(bodyParams);
        const parameters = urlParams.map(({ name, description }) => ({
          name,
          description,
          required: true,
          hidden: false,
        }));

        // These are the tags that we want to support load testing for
        const loadTest = ['queryLambdas', 'queries', 'documents'].includes(tag);
        const schemaTooLong = (bodySchema?.length ?? 0) > 200;

        const description = getDescription({
          method,
          endpoint,
          hasBody,
          get,
          operation,
          bodyRequired,
          schemaTooLong,
          bodySchema,
        });

        const examples = getExamples({
          hasBody,
          operation,
          parameterNames: parameters.map((n) => n.name),
          topic: tag,
          bodyRequired,
          schemaTooLong,
          bodySchema,
        });

        const output = template({
          apicall,
          description,
          args: pp(parameters),
          endpoint,
          method,
          className: capitalize(operation),
          loadTest,
          bodyRequired,
          bodySchema,
          schemaTooLong,
          examples: pp(examples),
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

function getTag(get: Get) {
  return _.camelCase(get.tags[0])
    .replace(/apiKey/, 'apikey')
    .replace(/organizations/, 'orgs');
}

function getExamples({
  hasBody,
  bodySchema,
  schemaTooLong,
  parameterNames,
  topic,
  operation,
  bodyRequired,
}: {
  parameterNames: string[];
  topic: string;
  hasBody: boolean;
  operation: string;
  bodyRequired: boolean;
  schemaTooLong: boolean;
  bodySchema?: string;
}) {
  const examples = [];
  const egNoBody = `$ rockset api:${topic}:${operation} ${parameterNames
    .map((x) => x.toUpperCase())
    .join(' ')}`;
  if (!bodyRequired) {
    examples.push(egNoBody);
  }

  if (hasBody && !schemaTooLong) {
    const egBody = `${egNoBody} --body body.yaml
$ cat body.yaml
${bodySchema}
`;
    examples.push(egBody);
  }
  return examples;
}

const genChalkString = (cmd: string, str: string) => {
  return `\${chalk.${cmd}(\`${str}\`)}`;
};

function getDescription({
  method,
  endpoint,
  hasBody,
  get,
  operation,
  bodyRequired,
  schemaTooLong,
  bodySchema,
}: {
  method: string;
  endpoint: string;
  hasBody: boolean;
  get: Get;
  operation: string;
  bodyRequired: boolean;
  schemaTooLong: boolean;
  bodySchema?: string;
}) {
  const docsLink = genChalkString(
    'underline',
    `https://docs.rockset.com/rest-api#${operation.toLowerCase()}`,
  );

  const exampleBody = hasBody
    ? schemaTooLong
      ? `The ${method} body request schema has been omitted because it is too long. Please view the documentation at ${docsLink} to see the example.
`
      : `Example Body (YAML):
${bodySchema}
`
    : '';

  const bodyCallout = hasBody
    ? genChalkString(
        'bold',
        `This endpoint ${
          bodyRequired ? 'REQUIRES' : 'optionally accepts'
        } a ${method} body. To specify a ${method} body, please pass a JSON or YAML file to the --body flag.
       `,
      )
    : '';

  return `${get.description.toLowerCase().trim().replace(/\.$/, '')}
Arguments to this command will be passed as URL parameters to ${genChalkString(
    'bold',
    `${method}: ${endpoint}`,
  )}
${bodyCallout}
${exampleBody}
Endpoint Reference
${method}: ${endpoint}
${get.summary}
${get.description}

More documentation at ${docsLink}`;
}

// Run!
generate().catch(console.error);
