import rocksetConfigure from '@rockset/client';
import path from 'path';
import {
  AuthProfile,
  RootConfig,
  QualifiedName,
  LambdaConfig,
  DeployHooks,
  LambdaEntity,
} from './types';
import { FetchAPI } from '@rockset/client/dist/codegen/api';
import {
  readConfigFromPath,
  resolveRootFile,
  resolveRootDirectory,
  resolvePathFromQualifiedName,
  readSqlFromPath,
  getFiles,
  isDefinitionPath,
  resolveQualifiedNameFromPath,
  getWsNamePair,
} from './pathutil';

/**
 *
 * Get the root config for a project
 * @param path The path to search in. If no path is provided, will attempt to resolve the root path
 */
async function readRootConfig(): Promise<RootConfig> {
  return readConfigFromPath(await resolveRootFile());
}

/**
 * Resolve the current source path
 */
async function getSrcPath() {
  const root = await resolveRootDirectory();
  const config = await readRootConfig();
  return path.join(root, config.source_root);
}

/**
 * Resolve the current auth profile.
 *
 * Currently just loads from environment, in the future we can do more sophisticated profile management
 */
async function getAuthProfile() {
  const apikey = process.env.ROCKSET_APIKEY ?? '';
  const apiserver = process.env.ROCKSET_APISERVER ?? '';
  return { apikey, apiserver } as AuthProfile;
}

/**
 *
 * @param customFetch custom fetch agent to pass into the client
 */
export async function createClient(customFetch?: FetchAPI) {
  const { apikey, apiserver } = await getAuthProfile();
  return rocksetConfigure(apikey, apiserver, customFetch);
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

export async function listEntityNames() {
  const src = await getSrcPath();
  const allFiles = await getFiles(src);
  const lambdaFiles = allFiles.filter((file) =>
    isDefinitionPath(file, 'lambda')
  );

  const collectionFiles = allFiles.filter((file) =>
    isDefinitionPath(file, 'lambda')
  );

  const lambdas = lambdaFiles.map((path) =>
    resolveQualifiedNameFromPath(src, path)
  );

  const collections = collectionFiles.map((path) =>
    resolveQualifiedNameFromPath(src, path)
  );

  return {
    lambdas,
    collections,
  };
}

export async function deploy(hooks: DeployHooks) {
  const [srcPath, client] = await Promise.all([getSrcPath(), createClient()]);

  // Grab all files
  const allFiles = await getFiles(srcPath);
  const lambdaFiles = allFiles.filter((file) =>
    isDefinitionPath(file, 'lambda')
  );

  // Construct lambda entities
  const lambdaEntities = await Promise.all(
    lambdaFiles.map((file) =>
      readLambda(resolveQualifiedNameFromPath(srcPath, file), file)
    )
  );

  // Grab lambdas from apiserver
  const lambdas = await client.queryLambdas.listAllQueryLambdas();

  return lambdaEntities.map(async (lambdaEntity) => {
    const { ws, name: lambda, sql: text } = lambdaEntity;

    const lambdaObj = lambdas.data?.find(
      ({ workspace, name }) => workspace === ws && name === lambda
    );

    if (lambdaObj?.sql?.query === text) {
      hooks.onNoChange(lambdaEntity);
    } else if (!lambdaObj) {
      hooks.onDeployStart(lambdaEntity);
      try {
        await client.queryLambdas.createQueryLambda(ws, {
          name: lambda,
          sql: {
            query: text,
            default_parameters: lambdaEntity.config.default_parameters,
          },
        });
        hooks.onDeploySuccess(lambdaEntity);
      } catch (e) {
        hooks.onDeployError(e, lambdaEntity);
      }
    } else {
      hooks.onDeployStart(lambdaEntity);
      try {
        await client.queryLambdas.updateQueryLambda(ws, lambda, {
          sql: {
            query: text,
            default_parameters: lambdaEntity.config.default_parameters,
          },
        });

        hooks.onDeploySuccess(lambdaEntity);
      } catch (e) {
        hooks.onDeployError(e, lambdaEntity);
      }
    }
  });
}
