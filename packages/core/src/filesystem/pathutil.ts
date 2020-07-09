import {
  errorNotValidProject,
  errorInvalidQualifiedName,
} from '../exception/exception';
import {
  ROOT_CONFIG,
  QualifiedName,
  EntityType,
  ENTITIES,
  AbsolutePath,
  throwOnError,
  parseAbsolutePath,
  LambdaEntity,
} from '../types';
import YAML from 'yaml';

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
  startingPath?: AbsolutePath
): Promise<AbsolutePath> {
  // should always be an absolute path
  const dir = startingPath ?? process.cwd();
  const { root } = path.parse(dir);

  if (dir === root) {
    throw errorNotValidProject();
  }

  const p = path.join(dir, ROOT_CONFIG);
  try {
    await fs.access(p);
    return parseAbsolutePath(dir);
  } catch (e) {
    // dirname of an absolute path is an absolute path
    return resolveRootDirectory(path.dirname(dir) as AbsolutePath);
  }
}

export async function resolveRootFile(rootDirectory?: AbsolutePath) {
  const rootDir = rootDirectory ?? (await resolveRootDirectory());
  return join(rootDir, ROOT_CONFIG);
}

export async function readConfigFromPath(
  absolutePath: AbsolutePath,
  format: 'JSON' | 'YAML' = 'JSON'
) {
  const configStr = (await fs.readFile(absolutePath)).toString();

  // TODO(tchordia): support YAML in the future?
  if (format === 'JSON') {
    return JSON.parse(configStr) as unknown;
  } else {
    return YAML.parse(configStr) as unknown;
  }
}

export async function readSqlFromPath(
  absolutePath: AbsolutePath
): Promise<string> {
  const sqlStr = (await fs.readFile(absolutePath)).toString();
  return sqlStr;
}

/**
 * Read all files from a directory
 */
export async function getFiles(dir: string): Promise<AbsolutePath[]> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      // Path.resolve always returns an absolute path
      const res = path.resolve(dir, dirent.name) as AbsolutePath;
      return dirent.isDirectory() ? getFiles(res) : [res];
    })
  );
  return Array.prototype.concat(...files) as AbsolutePath[];
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
  const entity = entityName.replace(/\./g, path.sep);
  const filenameExt = type === 'workspace' ? '' : getEntityExt(type);
  return path.join(srcPath, entity + filenameExt);
}

export function resolveQualifiedNameFromPath(
  srcPath: AbsolutePath,
  absolutePath: AbsolutePath
): [QualifiedName, EntityType] | null {
  // Src path must be a parent of this path
  if (!isParent(srcPath, absolutePath)) {
    return null;
  }
  const relative = path.relative(srcPath, absolutePath);

  const { dir, base } = path.parse(relative);
  const ws = dir.replace(path.sep, '.');
  const entityName = ENTITIES.find((entity) => {
    return base.endsWith(getEntityExt(entity));
  });

  if (!entityName) {
    return null;
  } else {
    const name = base.replace(new RegExp(getEntityExt(entityName) + '$'), '');
    return tuple(getQualifiedName(ws, name), entityName);
  }
}

export function getLambdaPathsFromEntity(
  srcPath: AbsolutePath,
  entity: LambdaEntity
) {
  const fullPath = join(
    srcPath,
    resolvePathFromQualifiedName(entity.fullName, 'lambda')
  );
  const sqlPath = join(dirname(fullPath), entity.config.sql_path);
  return { sqlPath, fullPath };
}

export function isDefinitionPath(
  srcPath: AbsolutePath,
  url: AbsolutePath,
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
  const name = pieces.pop() as string;
  const ws = pieces.join('.');
  return { name, ws };
}

export function getQualifiedName(ws: string, name: string): QualifiedName {
  const rawName = [ws, name].join('.');
  return throwOnError(QualifiedName.decode(rawName), errorInvalidQualifiedName);
}

/*** Helpers */

export function isParent(parent: AbsolutePath, child: AbsolutePath) {
  const relative = path.relative(parent, child);
  return relative && !relative.startsWith('..');
}

export function relativeSQLPath(name: string) {
  return path.join('./__sql', name + '.sql');
}

export const cwd = () => {
  // process.cwd always returns an absolute path
  return process.cwd() as AbsolutePath;
};

export function join(root: AbsolutePath, ...paths: string[]): AbsolutePath {
  // Joining onto an absolute path yields an absolute path
  return path.join(root, ...paths) as AbsolutePath;
}

export function dirname(root: AbsolutePath): AbsolutePath {
  // dirname of an absolute path is an absolute path
  return path.dirname(root) as AbsolutePath;
}
