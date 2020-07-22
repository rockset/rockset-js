/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import ResolvePath from '../../commands/local/resolve';
import InitializeProject, { DEFAULT_SOURCE_ROOT } from '../../commands/local/init';
import { fileutil, types, pathutil } from '@rockset/core';
import AddEntity from '../../commands/local/queryLambda/add';
import * as path from 'path';
import CleanEntities from '../../commands/local/queryLambda/delete';
import ListEntities from '../../commands/local/queryLambda/list';
import * as _ from 'lodash';
import * as os from 'os';
import * as fse from 'fs-extra';
import { getSrcPath } from '@rockset/core/dist/filesystem/fileutil';

/**
 * NOTE: all tests in this file are run on the user's real file system
 * Changes should be limited to the testLambdas directory
 *
 * DO NOT invoke any auth commands here, as they will actually modify the user's real auth configuration file
 */

async function isDirEmpty(dirname: string) {
  const files = await fse.promises.readdir(dirname);
  return files.length === 0;
}

const expectToExist = async (p: string | types.AbsolutePath) =>
  expect(await fileutil.exists(p)).toBeTruthy();
const expectToNotExist = async (p: string) => expect(await fileutil.exists(p)).toBeFalsy;
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

const relative = (p: string) => path.join(process.cwd(), DEFAULT_SOURCE_ROOT, p);

describe('local command test suite', () => {
  let TEST_DIR: string;
  let all: [string, string][];
  let lambdas: string[];

  beforeAll(async () => {
    TEST_DIR = path.join(os.tmpdir(), 'rockset_cli_test', 'root');

    await fse.emptyDir(TEST_DIR);
    process.chdir(TEST_DIR);
    all = _.sortBy(
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

    lambdas = all.map(([name]) => name);
  });

  afterAll(async () => {
    await fse.emptyDir(TEST_DIR);
  });

  // ******* Helpers *********

  const mapAll = (f: (abc: [string, string]) => Promise<unknown>) => {
    return Promise.all(
      all.map((x) =>
        f(x).catch((error) => {
          throw new Error(`Failed at ${x}, ${error}`);
        }),
      ),
    );
  };

  // ****** Start tests here ******

  // Initialize
  test('initialize', async () => {
    await InitializeProject.run(['-y']);
    expect(await fileutil.exists(types.ROOT_CONFIG)).toBe(true);
  });

  // Add Query Lambdas failure
  test('Add Query Lambda without ws failure', async () => {
    const name = 'commons';
    await expectError(async () => {
      await AddEntity.run([name]);
    });
  });

  // Add Query Lambdas
  test('Add Query Lambda successful', async () => {
    await mapAll(([name, file]) => testAdd(name, file));
  });

  // List Query Lambdas
  test('List Query Lambda successful', async () => {
    const spy = jest.spyOn(process.stdout, 'write');
    await ListEntities.run();
    const result = lambdas.join('\n') + '\n';
    expect(spy).toHaveBeenCalledWith(result);
  });

  test('Resolve Query Lambdas', async () => {
    await mapAll(testResolve);
  });

  // Delete all Query Lambdas by lambda (-l flag)
  test('Delete Query Lambdas', async () => {
    await mapAll(([name, file]) => testDelete(name, file));
  });

  // All lambdas should fail to resolve (they've been deleted), but ws should still resolve
  test('Resolve Query Lambdas', async () => {
    await mapAll(testResolveFailure);
  });

  // List Query Lambdas: should list nothing
  test('List Query Lambda successful', async () => {
    const spy = jest.spyOn(process.stdout, 'write');
    await ListEntities.run();
    expect(spy).toHaveBeenCalledWith('\n');
  });

  // Add back Query Lambdas
  test('Add Query Lambda successful', async () => {
    await mapAll(([name, file]) => testAdd(name, file));
  });

  // Test that deleting a workspace works as expected
  test('Delete a workspace', async () => {
    // Expect commons to exist
    await expectToExist(relative('commons'));
    await CleanEntities.run(['-y', '-w', 'commons']);

    // Expect commons to be deleted
    await expectToNotExist(relative('commons'));

    // Expect 'a' to exist
    await expectToExist(relative('a'));
    const srcPath = await getSrcPath();

    // Expect the source directory to not be empty
    expect(await isDirEmpty(srcPath)).toBeFalsy();
  });

  // Test delete all Query Lambdas
  test('Delete Query Lambdas', async () => {
    await CleanEntities.run(['-y']);
    await mapAll(([, file]) => expectToNotExist(file));
    const srcPath = await getSrcPath();
    expect(await isDirEmpty(srcPath)).toBeTruthy();
  });
});
