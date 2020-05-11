import {SwaggerGenerated, Get} from './swaggerTypes';
import _ = require('lodash');
import * as swaggerI from './swagger-generated.json';
import * as Handlebars from 'handlebars';
import {promises as fs} from 'fs';
import * as p from 'path';

const swagger = swaggerI as SwaggerGenerated;

var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /^\s*(_?)(.+?)\1\s*$/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;

function getArgs(fn: Function) {
  const fnText = fn.toString().replace(STRIP_COMMENTS, '');
  const argDecl = fnText.match(FN_ARGS);
  const args =
    argDecl?.[1]
      .split(FN_ARG_SPLIT)
      .map((arg) => {
        return arg.match(FN_ARG)?.[2];
      })
      .filter((x) => x) ?? [];

  return args as string[];
}

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

async function generate() {
  const paths = swagger.paths;
  try {
    const templateText = (await fs.readFile(p.join(__dirname, 'apiTemplate.ts.handlebars'))).toString();
  const template = Handlebars.compile(templateText);

  const output = _.flatMap(paths, (path) => _.values(path).map((get: Get) => {
    const tag = _.camelCase(get.tags[0]);
    const operation = get.operationId;
    const apicall = `client.${tag}.${operation}.bind(client.${tag})`;
    const description = get.description;
    const parameters = get.parameters;
    const output = template({apicall, description, args: parameters, className: capitalize(operation)})
    return {topic: tag, filename: operation, value: output};
  }))
  console.log(output);
  output.forEach(out => {
    const d = p.join(p.dirname(__dirname), 'commands', 'api', out.topic);
    fs.mkdir(d, {recursive: true});
    fs.writeFile(p.join(d,  out.filename), out.value);
  })
  } catch (e) {
    console.log(e);
  }
}

generate();