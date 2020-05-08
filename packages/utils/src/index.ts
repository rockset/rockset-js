import rocksetConfigure from "rockset";
import { promises as fs } from "fs";
import path from "path";
const get = require("lodash.get");
const prompts = require("prompts");

const SECRETS_FILE = ".rssecret";
const CONFIG_FILE = "rsconfig.json";

async function resolvePath(ws: string, queryName: string, ext = ".sql") {
  return j(await getSrcPath(), ws, `${queryName}${ext}`);
}

async function resolveQueryName(p: string) {
  const srcPath = await getSrcPath();
  const relative = path.relative(srcPath, p);
  const { name, dir } = path.parse(relative);
  return { name, ws: dir.replace(path.sep, ".") };
}

async function createClient() {
  const rootDir = await resolveRoot();
  const secretPath = path.join(rootDir, SECRETS_FILE);
  const secretsString = (await fs.readFile(secretPath)).toString();
  const secrets = JSON.parse(secretsString);
  const { apikey, apiserver } = secrets[0];
  const rockset = rocksetConfigure(apikey, apiserver);
  return rockset;
}

async function getSrcPath() {
  const srcPath = await resolveRoot();
  const configStr = (
    await fs.readFile(path.join(srcPath, CONFIG_FILE))
  ).toString();
  const config = JSON.parse(configStr);
  return path.join(srcPath, config.root);
}

async function resolveRoot(startingPath?: string): Promise<string> {
  if (startingPath === "/") {
    throw new Error("Not in a valid rockset project");
  }
  const dir = startingPath ?? process.cwd();
  const p = j(dir, CONFIG_FILE);
  try {
    await fs.access(p);
    return dir;
  } catch {
    return resolveRoot(path.dirname(dir));
  }
}

async function readSql(ws: string, queryName: string) {
  const path = await resolvePath(ws, queryName);
  return (await fs.readFile(path)).toString();
}

function parseQueryName(query: string) {
  const pieces = query.split(".");
  const lambda = pieces.pop() as string;
  return { ws: pieces.join("."), lambda };
}

async function getFiles(dir: string): Promise<string[]> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : [res];
    })
  );
  return Array.prototype.concat(...files);
}

async function list() {
  const src = await getSrcPath();
  const allFiles = await getFiles(src);
  const sqlFiles = allFiles.filter((file) => file.endsWith(".sql"));

  const lambdas = await Promise.all(
    sqlFiles.map((path) => resolveQueryName(path))
  );
  const lambdaNames = lambdas.map(({ ws, name }) => `${ws}.${name}`);
  console.log(lambdaNames.join("\n"));
}

async function edit(qlFullName: string) {
  const pieces = process.argv[3].split(".");
  const lambda = pieces.pop() as string;
  const p = await resolvePath(pieces.join("."), lambda);
  const editor = process.env.VISUAL ?? process.env.EDITOR ?? "vim";
  require("child_process").spawn(editor, [p], {
    stdio: "inherit",
  });
}

async function config(qlFullName: string) {
  const pieces = process.argv[3].split(".");
  const lambda = pieces.pop() as string;
  const p = await resolvePath(pieces.join("."), lambda, ".json");

  const editor = process.env.VISUAL ?? process.env.EDITOR ?? "vim";
  require("child_process").spawn(editor, [p], {
    stdio: "inherit",
  });
}

async function deploy() {
  const [src, client] = await Promise.all([getSrcPath(), createClient()]);

  const allFiles = await getFiles(src);
  const sqlFiles = allFiles.filter((file) => file.endsWith(".sql"));
  const configFiles = allFiles.filter((file) => file.endsWith(".json"));

  const lambdas = await client.queryLambdas.listAllQueryLambdas();
  sqlFiles.forEach(async (path) => {
    const { ws, name: lambda } = await resolveQueryName(path);
    const text = (await fs.readFile(path)).toString();

    const lambdaObj = lambdas.data?.find(
      ({ workspace, name }) => workspace === ws && name === lambda
    );

    const qlFullName = `"${ws}.${lambda}"`;

    if (lambdaObj?.sql?.query === text) {
      console.log(`No change to query lambda ${qlFullName}!`);
    } else {
      console.log(`Creating new query lambda version for ${qlFullName}!`);

      try {
        await client.queryLambdas.updateQueryLambda(ws, lambda, {
          sql: {
            query: text,
          },
        });

        console.log("Successfully updated lambda!");
      } catch (e) {
        console.log(e);
      }
    }
  });
}

const pp = (str: object) => JSON.stringify(str, null, 2);
const j = path.join.bind(path);
