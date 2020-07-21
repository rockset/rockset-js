import { main } from '..';
import {} from '../exception/exception';
import { createEmptyQLEntity, parseLambdaQualifiedName } from '../types';
import { writeLambda } from '../filesystem/fileutil';
import { mfs } from './testUtil';
import _ from 'lodash';

describe('Main external facing functions', () => {
  test(
    'Test list entities',
    mfs('emptyRoot', async () => {
      // Write a lambda to commons.foo, and expect to see it listed
      const entity = createEmptyQLEntity(
        parseLambdaQualifiedName('commons.foo')
      );
      const entit2 = createEmptyQLEntity(
        parseLambdaQualifiedName('commons.foo.boo')
      );
      const entit3 = createEmptyQLEntity(
        parseLambdaQualifiedName('a.b.c.d.e.f.g.h')
      );
      await Promise.all([
        writeLambda(entity),
        writeLambda(entit2),
        writeLambda(entit3),
      ]);
      const { lambdas } = await main.listEntityNames();
      const sL = _.sortBy(lambdas, (l) => l[0]);
      expect(sL).toEqual([
        ['a.b.c.d.e.f.g.h', 'lambda'],
        ['commons.foo', 'lambda'],
        ['commons.foo.boo', 'lambda'],
      ]);
    })
  );
});
