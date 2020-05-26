import { main } from '..';
import {} from '../exception/exception';
import { createEmptyQLEntity, parseQualifiedName } from '../types';
import { writeLambda } from '../filesystem/fileutil';
import { mfs } from './testUtil';
import _ from 'lodash';

describe('Main external facing functions', () => {
  test(
    'Test list entities',
    mfs('emptyRoot', async () => {
      // Write a lambda to commons.foo, and expect to see it listed
      const entity = createEmptyQLEntity(parseQualifiedName('commons.foo'));
      const entit2 = createEmptyQLEntity(parseQualifiedName('commons.foo.boo'));
      await Promise.all([writeLambda(entity), writeLambda(entit2)]);
      const { lambdas } = await main.listEntityNames();
      const sL = _.sortBy(lambdas, (l) => l[0]);
      expect(sL).toEqual([
        ['commons.foo', 'lambda'],
        ['commons.foo.boo', 'lambda'],
      ]);
    })
  );
});
