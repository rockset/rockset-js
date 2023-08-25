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
    'Test deploy query lambdas',
    mfs('emptyRoot', async () => {
      process.env.ROCKSET_APIKEY = 'blah';
      process.env.ROCKSET_APISERVER = 'blah.rockset.com';

      // Write a lambda to commons.foo, and expect to see it listed
      const entity = createEmptyQLEntity(
        parseLambdaQualifiedName('commons.doNotDeploy')
      );
      const entity2 = createEmptyQLEntity(
        parseLambdaQualifiedName('commons.willDeploy')
      );
      entity2.config.flagForDeploy = true;
      await Promise.all([
        writeLambda(entity),
        writeLambda(entity2),
      ]);

      const deployStart = jest.fn();
      const deploySkip = jest.fn();

      const mockWorkspacesCall = jest.fn(() => ['commons']);
      const mockClient = {workspaces: {listWorkspaces: mockWorkspacesCall}};
      
      await main.deployQueryLambdas({ onDeployStart: deployStart, onSkipQueryLambda: deploySkip }, {onlyDeployIfFlagged: true, dryRun: true}, mockClient);
      
      expect(deployStart).toBeCalledTimes(1);
      expect(deploySkip).toBeCalledTimes(1);
    })
  );
});
