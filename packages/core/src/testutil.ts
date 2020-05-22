import {
  RockClientErrorTypes,
  RockClientException,
} from './exception/exception';

export const expectException = (id: RockClientErrorTypes, e: unknown) => {
  if (e instanceof RockClientException) {
    expect(e.id).toBe(RockClientErrorTypes[id]);
  } else {
    fail('Not the right exception type!');
  }
};
