import {
  ErrorModel,
  Collection,
  QueryLambdaVersionResponse,
  QueryResponse,
} from '@rockset/client/dist/codegen/api';
import { type, TypeOf, string, array } from 'io-ts';
import * as t from 'io-ts';
import * as path from 'path';
import {
  RockClientException,
  errorInvalidAbsolutePath,
  errorInvalidQualifiedName,
  errorFailedToCreateEntity,
  errorGenericParse,
  RockClientErrorTypes,
} from './exception/exception';
import { Either, fold, chain } from 'fp-ts/lib/Either';
import { PathReporter } from 'io-ts/lib/PathReporter';
import { getWsNamePair, relativeSQLPath } from './filesystem/pathutil';
import { pipe } from 'fp-ts/lib/pipeable';

export const ROOT_CONFIG = 'rockset.config.json' as const;

const AuthProfile = type({
  apikey: string,
  apiserver: string,
});

/**
 * Many of the types from here on out are defined as RuntimeTypes with io-ts.
 * eg. `t.string` is a runtime string type defined using io-ts.
 * Please view the io-ts documentation for more details.
 *
 * Runtime types defined by io-ts are values that can be used in js.
 * Every time you define a runtime type, you should also define a TS type with the same name
 * eg. const ABC = ...
 * type ABC = TypeOf<typeof ABC>
 */

/**
 * Brands here. Brands are a way of testing a particular type of string.
 * Eg. `QualifiedName` is a string subtype that refers to an entity name, eg `commons.foo`
 *
 */

export type JSONObject = { [key: string]: JSON };
export type JSONArray = Array<JSON>;
export type JSONType =
  | null
  | string
  | number
  | boolean
  | JSONArray
  | JSONObject;

/**
 * Json type is a way of validating a JSON object in io-ts. This is copy pasted from io-ts documentation.
 */
const JSONType = new t.Type<JSONType, string, string>(
  'JSONType',
  (s: unknown): s is JSONType => {
    try {
      JSON.stringify(s);
      return true;
    } catch (e) {
      return false;
    }
  },
  (s: string, c) => {
    try {
      return t.success(JSON.parse(s) as JSONType);
    } catch (e) {
      return t.failure(s, c);
    }
  },
  JSON.stringify
);

export interface LambdaQualifiedNameBrand {
  readonly LambdaQualifiedName: unique symbol;
}
export type LambdaQualifiedName = t.Branded<string, LambdaQualifiedNameBrand>;
export const LambdaQualifiedName: t.Type<
  LambdaQualifiedName,
  string,
  unknown
> = t.brand(
  t.string,
  (s): s is LambdaQualifiedName => {
    // Must be a string
    if (typeof s === 'string') {
      const pieces = s.split('.');
      return (
        pieces.length > 1 &&
        pieces.every((piece) => piece.match(/^[a-zA-Z0-9][\w-]*$/))
      );
    }
    return false;
  },
  'LambdaQualifiedName'
);

export interface WorkspaceQualifiedNameBrand {
  readonly WorkspaceQualifiedName: unique symbol;
}
export type WorkspaceQualifiedName = t.Branded<
  string,
  WorkspaceQualifiedNameBrand
>;
export const WorkspaceQualifiedName: t.Type<
  WorkspaceQualifiedName,
  string,
  unknown
> = t.brand(
  t.string,
  (s): s is WorkspaceQualifiedName => {
    // Must be a string
    if (typeof s === 'string') {
      const pieces = s.split('.');
      return pieces.every((piece) => piece.match(/^[a-zA-Z0-9][\w-]*$/));
    }
    return false;
  },
  'WorkspaceQualifiedName'
);

export interface AbsolutePathBrand {
  readonly AbsolutePath: unique symbol;
}
export type AbsolutePath = t.Branded<string, AbsolutePathBrand>;
export const AbsolutePath: t.Type<AbsolutePath, string, unknown> = t.brand(
  t.string,
  (s): s is AbsolutePath => {
    return path.isAbsolute(s);
  },
  'AbsolutePath'
);

export type AuthProfile = TypeOf<typeof AuthProfile>;

// *** Config files ***
export const RootConfig = type({
  source_root: string,
});

export type RootConfig = TypeOf<typeof RootConfig>;

export const QueryParameter = type({
  name: string,
  value: string,
  type: string,
});

export const QueryParameterArray = array(QueryParameter);
export type QueryParameterArray = TypeOf<typeof QueryParameterArray>;

export type QueryParameter = TypeOf<typeof QueryParameter>;

const LambdaConfigRequired = t.interface({
  sql_path: string,
});

