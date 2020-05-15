import {
  readConfigFromPath,
  resolveRootFile,
  resolveRootDirectory,
  resolvePathFromQualifiedName,
  readSqlFromPath,
  getWsNamePair,
  isParent,
} from './pathutil';

import * as path from 'path';
import {
  RootConfig,
  QualifiedName,
  LambdaConfig,
  LambdaEntity,
  CollectionEntity,
  ROOT_CONFIG,
} from '../types';

// This is the only package that is allowed to access the file system
// This ensures that we are able to typecheck and unit test all file system input
// eslint-disable-next-line no-restricted-imports
import { promises as fs } from 'fs';
import { prettyPrint } from '../helper';
import { errorFailToWriteFileOutsideProject } from '../exception';

/**
 *
 * Get the root config for a project
 * @param path The path to search in. If no path is provided, will attempt to resolve the root path
 */
export async function readRootConfig(): Promise<RootConfig> {
  return readConfigFromPath(await resolveRootFile());
}

export async function writeRootConfig(config: RootConfig) {
  fs.writeFile(ROOT_CONFIG, prettyPrint(config));
}

/**
 * Resolve the current source path
 */
export async function getSrcPath() {
  const root = await resolveRootDirectory();
  const config = await readRootConfig();
  return path.join(root, config.source_root);
}

export async function readLambdaFromQualifiedName(name: QualifiedName) {
  const srcPath = await getSrcPath();
  const fullPath = path.join(
    srcPath,
    resolvePathFromQualifiedName(name, 'lambda')
  );
  return readLambda(name, fullPath);
}

export async function readLambda(fullName: QualifiedName, fullPath: string) {
  const config = (await readConfigFromPath(fullPath)) as LambdaConfig;
  const sqlPath = path.join(path.dirname(fullPath), config.sql_path);
  const sql = await readSqlFromPath(sqlPath);
  const { name, ws } = getWsNamePair(fullName);

  return {
    fullName,
    ws,
    name,
    type: 'lambda' as const,
    config,
    sql,
  } as LambdaEntity;
}

export async function writeLambda(entity: LambdaEntity) {
  const srcPath = await getSrcPath();
  const fullPath = path.join(
    srcPath,
    resolvePathFromQualifiedName(entity.fullName, 'lambda')
  );
  const lambdaDirectory = path.dirname(fullPath);

  const sqlFileName = path.join(lambdaDirectory, entity.config.sql_path);
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
  const fullPath = path.join(
    srcPath,
    resolvePathFromQualifiedName(entity.fullName, 'collection')
  );

  writeFileSafe(srcPath, fullPath, prettyPrint(entity.config));
}

export async function writeFileSafe(
  srcPath: string,
  fullPath: string,
  data: string | Uint8Array
) {
  if (!isParent(srcPath, fullPath)) {
    throw errorFailToWriteFileOutsideProject();
  }

  await fs.mkdir(path.dirname(fullPath), { recursive: true });
  await fs.writeFile(fullPath, data);
}
