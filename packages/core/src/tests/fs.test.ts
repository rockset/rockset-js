import * as pathutil from '../filesystem/pathutil';
import { fileutil } from '..';
import {
  RockClientErrorTypes,
  RockClientException,
} from '../exception/exception';
import { createEmptyQLEntity, parseQualifiedName } from '../types';
import {
  writeLambda,
  readLambdaFromQualifiedName,
} from '../filesystem/fileutil';
import { expectException, mfs, mockPath } from './testUtil';

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

describe('Reading and writing QLs should be symmetrical', () => {
  test(
    'Adding new QL',
    mfs('emptyRoot', async () => {
      const entity = createEmptyQLEntity(parseQualifiedName('commons.foo'));
      await writeLambda(entity);
      const config = await readLambdaFromQualifiedName(entity.fullName);
      expect(config).toEqual(entity);
    })
  );

  test(
    'Adding a bad new QL',
    mfs('emptyRoot', async () => {
      try {
        const entity = createEmptyQLEntity(parseQualifiedName('commons.foo.'));
        await writeLambda(entity);
        fail('Should have failed to write invalid QL');
      } catch (e) {
        expectException(RockClientErrorTypes.ERROR_INVALID_QUALIFIED_NAME, e);
      }
    })
  );
});
