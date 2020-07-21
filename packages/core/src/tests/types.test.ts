import { parseLambdaQualifiedName, parseAbsolutePath } from '../types';
import { RockClientErrorTypes } from '../exception/exception';
import { expectException } from './testUtil';
import { getWsNamePair } from '../filesystem/pathutil';

describe('Testing runtime type validation', () => {
  test('parse lambda qualified name', () => {
    const names = [
      'abc.abc',
      '1abc123.abc123',
      '1.a.c.b.d',
      'a12_-as.b12.c12_-',
    ];

    const badNames = [
      'abc',
      '-a',
      '_a',
      '..',
      "'Select",
      'commons.foo.-a',
      'commons.foo._',
      'commons.foo..',
    ];

    const qualifiedNames = names.map(parseLambdaQualifiedName);
    expect(qualifiedNames).toEqual(names);

    badNames.forEach((x) => {
      try {
        parseLambdaQualifiedName(x);
        fail(`Should have thrown for invalid qualified name ${x}`);
      } catch (e) {
        expectException(RockClientErrorTypes.ERROR_INVALID_QUALIFIED_NAME, e);
      }
    });
  });

  test('parse qualified name', () => {
    const names = [
      'abc.abc',
      '1abc123.abc123',
      '1.a.c.b.d',
      'a12_-as.b12.c12_-',
    ];

    const badNames = [
      'abc',
      '-a',
      '_a',
      '..',
      "'Select",
      'commons.foo.-a',
      'commons.foo._',
      'commons.foo..',
    ];

    const qualifiedNames = names.map(parseLambdaQualifiedName);
    expect(qualifiedNames).toEqual(names);

    badNames.forEach((x) => {
      try {
        parseLambdaQualifiedName(x);
        fail(`Should have thrown for invalid qualified name ${x}`);
      } catch (e) {
        expectException(RockClientErrorTypes.ERROR_INVALID_QUALIFIED_NAME, e);
      }
    });
  });

  test('parse ws name pair', () => {
    const names = [
      'abc.abc',
      '1abc123.abc123',
      '1.a.c.b.d',
      'a12_-as.b12.c12_-',
    ];

    const correctWs = ['abc', '1abc123', '1.a.c.b', 'a12_-as.b12'];
    const qualifiedNames = names.map(parseLambdaQualifiedName);
    const nws = qualifiedNames.map(getWsNamePair);
    const ws = nws.map(({ ws }) => ws);

    expect(ws).toEqual(correctWs);
  });

  test('parse absolute path', () => {
    const paths = ['/abc', '/abc/123/abc'];
    const badPaths = ['abc', 'commons.foo', 'select count', 'abc/abc/abc'];

    expect(paths.map(parseAbsolutePath)).toEqual(paths);
    badPaths.forEach((x) => {
      try {
        parseAbsolutePath(x);
        fail(`Should have thrown for invalid absolute path ${x}`);
      } catch (e) {
        expectException(RockClientErrorTypes.ERROR_INVALID_ABSOLUTE_PATH, e);
      }
    });
  });
});
