import rocksetConfigure from '@rockset/client';
import {
  AuthProfile,
  DeployHooks,
  LambdaEntity,
  CollectionEntity,
  DownloadHooks,
  LambdaDownloadOptions,
} from './types';
import {
  FetchAPI,
  Collection,
  QueryLambdaVersion,
} from '@rockset/client/dist/codegen/api';
import {
  getFiles,
  isDefinitionPath,
  resolveQualifiedNameFromPath,
  getQualifiedName,
  relativeSQLPath,
} from './filesystem/pathutil';
import {
  getSrcPath,
  readLambda,
  writeLambda,
  writeCollection,
} from './filesystem/fileutil';
import _ from 'lodash';

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

export async function listEntityNames() {
  const src = await getSrcPath();
  const allFiles = await getFiles(src);
  const lambdaFiles = allFiles.filter((file) =>
    isDefinitionPath(src, file, 'lambda')
  );

  const collectionFiles = allFiles.filter((file) =>
    isDefinitionPath(src, file, 'lambda')
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

const constructLambdaEntity = (
  networkLambda: QueryLambdaVersion
): LambdaEntity | null => {
  const ws = networkLambda.workspace;
  const name = networkLambda.name;

  // if workspace and name aren't defined, this query lambda object is broken
  if (!ws || !name) {
    return null;
  }

  const fullName = getQualifiedName(ws, name);
  const sql = networkLambda.sql?.query ?? '';
  const default_parameters = networkLambda.sql?.default_parameters ?? [];
  return {
    type: 'lambda',
    name,
    ws,
    fullName,
    sql,
    config: {
      sql_path: relativeSQLPath(name),
      default_parameters,
    },
  };
};

export const constructCollectionEntity = (networkCollection: Collection) => {
  const ws = networkCollection.workspace;
  const name = networkCollection.name;

  // if workspace and name aren't defined, this query lambda object is broken
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

export async function downloadQueryLambdas(
  hooks: DownloadHooks = {},
  options: LambdaDownloadOptions
) {
  const client = await createClient();

  let lambdas: QueryLambdaVersion[] = [];
  // Grab entities from apiserver
  if (options.useLambdaTag) {
    const lambdaReponse = await client.queryLambdas.listQueryLambdaTagVersions(
      options.useLambdaTag
    );
    lambdas = lambdaReponse?.data ?? [];
  } else {
    // Use latest versions
    // TODO (Scott) — update this once code to fetch latest versions is up in API
  }
  lambdas.forEach(async (lambda: QueryLambdaVersion) => {
    const qlEntity = constructLambdaEntity(lambda);
    if (qlEntity) {
      await writeLambda(qlEntity);
      hooks.onWriteLambda?.(qlEntity);
    }
  });
}

/**
 * This function deploys your local repository to Rockset
 * @param hooks Lifecycle hooks that will be called at appropriate intervals
 */
export async function deploy(hooks: DeployHooks = {}) {
  const [srcPath /*, client*/] = await Promise.all([
    getSrcPath(),
    /* createClient(),*/
  ]);

  // Grab all files
  const allFiles = await getFiles(srcPath);
  const lambdaFiles = allFiles.filter((file) =>
    isDefinitionPath(srcPath, file, 'lambda')
  );

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

  // Grab lambdas from apiserver
  // const lambdas = await client.queryLambdas.listAllQueryLambdas();

  return lambdaEntities.map(async (lambdaEntity) => {
    // const { ws, name: lambda, sql: text } = lambdaEntity;

    // const lambdaObj = lambdas.data?.find(
    //   ({ workspace, name }) => workspace === ws && name === lambda
    // );

    // TODO (Scott) — update this with new version logic and tags
    // if (lambdaObj?.sql?.query === text) {
    hooks?.onNoChange?.(lambdaEntity);
    // } else if (!lambdaObj) {
    //   hooks.onDeployStart?.(lambdaEntity);
    //   try {
    //     await client.queryLambdas.createQueryLambda(ws, {
    //       name: lambda,
    //       sql: {
    //         query: text,
    //         default_parameters: lambdaEntity.config.default_parameters,
    //       },
    //     });
    //     hooks.onDeploySuccess?.(lambdaEntity);
    //   } catch (e) {
    //     hooks.onDeployError?.(e, lambdaEntity);
    //   }
    // } else {
    //   hooks.onDeployStart?.(lambdaEntity);
    //   try {
    //     await client.queryLambdas.updateQueryLambda(ws, lambda, {
    //       sql: {
    //         query: text,
    //         default_parameters: lambdaEntity.config.default_parameters,
    //       },
    //     });

    //     hooks.onDeploySuccess?.(lambdaEntity);
    //   } catch (e) {
    //     hooks.onDeployError?.(e, lambdaEntity);
    //   }
    // }
  });
}
