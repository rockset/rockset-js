import { QueryParameter, ErrorModel } from '@rockset/client/dist/codegen/api';

export const ROOT_CONFIG = 'rockconfig.json' as const;

export interface AuthProfile {
  apikey: string;
  apiserver: string;
}

// *** Error types below ***

export enum RockClientErrorTypes {
  ERROR_NOT_VALID_PROJECT,
}

// *** Config files ***
export interface RootConfig {
  source_root: string;
}

export interface LambdaConfig {
  sql_path: string;
  default_parameters: QueryParameter[];
}

/**
 * Represents a fully qualified entity name: eg "commons.myLambda" or "commons.myCollection"
 */
export type QualifiedName = string;
export type SqlString = string;

export type EntityType = 'lambda' | 'collection';

export interface LambdaEntity {
  fullName: string;
  ws: string;
  name: string;
  type: 'lambda';
  config: LambdaConfig;
  sql: string;
}
export interface DeployHooks {
  onNoChange: (e: LambdaEntity) => void;
  onDeployStart: (e: LambdaEntity) => void;
  onDeploySuccess: (e: LambdaEntity) => void;
  onDeployError: (error: ErrorModel, entity: LambdaEntity) => void;
}
