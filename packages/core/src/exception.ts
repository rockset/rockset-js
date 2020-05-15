import { ROOT_CONFIG, RockClientErrorTypes } from './types';

class RockClientException extends Error {
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
