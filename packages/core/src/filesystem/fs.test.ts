import * as pathutil from './pathutil';
import mocka from 'mock-fs';
const mock = require('mock-fs') as typeof mocka;
import * as path from 'path';
import { fileutil, types } from '..';
import { RockClientErrorTypes, RockClientException } from '../exception';

const getMockFS = () => ({
  root: {
    'rockconfig.json': `
    {
      "source_root": "src"
    }
    `,
    src: {
      commons: {
        'myLambda.lambda.json': '{}',
      },
    },
  },
  outsideRoot: {
    'abd.txt': 'some data',
  },
  badRoot: {
    'rockconfig.json': '{"bad": "bad"}',
  },
});

/**
 * Execute a function inside of a mock file system
 * @param f the function to execute
 */
const withMockFS = async (cwd: string, f: () => Promise<unknown>) => {
  const realLog = console.log;
  const realErr = console.error;
  const originalCwd = process.cwd();

  const logs: unknown[][] = [];
  const errors: unknown[][] = [];
  global.console.log = jest.fn((...args) => logs.push(args));
  global.console.error = jest.fn((...args) => errors.push(args));

  try {
    mock.restore();
    mock(getMockFS());
    process.chdir(cwd);

    const out = await f();
    return out;
  } finally {
    mock.restore();

    // Reset globals
    global.console.log = realLog;
    global.console.error = realErr;
    process.chdir(originalCwd);

    // Flush logs
    logs.forEach((args) => realLog(...args));
    errors.forEach((args) => realErr(...args));
  }
};

const mfs = (cwd: string, f: () => Promise<unknown>) => {
  return async () => {
    await withMockFS(cwd, f);
  };
};

const mockPath = (str: string) => {
  const a = process.cwd();
  return types.parseAbsolutePath(path.join(a, str));
};

describe('Root and Source resolve tests', () => {
  test(
    'Test Resolve Root',
    mfs('', async () => {
      const p = await pathutil.resolveRootDirectory(
        mockPath('root/src/commons')
      );

      expect(p).toBe(mockPath('root'));
    })
  );

  test(
    'Resolve Root from CWD',
    mfs('root/src/commons', async () => {
      const p = await pathutil.resolveRootDirectory();
      expect(p).toBe(mockPath('../..'));
    })
  );

  test(
    'Resolve Root from CWD subdir',
    mfs('root', async () => {
      const p = await pathutil.resolveRootDirectory();
      expect(p).toBe(mockPath(''));
    })
  );

  test(
    'Resolve outside of root',
    mfs('outsideRoot', async () => {
      try {
        await fileutil.readRootConfig();
        fail('Should have been an exception');
      } catch (e) {
        const error = e as RockClientException;
        expect(error.id).toBe(
          RockClientErrorTypes[RockClientErrorTypes.ERROR_NOT_VALID_PROJECT]
        );
      }
    })
  );

  test(
    'Root File badly typed',
    mfs('badRoot', async () => {
      try {
        await fileutil.readRootConfig();
        fail('Should have been an exception');
      } catch (e) {
        const error = e as RockClientException;
        expect(error.id).toBe(
          RockClientErrorTypes[RockClientErrorTypes.ERROR_INVALID_ROOT_CONFIG]
        );
      }
    })
  );

  test(
    'Get source root',
    mfs('root', async () => {
      const p = await fileutil.getSrcPath();
      expect(p).toBe(mockPath('src'));
    })
  );
});