const LambdaConfigOptional = t.partial({
  default_parameters: array(QueryParameter),
  // Optional type
  description: string,
});

export const LambdaConfig = t.intersection([
  LambdaConfigRequired,
  LambdaConfigOptional,
]);

export type LambdaConfig = TypeOf<typeof LambdaConfig>;

type CollectionConfig = Omit<Collection, 'name' | 'stats' | 'workspace'>;

export const ENTITIES = ['lambda', 'collection'] as const;

export type EntityType = typeof ENTITIES[number];

export const LambdaEntity = type({
  fullName: LambdaQualifiedName,
  ws: string,
  name: string,
  type: t.literal('lambda'),
  config: LambdaConfig,
  sql: string,
});

export type LambdaEntity = TypeOf<typeof LambdaEntity>;

export interface CollectionEntity {
  fullName: LambdaQualifiedName;
  ws: string;
  name: string;
  type: 'collection';
  config: CollectionConfig;
}
export interface DeployHooks {
  onNoChange?: (e: LambdaEntity) => void;
  onDeployStart?: (e: LambdaEntity) => void;
  onCreateWorkspace?: (name: string) => void;
  onSkipQueryLambda?: (name: string) => void;
  onDeployVersionSuccess?: (e: QueryLambdaVersionResponse) => void;
  onDeployTagSuccess?: (e: QueryLambdaVersionResponse) => void;
  onDeployError?: (error: ErrorModel, entity: LambdaEntity) => void;
}

export interface DownloadHooks {
  onNoOp?: () => void;
  onWriteLambda?: (e: LambdaEntity) => void;
  onWriteCollection?: (e: CollectionEntity) => void;
}

export interface ExecuteHooks {
  onBeforeExecute?: (sql: string, parameters: unknown[]) => void;
  onExecuteSuccess?: (e: QueryResponse) => void;
  onExecuteError?: (error: ErrorModel, entity: LambdaEntity) => void;
}

export interface LambdaDownloadOptions {
  useLambdaTag?: string;
}

export interface LambdaDeleteOptions {
  workspace?: string;
  lambda?: string;
}

export interface LambdaDeployOptions {
  tag?: string;
  workspace?: string;
  lambda?: string;
  createMissingWorkspace?: boolean;
  dryRun?: boolean;
}

// *** Helper functions to parse stuff ***

export function throwOnError<B>(
  e: Either<t.Errors, B>,
  onError: (message: string) => RockClientException
): B {
  return fold<t.Errors, B, B>(
    () => {
      const message = PathReporter.report(e).join('\n');
      throw onError(message);
    },
    (a) => a
  )(e);
}

export function parseOrThrow<A>(
  type: t.Type<A>,
  value: unknown,
  errorType: RockClientErrorTypes,
  description: string
) {
  return throwOnError(
    type.decode(value),
    errorGenericParse(errorType, description, value)
  );
}

export function parseOrThrowFromJSON<A>(
  type: t.Type<A>,
  value: string,
  errorType: RockClientErrorTypes,
  description: string
) {
  const a = pipe(value, JSONType.decode, chain(type.decode));
  return throwOnError(a, errorGenericParse(errorType, description, value));
}

export function parseAbsolutePath(p: string): AbsolutePath {
  return throwOnError(AbsolutePath.decode(p), errorInvalidAbsolutePath);
}

export function parseLambdaQualifiedName(p: string): LambdaQualifiedName {
  return throwOnError(LambdaQualifiedName.decode(p), errorInvalidQualifiedName);
}
export function parseWorkspaceQualifiedName(p: string): WorkspaceQualifiedName {
  return throwOnError(
    WorkspaceQualifiedName.decode(p),
    errorInvalidQualifiedName
  );
}

export function parseLambdaEntity(obj: unknown): LambdaEntity {
  return throwOnError(LambdaEntity.decode(obj), errorFailedToCreateEntity(obj));
}

export function parseQueryParameterArray(p: string) {
  return parseOrThrowFromJSON(
    QueryParameterArray,
    p,
    RockClientErrorTypes.ERROR_MALFORMED_PARAMETERS,
    `The parameters string ${p} is malformed. Please check that it is a valid JSON string, containing an array of Query Parameters, which each have keys 'name', 'type', and 'value'`
  );
}

export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}

// Helper function to create default values for types
export function createEmptyQLEntity(
  fullName: LambdaQualifiedName,
  description = ''
) {
  const { ws, name } = getWsNamePair(fullName);
  return parseLambdaEntity({
    ws,
    name,
    fullName,
    type: 'lambda',
    config: {
      sql_path: relativeSQLPath(name),
      default_parameters: [],
      description,
    },
    sql: `-- Your SQL here
`,
  });
}
