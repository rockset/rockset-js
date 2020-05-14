import * as core from './index';
const mock = require('mock-fs');
import * as path from 'path';

const getMockFS = () => ({
  root: {
    'rockconfig.json': `
    {
      "root": "src"
    }
    `,
    src: {
      myLambda: {
        'lambda.json': 'myLambda',
      },
    },
  },
});

/**
 * Execute a function inside of a mock file system
 * @param f the function to execute
 */
const withMockFS = async (f: Function) => {
  const realLog = console.log;
  const realErr = console.error;

  const logs: any[] = [];
  const errors: any[] = [];
  global.console.log = jest.fn((...args) => logs.push(args));
  global.console.error = jest.fn((...args) => errors.push(args));

  try {
    mock(getMockFS());

    const out = await f();
    return out;
  } finally {
    mock.restore();

    // Reset globals
    global.console.log = realLog;
    global.console.error = realErr;

    // Flush logs
    logs.forEach((args) => realLog(...args));
    errors.forEach((args) => realErr(...args));
  }
};

describe('Core Path Util Tests', () => {
  test('Test Resolve Root', async () => {
    await withMockFS(async () => {
      const a = process.cwd();
      const p = await core.pathutil.resolveRootDirectory(
        path.join(a, 'root/src/myLambda')
      );

      expect(p).toBe(path.join(a, 'root'));
    });
  });
});
