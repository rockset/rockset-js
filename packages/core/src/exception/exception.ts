import { ROOT_CONFIG, AbsolutePath, QualifiedName } from '../types';
import { prettyPrint } from '../helper';

// *** Error types below ***
export enum RockClientErrorTypes {
  ERROR_NOT_VALID_PROJECT,
  ERROR_NOT_IN_SRC_ROOT,
  ERROR_INVALID_ROOT_CONFIG,
  ERROR_INVALID_QUALIFIED_NAME,
  ERROR_INVALID_ABSOLUTE_PATH,
  ERROR_INVALID_LAMBDA_CONFIG,
  ERROR_INVALID_LAMBDA_ENTITY,
  ERROR_INVALID_AUTH_PROFILE,
  ERROR_INVALID_AUTH_CONFIG,
  ERROR_AUTH_CONFIG_NOT_FOUND,
  ERROR_AUTH_PROFILE_NOT_FOUND,
  ERROR_AUTH_PROFILE_EXISTS,
  ERROR_MALFORMED_PARAMETERS,
}

export class RockClientException extends Error {
  id: string;
  constructor(id: RockClientErrorTypes, message: string) {
    super(message);
    this.id = RockClientErrorTypes[id];
  }
}

export const errorNotValidProject = () => {
  return new RockClientException(
    RockClientErrorTypes.ERROR_NOT_VALID_PROJECT,
    `You are not in a valid Rockset project. Please make sure there is a ${ROOT_CONFIG} file configured in an ancestory directory`
  );
};

export const errorFailToWriteFileOutsideProject = () => {
  return new RockClientException(
    RockClientErrorTypes.ERROR_NOT_IN_SRC_ROOT,
    `This file is not in the source root defined in your project, and will not be written`
  );
};

export const errorFailToDeleteFileOutsideProject = () => {
  return new RockClientException(
    RockClientErrorTypes.ERROR_NOT_IN_SRC_ROOT,
    `This file is not in the source root defined in your project, and will not be deleted`
  );
};

export const errorInvalidRootConfig = (message: string) => {
  return new RockClientException(
    RockClientErrorTypes.ERROR_INVALID_ROOT_CONFIG,
    `Parsing root configuration failed.
Please check that your ${ROOT_CONFIG} is specified correctly.
Please check that any value you are attempting to write to the root config is also specified correctly ${message}`
  );
};

export const errorInvalidQualifiedName = (message: string) => {
  return new RockClientException(
    RockClientErrorTypes.ERROR_INVALID_QUALIFIED_NAME,
    `Parsing qualified name failed. Please ensure that all workspaces and entity names are properly formatted.
    ${message}
    `
  );
};

export const errorInvalidAbsolutePath = (message: string) => {
  return new RockClientException(
    RockClientErrorTypes.ERROR_INVALID_ABSOLUTE_PATH,
    `Parsing absolute path failed. Please ensure you are using an appropriate absolute path. ${message}`
  );
};

export const errorFailedToParseLambdaConfig = (
  name: QualifiedName,
  path: AbsolutePath
) => (message: string) => {
  return new RockClientException(
    RockClientErrorTypes.ERROR_INVALID_LAMBDA_CONFIG,
    `Parsing lambda "${name}" at path '${path}' failed. Please check that your lambda is specified correctly. ${message}`
  );
};

export const errorFailedToCreateEntity = (obj: unknown) => (
  message: string
) => {
  return new RockClientException(
    RockClientErrorTypes.ERROR_INVALID_LAMBDA_ENTITY,
    `Parsing lambda entity from object ${prettyPrint(
      obj
    )} failed. Please ensure the object is specified correctly. ${message}`
  );
};

export const errorGenericParse = (
  type: RockClientErrorTypes,
  description: string,
  obj: unknown
) => (message: string) => {
  return new RockClientException(
    type,
    `Parsing ${description} from object:

     ${typeof obj === 'string' ? obj : prettyPrint(obj)} 

    failed. Please ensure the object is specified correctly. ${message}`
  );
};

export const errorAuthConfigNotFound = () =>
  new RockClientException(
    RockClientErrorTypes.ERROR_AUTH_CONFIG_NOT_FOUND,
    `There is no auth configuration found in your home directory. 
Please first initialize an auth configuration, or export $ROCKSET_APIKEY and $ROCKSET_APISERVER env variables to skip this step.`
  );

export const errorAuthProfileNotFound = (profileName: string) =>
  new RockClientException(
    RockClientErrorTypes.ERROR_AUTH_PROFILE_NOT_FOUND,
    `There is no auth profile called ${profileName} in your auth configuration file. Please first initialize it.`
  );

export const errorAuthProfileExists = (profileName: string) =>
  new RockClientException(
    RockClientErrorTypes.ERROR_AUTH_PROFILE_EXISTS,
    `A profile ${profileName} already exists in your configuration file.`
  );
