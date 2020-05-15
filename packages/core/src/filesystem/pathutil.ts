import { errorNotValidProject } from '../exception';
import {
  ROOT_CONFIG,
  QualifiedName,
  SqlString,
  EntityType,
  ENTITIES,
} from '../types';

// This is the only package that is allowed to access the file system
// This ensures that we are able to typecheck and unit test all file system input
// eslint-disable-next-line no-restricted-imports
import { promises as fs } from 'fs';
import path from 'path';
import { tuple } from '../helper';

/**
 * Resolve the root directory of this project. The root directory is the nearest ancestor containing
 * the ROOT_CONFIG file.
 *
 * @param startingPath The starting path to look in. Defaults to current working directory
 */
export async function resolveRootDirectory(
  startingPath?: string
): Promise<string> {
  const dir = startingPath ?? process.cwd();
  const { root } = path.parse(dir);

  if (dir === root || !path.isAbsolute(dir)) {
    throw errorNotValidProject();
  }

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

// *** Translating qualified names into paths and vice versa **

/**
 * Returns the relative path to the entity file that defines the entity passed in.
 *
 * @param entityName
 */
export function resolvePathFromQualifiedName(
  entityName: QualifiedName,
  type: EntityType | 'workspace',
  srcPath = ''
) {
  const entity = entityName.replace('.', path.sep);
  const filenameExt = type === 'workspace' ? '' : getEntityExt(type);
  return path.join(srcPath, entity + filenameExt);
}

export function resolveQualifiedNameFromPath(
  srcPath: string,
  absolutePath: string
): [QualifiedName, EntityType] | null {
  // Src path must be a parent of this path
  if (!isParent(srcPath, absolutePath)) {
    return null;
  }
  const relative = path.relative(srcPath, absolutePath);

  const { dir, base } = path.parse(relative);
  const ws = dir.replace(path.sep, '.');
  const entityName = ENTITIES.find((entity) => {
    base.endsWith(getEntityExt(entity));
  });

  if (!entityName) {
    return null;
  }
  const name = base.replace(new RegExp(getEntityExt(entityName) + '$'), '');
  return tuple(getQualifiedName(ws, name), entityName);
}

export function isDefinitionPath(
  srcPath: string,
  url: string,
  entityType: EntityType
) {
  const [, entity] = resolveQualifiedNameFromPath(srcPath, url) ?? [null, null];
  return entity === entityType;
}

export function getEntityExt(entityType: EntityType) {
  return `.${entityType}.json`;
}

/*** Translating qualified names into ws/name pairs and vice versa ***/
export function getWsNamePair(fullName: QualifiedName) {
  const pieces = fullName.split('.');
  const name = pieces.pop();
  const ws = pieces.join('.');
  return { name, ws };
}

export function getQualifiedName(ws: string, name: string) {
  return [ws, name].join('.');
}

/*** Helpers */

export function isParent(parent: string, child: string) {
  const relative = path.relative(parent, child);
  return relative && !relative.startsWith('..') && !path.isAbsolute(relative);
}

export function relativeSQLPath(name: string) {
  return path.join('./__sql', name + '.sql');
}
