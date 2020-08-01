const fs = require("fs").promises;
const path = require("path");
const os = require("os");
const _ = require('lodash')

async function run() {
  const sqlPath = path.join(__dirname, "Sql.g4");
  const errPath = path.join(__dirname, "../tmp.err.txt");

  const lines = (await fs.readFile(sqlPath)).toString().split(os.EOL);
  const errs = (await fs.readFile(errPath)).toString().split(os.EOL);

  const results = _(errs)
    .map((line) => {
      const result = line.match(
        /Sql.g4:(\d+):\d+: symbol with conflicts with generated code in target language or runtime/
      );
      return result ? parseInt(result[1]) : null;
    })
    .compact()
    .value();

  const newText = (results.length > 0
    ? lines.map((l, i) =>
        results.includes(i + 1) ? l.replace("with", "jwith") : l
      )
    : lines
  ).join(os.EOL);

  console.log(`Replacing symbol 'with' conflict with 'jwith', in lines ${results}`)
  await fs.unlink(errPath);
  await fs.writeFile(sqlPath, newText)
}
run().catch(() => null);
