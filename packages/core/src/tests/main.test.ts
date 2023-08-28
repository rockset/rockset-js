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

  test(
    'Test deploy',
    mfs('emptyRoot', async () => {
      // Write a lambda to commons.foo, and expect to see it listed
      const willSkip = createEmptyQLEntity(
        parseLambdaQualifiedName('commons.willSkip'),
        'blah'
      );
      willSkip.sql = 'SELECT 1';
      const willDeploy = createEmptyQLEntity(
        parseLambdaQualifiedName('commons.willDeploy'),
        'blah'
      );
      willDeploy.sql = 'SELECT 2';

      await Promise.all([writeLambda(willSkip), writeLambda(willDeploy)]);

      const startHook = jest.fn();
      const skipHook = jest.fn();
      const successHook = jest.fn();

      const mockClient = {
        workspaces: { listWorkspaces: jest.fn(() => ['commons']) },
        queryLambdas: {
          listQueryLambdaVersions: jest.fn(() => ({
            data: [
              {
                sql: { query: 'SELECT 1', default_parameters: [] },
                description: 'blah',
              },
            ],
          })),
          updateQueryLambda: jest.fn((_, lambda) => {
            if (lambda === 'willDeploy') {
              return { version: 'willDeployVersion' };
            }
            return { version: 'willSkipVersion' };
          }),
        },
      };

      await main.deployQueryLambdas(
        {
          onDeployStart: startHook,
          onSkipQueryLambda: skipHook,
          onDeployVersionSuccess: successHook,
        },
        {},
        // @ts-ignore
        mockClient
      );

      expect(startHook).toHaveBeenCalledTimes(2);

      expect(skipHook).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(skipHook.mock.calls?.[0]?.[0]).toBe('commons.willSkip');

      expect(successHook).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(successHook.mock.calls?.[0]?.[0]?.version).toBe(
        'willDeployVersion'
      );
    })
  );
});
