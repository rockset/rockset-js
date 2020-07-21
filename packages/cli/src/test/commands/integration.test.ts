/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import ResolvePath from '../../commands/local/resolve';
import InitializeProject from '../../commands/local/init';
import { fileutil, types, pathutil } from '@rockset/core';
import AddEntity from '../../commands/local/queryLambda/add';
import { cwd } from 'process';
import * as path from 'path';
import CleanEntities from '../../commands/local/queryLambda/delete';
import ListEntities from '../../commands/local/queryLambda/list';
import * as _ from 'lodash';

/**
 * NOTE: all tests in this file are run on the user's real file system
 * Changes should be limited to the testLambdas directory
 *
 * DO NOT invoke any auth commands here, as they will actually modify the user's real auth configuration file
 */

process.chdir('./testLambdas');
const relative = (p: string) => path.join(cwd(), 'src', p);

const expectToExist = async (p: string | types.AbsolutePath) =>
  expect(await fileutil.exists(p)).toBe(true);
const expectToNotExist = async (p: string) => expect(await fileutil.exists(p)).toBe(false);
const expectError = async (f: Function) => {
  try {
    await f();
    fail('This should have thrown an exception');
  } catch (error) {}
};

const testAdd = async (name: string, expectedPath: string) => {
  await expectToNotExist(expectedPath);
  await AddEntity.run([name]);
  await expectToExist(expectedPath);
  const sqlPath = await fileutil.getLambdaSqlPathFromQualifiedName(
    types.parseLambdaQualifiedName(name),
  );
  await expectToExist(sqlPath);

  // This should fail
  await expectError(async () => AddEntity.run([name]));
};

const testDelete = async (name: string, expectedPath: string) => {
  await expectToExist(expectedPath);
  await CleanEntities.run(['-l', name, '-y']);
  await expectToNotExist(expectedPath);
};
const all: [string, string][] = _.sortBy(
  [
    ['commons.foo', relative('commons/foo.lambda.json')],
    ['commons.sub.sub2.foo', relative('commons/sub/sub2/foo.lambda.json')],
    ['a.b.c.d.e.f.g.h', relative('a/b/c/d/e/f/g/h.lambda.json')],
    [
      'commons.hello-world.helloWorld.hello_world',
      relative('commons/hello-world/helloWorld/hello_world.lambda.json'),
    ],
  ],
  (x) => x[0],
);

const lambdas = all.map(([name]) => name);

const mapAll = (f: (abc: [string, string]) => Promise<unknown>) => {
  return Promise.all(
    all.map((x) =>
      f(x).catch((error) => {
        throw new Error(`Failed at ${x}, ${error}`);
      }),
    ),
  );
};

const testResolve = async ([name, file]: [string, string]) => {
  const spy = jest.spyOn(process.stdout, 'write');
  spy.mockClear();
  await ResolvePath.run([name]);
  expect(spy).toHaveBeenCalledWith(file + '\n');

  spy.mockClear();
  const { ws } = pathutil.getWsNamePair(types.parseLambdaQualifiedName(name));
  const wsPath = path.dirname(file);
  await ResolvePath.run([ws, '-e', 'workspace']);
  expect(spy).toHaveBeenCalledWith(wsPath + '\n');
};

const testResolveFailure = async ([name, file]: [string, string]) => {
  await expectError(async () => ResolvePath.run([name]));
  await expectError(async () => ResolvePath.run([name, '--sql']));

  const spy = jest.spyOn(process.stdout, 'write');
  spy.mockClear();
  await ResolvePath.run([name, '--no-exists']);
  expect(spy).toHaveBeenCalledWith(file + '\n');

  spy.mockClear();
  const { ws } = pathutil.getWsNamePair(types.parseLambdaQualifiedName(name));
  const wsPath = path.dirname(file);
  await ResolvePath.run([ws, '-e', 'workspace']);
  expect(spy).toHaveBeenCalledWith(wsPath + '\n');
};

describe('local:resolve test suite', () => {
  // Initialize
  test('initialize', async () => {
    await InitializeProject.run(['-y']);
    expect(await fileutil.exists(types.ROOT_CONFIG)).toBe(true);
  });

  // Add query lambdas failure
  test('Add query lambda without ws failure', async () => {
    const name = 'commons';
    await expectError(async () => {
      await AddEntity.run([name]);
    });
  });

  // Add query lambdas
  test('Add query lambda successful', async () => {
    await mapAll(([name, file]) => testAdd(name, file));
  });

  // List query lambdas
  test('List query lambda successful', async () => {
    const spy = jest.spyOn(process.stdout, 'write');
    await ListEntities.run();
    const result = lambdas.join('\n') + '\n';
    expect(spy).toHaveBeenCalledWith(result);
  });

  test('Resolve Query Lambdas', async () => {
    await mapAll(testResolve);
  });

  // Delete all Query Lambdas
  test('Delete Query Lambdas', async () => {
    await mapAll(([name, file]) => testDelete(name, file));
  });

  // All lambdas should fail to resolve (they've been deleted), but ws should still resolve
  test('Resolve Query Lambdas', async () => {
    await mapAll(testResolveFailure);
  });

  // List query lambdas: should list nothing
  test('List query lambda successful', async () => {
    const spy = jest.spyOn(process.stdout, 'write');
    await ListEntities.run();
    expect(spy).toHaveBeenCalledWith('\n');
  });

  // Add back query lambdas
  test('Add query lambda successful', async () => {
    await mapAll(([name, file]) => testAdd(name, file));
  });

  // Test delete all Query Lambdas
  test('Delete Query Lambdas', async () => {
    await CleanEntities.run(['-y']);
    await mapAll(([, file]) => expectToNotExist(file));
  });
});
