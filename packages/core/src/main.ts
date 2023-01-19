import rocksetConfigure from '@rockset/client';
import {
  DeployHooks,
  LambdaEntity,
  CollectionEntity,
  DownloadHooks,
  notEmpty,
  LambdaDeployOptions,
  LambdaQualifiedName,
  ExecuteHooks,
  QueryParameterArray,
  LambdaDeleteOptions,
  parseWorkspaceQualifiedName,
  parseLambdaQualifiedName,
  mergeParameters,
} from './types';
import {
  FetchAPI,
  Collection,
  QueryLambdaVersion,
  QueryLambda,
} from '@rockset/client/dist/codegen/api';
import {
  getFiles,
  isDefinitionPath,
  resolveQualifiedNameFromPath,
  getQualifiedName,
  relativeSQLPath,
  resolvePathFromQualifiedName,
} from './filesystem/pathutil';
import {
  getSrcPath,
  readLambda,
  writeLambda,
  writeCollection,
  deletePathSafe,
  emptySrcDir,
  deleteLambda,
  readLambdaFromQualifiedName,
} from './filesystem/fileutil';
import _ from 'lodash';
import { getAuthProfile } from './filesystem/auth';
import { isCaseInsensitiveFS } from './helper';

/**
 *
 * @param customFetch custom fetch agent to pass into the client
 */
export async function createClient(customFetch?: FetchAPI) {
  const { api_key, api_server } = await getAuthProfile();
  return rocksetConfigure(api_key, api_server, customFetch);
}

export async function listEntityNames() {
  const src = await getSrcPath();
  const allFiles = await getFiles(src);

  const entities = allFiles
    .map((path) => resolveQualifiedNameFromPath(src, path))
    .filter(notEmpty);

  const lambdas = entities.filter(([, t]) => t === 'lambda');
  const collections = entities.filter(([, t]) => t === 'collection');

  return {
    lambdas,
    collections,
  };
}

const constructLambdaEntity = (
  networkLambda: QueryLambdaVersion
): LambdaEntity | null => {
  const ws = networkLambda.workspace;
  const name = networkLambda.name;

  // if workspace and name aren't defined, this Query Lambda object is broken
  if (!ws || !name) {
    return null;
  }

  const fullName = getQualifiedName(ws, name);
  const sql = networkLambda.sql?.query ?? '';
  const description = networkLambda.description ?? '';

  const config = {
    sql_path: relativeSQLPath(name),
    default_parameters: networkLambda.sql?.default_parameters ?? [],
    description,
  };

  return {
    type: 'lambda',
    name,
    ws,
    fullName,
    sql,
    config,
  };
};

export const constructCollectionEntity = (networkCollection: Collection) => {
  const ws = networkCollection.workspace;
  const name = networkCollection.name;

  // if workspace and name aren't defined, this Query Lambda object is broken
  if (!ws || !name) {
    return null;
  }

  const fullName = getQualifiedName(ws, name);

  const entity: CollectionEntity = {
    name,
    fullName,
    ws,
    type: 'collection',
    config: _.omit(networkCollection, 'name', 'stats', 'workspace'),
  };
  return entity;
};

export async function downloadCollections(hooks: DownloadHooks = {}) {
  const client = await createClient();

  // Grab entities from apiserver
  const collections = await client.collections.listCollections();

  // Write collections to file
  collections.data?.forEach(async (collection) => {
    const collectionEntity = constructCollectionEntity(collection);
    if (collectionEntity) {
      await writeCollection(collectionEntity);
      hooks.onWriteCollection?.(collectionEntity);
    }
  });
}

export async function downloadQueryLambdas(hooks: DownloadHooks = {}) {
  const client = await createClient();

  let lambdas: QueryLambdaVersion[] = [];
  // Grab entities from apiserver
  // Use latest versions - all QLs will be pulled
  const lambdaResponse = await client.queryLambdas.listAllQueryLambdas();
  lambdas = (lambdaResponse.data ?? []).map(
    (l: QueryLambda) => l.latest_version as QueryLambdaVersion
  );

  if (lambdas.length === 0) {
    hooks.onNoOp?.();
  }

  const entities = findNonDuplicateEntities(lambdas, hooks);

  entities
    // Filter duplicate keys
    .forEach(async (qlEntity) => {
      if (qlEntity) {
        await writeLambda(qlEntity);
        hooks.onWriteLambda?.(qlEntity);
      }
    });
}

function findNonDuplicateEntities(
  lambdas: QueryLambdaVersion[],
  hooks: DownloadHooks
) {
  const entities = _.compact(lambdas.map(constructLambdaEntity));
  const duplicates = _.chain(entities)
    .groupBy((e) => e?.fullName.toLowerCase())
    .pickBy((x) => x.length > 1)
    .mapValues((all) => _.compact(all?.map((e) => e?.fullName)));

  const duplicateValues = duplicates.values().compact().value() || [];
  const duplicateKeys = duplicates.keys().compact().value() || [];

  if (isCaseInsensitiveFS() && duplicateValues.length > 0) {
    hooks?.onDuplicateLambdas?.(duplicateValues);
    return entities.filter(
      (x) => !duplicateKeys.some((y) => y === x?.fullName.toLowerCase())
    );
  } else {
    return entities;
  }
}

