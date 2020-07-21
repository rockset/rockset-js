import {
  readConfigFromPath,
  resolveRootFile,
  resolveRootDirectory,
  resolvePathFromQualifiedName,
  readSqlFromPath,
  getWsNamePair,
  isParent,
  join,
  dirname,
} from './pathutil';

import * as path from 'path';
import {
  RootConfig,
  LambdaQualifiedName,
  LambdaEntity,
  CollectionEntity,
  AbsolutePath,
  LambdaConfig,
  throwOnError,
  ROOT_CONFIG,
} from '../types';

// This is the only package that is allowed to access the file system
// This ensures that we are able to typecheck and unit test all file system input
// eslint-disable-next-line no-restricted-imports
import { promises as fs, constants as fsconstants } from 'fs';

import { prettyPrint } from '../helper';
import {
  errorFailToWriteFileOutsideProject,
  errorInvalidRootConfig,
  errorFailedToParseLambdaConfig,
  errorFailedToCreateEntity,
  errorFailToDeleteFileOutsideProject,
} from '../exception/exception';

/**
 *
 * Get the root config for a project
 * @param path The path to search in. If no path is provided, will attempt to resolve the root path
 */
export async function readRootConfig() {
  const rawConfig = await readConfigFromPath(await resolveRootFile());
  return throwOnError(RootConfig.decode(rawConfig), errorInvalidRootConfig);
}

export async function writeRootConfig(config: RootConfig) {
  const decode = RootConfig.decode(config);
  const conf = throwOnError(decode, errorInvalidRootConfig);

  // Write to the cwd
  const fileName = path.join(process.cwd(), ROOT_CONFIG);
  return await fs.writeFile(fileName, prettyPrint(conf));
}

/**
 * Resolve the current source path
 */
export async function getSrcPath(): Promise<AbsolutePath> {
  const root = await resolveRootDirectory();
  const config = await readRootConfig();
  const finalPath = join(root, config.source_root);
  return finalPath;
}

export async function deleteLambda(
  srcPath: AbsolutePath,
  entityPath: AbsolutePath,
  entity: LambdaEntity
) {
  const sqlPath = join(dirname(entityPath), entity.config.sql_path);
  return await Promise.all([
    deleteFileSafe(srcPath, entityPath),
    deleteFileSafe(srcPath, sqlPath),
  ]);
}

export async function readLambdaFromQualifiedName(name: LambdaQualifiedName) {
  const srcPath = await getSrcPath();
  const fullPath = join(srcPath, resolvePathFromQualifiedName(name, 'lambda'));
  return readLambda(name, fullPath);
}

export async function readLambda(
  fullName: LambdaQualifiedName,
  fullPath: AbsolutePath
) {
  const rawConfig = await readConfigFromPath(fullPath);
  const config = throwOnError(
    LambdaConfig.decode(rawConfig),
    errorFailedToParseLambdaConfig(fullName, fullPath)
  );

  const sqlPath = join(dirname(fullPath), config.sql_path);
  const sql = await readSqlFromPath(sqlPath);
  const { name, ws } = getWsNamePair(fullName);

  const rawEntity = {
    fullName,
    ws,
    name,
    type: 'lambda' as const,
    config,
    sql,
  };
  return throwOnError(
    LambdaEntity.decode(rawEntity),
    errorFailedToCreateEntity(rawEntity)
  );
}

export async function getLambdaSqlPathFromQualifiedName(
  name: LambdaQualifiedName
) {
  const srcPath = await getSrcPath();
  const fullPath = join(srcPath, resolvePathFromQualifiedName(name, 'lambda'));
  const entity = await readLambda(name, fullPath);
  return join(dirname(fullPath), entity.config.sql_path);
}

export async function writeLambda(entity: LambdaEntity) {
  const srcPath = await getSrcPath();
  const fullPath = join(
    srcPath,
    resolvePathFromQualifiedName(entity.fullName, 'lambda')
  );
  const lambdaDirectory = dirname(fullPath);

  const sqlFileName = join(lambdaDirectory, entity.config.sql_path);
  // Make sure the directory exists

  const configFile = writeFileSafe(
    srcPath,
    fullPath,
    prettyPrint(entity.config)
  );
  const sqlFile = writeFileSafe(srcPath, sqlFileName, entity.sql);

  // Return the paired promise
  return Promise.all([configFile, sqlFile]);
}

export async function writeCollection(entity: CollectionEntity) {
  const srcPath = await getSrcPath();
  const fullPath = join(
    srcPath,
    resolvePathFromQualifiedName(entity.fullName, 'collection')
  );

  return writeFileSafe(srcPath, fullPath, prettyPrint(entity.config));
}

export async function writeFileSafe(
  srcPath: AbsolutePath,
  fullPath: AbsolutePath,
  data: string | Uint8Array
) {
  if (!isParent(srcPath, fullPath)) {
    throw errorFailToWriteFileOutsideProject();
  }

  await fs.mkdir(path.dirname(fullPath), { recursive: true });
  await fs.writeFile(fullPath, data);
}

export async function deleteFileSafe(
  srcPath: AbsolutePath,
  fullPath: AbsolutePath
) {
  if (!isParent(srcPath, fullPath)) {
    throw errorFailToDeleteFileOutsideProject();
  }

  try {
    return await fs.unlink(fullPath);
  } catch (e) {
    // Probably failed because the file doesn't exist or we don't have permissions.
    // Return null and let the parent determine what to do in this case
    return null;
  }
}

/**
 * return true is a path exists
 * @param fullPath the path to check
 */
export async function exists(fullPath: string) {
  try {
    await fs.access(fullPath, fsconstants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}
