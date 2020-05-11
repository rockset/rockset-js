import { errorNotValidProject } from "./exception";
import { ROOT_CONFIG, QualifiedName, SqlString, EntityType } from "./types";

import { promises as fs } from "fs";
import path from "path";

/**
 * Resolve the root directory of this project. The root directory is the nearest ancestor containing
 * the ROOT_CONFIG file.
 *
 * @param startingPath The starting path to look in. Defaults to current working directory
 */
export async function resolveRootDirectory(
  startingPath?: string
): Promise<string> {
  if (startingPath === "/") {
    throw errorNotValidProject();
  }
  const dir = startingPath ?? process.cwd();
  const p = path.join(dir, ROOT_CONFIG);
  try {
    await fs.access(p);
    return dir;
  } catch {
    return resolveRootDirectory(path.dirname(dir));
  }
}

export async function resolveRootFile(rootDirectory?: string) {
  const rootDir = rootDirectory ?? (await resolveRootDirectory());
  return path.join(rootDir, ROOT_CONFIG);
}

export async function readConfigFromPath(absolutePath: string) {
  const configStr = (await fs.readFile(absolutePath)).toString();

  // TODO(tchordia): support YAML in the future?
  return JSON.parse(configStr);
}

/**
 * Returns the path to the entity file that defines the entity passed in.
 *
 * @param entityName
 */
export function resolvePathFromQualifiedName(
  entityName: QualifiedName,
  type: EntityType
) {
  const entityDir = entityName.replace(".", path.sep);
  const filename = type + ".json";
  return path.join(entityDir, filename);
}

export function resolveQualifiedNameFromPath(
  srcPath: string,
  absolutePath: string
): QualifiedName {
  const relative = path.relative(srcPath, absolutePath);
  const { dir } = path.parse(relative);
  return dir.replace(path.sep, ".");
}

export async function readSqlFromPath(
  absolutePath: string
): Promise<SqlString> {
  const sqlStr = (await fs.readFile(absolutePath)).toString();
  return sqlStr;
}

/**
 * Read all files from a directory
 */
export async function getFiles(dir: string): Promise<string[]> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : [res];
    })
  );
  return Array.prototype.concat(...files);
}

export function isDefinitionPath(url: string, entityType: EntityType) {
  return path.basename(url) === getEntityFileName(entityType);
}

export function getEntityFileName(entityType: EntityType) {
  return entityType + ".json";
}

export function getWsNamePair(fullName: QualifiedName) {
  const pieces = fullName.split(".");
  const name = pieces.pop();
  const ws = pieces.join(".");
  return { name, ws };
}