export async function deleteQueryLambdas(options: LambdaDeleteOptions) {
  const srcPath = await getSrcPath();
  if (options.all) {
    return await emptySrcDir();
  } else if (options.workspace) {
    const p = await resolvePathFromQualifiedName(
      parseWorkspaceQualifiedName(options.workspace),
      'workspace',
      srcPath
    );
    return await deletePathSafe(srcPath, p);
  } else if (options.lambda) {
    const qualifiedName = parseLambdaQualifiedName(options.lambda);
    const file = await resolvePathFromQualifiedName(
      qualifiedName,
      'lambda',
      srcPath
    );
    const lambda = await readLambda(qualifiedName, file);

    return await deleteLambda(srcPath, file, lambda);
  }
}

/**
 * This function deploys your local lambdas to Rockset
 * @param hooks Lifecycle hooks that will be called at appropriate intervals
 */
// TODO add tests for this
export async function deployQueryLambdas(
  hooks: DeployHooks = {},
  options: LambdaDeployOptions
) {
  const [srcPath, client] = await Promise.all([getSrcPath(), createClient()]);

  // Grab all files
  const allFiles = await getFiles(srcPath);
  const lambdaFiles = allFiles.filter((file) =>
    isDefinitionPath(srcPath, file, 'lambda')
  );

  const remoteWorkspaces =
    (await client.workspaces.listWorkspaces()).data ?? [];

  const remoteWorkspacesMap = _.keyBy(remoteWorkspaces, (ws) => ws.name);

  // Construct lambda entities
  const lambdaEntities = (await Promise.all(
    lambdaFiles
      .map((file) => {
        const [qualifiedName] = resolveQualifiedNameFromPath(srcPath, file) ?? [
          null,
          null,
        ];
        if (qualifiedName) {
          return readLambda(qualifiedName, file);
        }
        return null;
      })
      .filter((x) => x != null)
  )) as LambdaEntity[];

  return Promise.all(
    lambdaEntities.map(async (lambdaEntity) => {
      const { ws, name: lambda, sql: text, fullName } = lambdaEntity;

      if (
        (!options.workspace && !options.lambda) ||
        (options.workspace && ws.startsWith(options.workspace)) ||
        (options.lambda && options.lambda === fullName)
      ) {
        // We will now deploy this Query Lambda
        hooks.onDeployStart?.(lambdaEntity);

        // If it's a dry run, skip the deploy
        if (options.dryRun) {
          return;
        }
        try {
          if (options.createMissingWorkspace && !remoteWorkspacesMap?.[ws]) {
            await client.workspaces.createWorkspace({
              name: ws,
            });
            hooks.onCreateWorkspace?.(ws);
          }
          const lambdaResponse = await client.queryLambdas.updateQueryLambda(
            ws,
            lambda,
            {
              description: lambdaEntity.config.description,
              sql: {
                query: text,
                default_parameters: lambdaEntity.config.default_parameters,
              },
            },
            /* create if not present */ true
          );
          hooks.onDeployVersionSuccess?.(lambdaResponse);
          if (options.tag && lambdaResponse.data?.version) {
            await client.queryLambdas.createQueryLambdaTag(ws, lambda, {
              tag_name: options.tag,
              version: lambdaResponse.data.version,
            });
            hooks.onDeployTagSuccess?.(lambdaResponse);
          }
        } catch (e) {
          hooks.onDeployError?.(e, lambdaEntity);
        }
      } else {
        hooks.onSkipQueryLambda?.(lambdaEntity.fullName);
      }
    })
  );
}

/**
 * This function executes a specified version of a Query Lambda
 * @param hooks Lifecycle hooks that will be called at appropriate intervals
 */
// TODO add tests for this
export async function executeLocalQueryLambda(
  hooks: ExecuteHooks = {},
  qualifiedName: LambdaQualifiedName,
  parameters: QueryParameterArray
) {
  const [lambdaEntity, client] = await Promise.all([
    readLambdaFromQualifiedName(qualifiedName),
    createClient(),
  ]);

  // Construct lambda entity
  const { config, sql } = lambdaEntity;

  const default_params = config?.default_parameters ?? [];
  const params = mergeParameters(default_params, parameters);
  hooks.onBeforeExecute?.(sql, params);

  try {
    const lambdaResponse = await client.queries.query({
      sql: {
        query: sql,
        parameters: params,
      },
    });
    hooks.onExecuteSuccess?.(lambdaResponse);
  } catch (e) {
    hooks.onExecuteError?.(e, lambdaEntity);
  }
}
