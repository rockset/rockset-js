import * as Handlebars from 'handlebars';

// Allow filesystem in this file because it is not invoked at runtime
// eslint-disable-next-line no-restricted-imports
import { promises as fs } from 'fs';
import * as p from 'path';
import functionsRaw from './functions';
import keywordsRaw from './keywords';

async function run() {
  const data = await fs.readFile(
    p.join(__dirname, '../syntaxes/rocksql.tmLanguage.handlebars')
  );
  const template = Handlebars.compile(data.toString());
  const functions = functionsRaw.map((f) => f.split('(')[0]).join('|');
  const keywords = keywordsRaw.join('|');
  const output = template({ functions, keywords });
  return await fs.writeFile(
    p.join(__dirname, '../syntaxes/rocksql.tmLanguage'),
    output
  );
}

run().then(console.log).catch(console.error);
