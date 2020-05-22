import mocka from 'mock-fs';
const mock = require('mock-fs') as typeof mocka;
import * as path from 'path';
import { types } from '..';
import {
  RockClientErrorTypes,
  RockClientException,
} from '../exception/exception';

export const getMockFS = () => ({
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
  emptyRoot: {
    'rockconfig.json': `
    {
      "source_root": "src"
    }
    `,
  },
});

/**
 * Execute a function inside of a mock file system
 * @param f the function to execute
 */
export const withMockFS = async (cwd: string, f: () => Promise<unknown>) => {
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

export const mfs = (cwd: string, f: () => Promise<unknown>) => {
  return async () => {
    await withMockFS(cwd, f);
  };
};

export const mockPath = (str: string) => {
  const a = process.cwd();
  return types.parseAbsolutePath(path.join(a, str));
};

export const expectException = (id: RockClientErrorTypes, e: unknown) => {
  if (e instanceof RockClientException) {
    expect(e.id).toBe(RockClientErrorTypes[id]);
  } else {
    fail('Not the right exception type!');
  }
};
