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
