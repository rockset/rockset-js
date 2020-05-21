import { ErrorModel, Collection } from '@rockset/client/dist/codegen/api';
import { type, TypeOf, string, Branded, Type, array } from 'io-ts';
import * as t from 'io-ts';
import * as path from 'path';
import {
  RockClientException,
  errorInvalidAbsolutePath,
  errorInvalidQualifiedName,
} from './exception';
import { Either, fold } from 'fp-ts/lib/Either';
import { PathReporter } from 'io-ts/lib/PathReporter';

export const ROOT_CONFIG = 'rockconfig.json' as const;

const AuthProfile = type({
  apikey: string,
  apiserver: string,
});

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

export type QueryParameter = TypeOf<typeof QueryParameter>;

export const LambdaConfig = type({
  sql_path: string,
  default_parameters: array(QueryParameter),
});

export type LambdaConfig = TypeOf<typeof LambdaConfig>;

type CollectionConfig = Omit<Collection, 'name' | 'stats' | 'workspace'>;

export const ENTITIES = ['lambda', 'collection'] as const;

export type EntityType = typeof ENTITIES[number];

export interface LambdaEntity {
  fullName: QualifiedName;
  ws: string;
  name: string;
  type: 'lambda';
  config: LambdaConfig;
  sql: string;
}

export interface CollectionEntity {
  fullName: QualifiedName;
  ws: string;
  name: string;
  type: 'collection';
  config: CollectionConfig;
}
export interface DeployHooks {
  onNoChange?: (e: LambdaEntity) => void;
  onDeployStart?: (e: LambdaEntity) => void;
  onDeploySuccess?: (e: LambdaEntity) => void;
  onDeployError?: (error: ErrorModel, entity: LambdaEntity) => void;
}

export interface DownloadHooks {
  onNoOp?: () => void;
  onWriteLambda?: (e: LambdaEntity) => void;
  onWriteCollection?: (e: CollectionEntity) => void;
}

export interface LambdaDownloadOptions {
  useLambdaTag?: string;
}

/** Brands here. Brands are a way of testing a particular type of string**/
export interface QualifiedNameBrand {
  readonly QualifiedName: unique symbol;
}
export type QualifiedName = t.Branded<string, QualifiedNameBrand>;
export type QualifiedNameC = t.Type<QualifiedName, string, unknown>;

export const QualifiedName: QualifiedNameC = t.brand(
  t.string,
  (s): s is QualifiedName => {
    // Must be a string
    if (typeof s === 'string') {
      const pieces = s.split('.');
      return pieces.every((piece) => piece.match(/^[a-zA-Z0-9][\w-]*$/));
    }
    return false;
  },
  'QualifiedName'
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

export function parseAbsolutePath(p: string): AbsolutePath {
  return throwOnError(AbsolutePath.decode(p), errorInvalidAbsolutePath);
}

export function parseQualifiedName(p: string): QualifiedName {
  return throwOnError(QualifiedName.decode(p), errorInvalidQualifiedName);
}
