import {
  QueryParameter,
  ErrorModel,
  Collection,
} from '@rockset/client/dist/codegen/api';

export const ROOT_CONFIG = 'rockconfig.json' as const;

export interface AuthProfile {
  apikey: string;
  apiserver: string;
}

// *** Error types below ***

export enum RockClientErrorTypes {
  ERROR_NOT_VALID_PROJECT,
  ERROR_NOT_IN_SRC_ROOT,
}

// *** Config files ***
export interface RootConfig {
  source_root: string;
}

export interface LambdaConfig {
  sql_path: string;
  default_parameters: QueryParameter[];
}

type CollectionConfig = Omit<Collection, 'name' | 'stats' | 'workspace'>;

/**
 * Represents a fully qualified entity name: eg "commons.myLambda" or "commons.myCollection"
 */
export type QualifiedName = string;
export type SqlString = string;

export const ENTITIES = ['lambda', 'collection'] as const;

export type EntityType = typeof ENTITIES[number];

export interface LambdaEntity {
  fullName: string;
  ws: string;
  name: string;
  type: 'lambda';
  config: LambdaConfig;
  sql: string;
}

export interface CollectionEntity {
  fullName: string;
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
  onWriteLambda?: (e: LambdaEntity) => void;
  onWriteCollection?: (e: CollectionEntity) => void;
}

export interface LambdaDownloadOptions {
  useLambdaTag?: string;
}
