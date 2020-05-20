/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import rocksetConfigure from '../index';
import { ErrorModel, QueryLambdaVersionResponse } from '../codegen/api';

const basePath = process.env.ROCKSET_APISERVER;
const apikey = process.env.ROCKSET_APIKEY as string;

if (!apikey || !basePath) {
  throw 'No ROCKSET_APIKEY specified. Please specify an environment variable ROCKSET_APIKEY with your Rockset key. eg: $ export ROCKSET_APIKEY=...';
}

console.log('Specified apiserver to hit:', basePath);

const rockset = rocksetConfigure(apikey, basePath);
const collection = 'test_collection_' + Math.random().toString(36).slice(2);

const queryLambdaName = 'test_query_' + Math.random().toString(36).slice(2);

afterAll(function () {});
describe('Rockset Unit Tests', function () {
  test('creating a collection', async () => {
    try {
      const result = await rockset.collections.createCollection('commons', {
        name: collection,
      });
      expect(result).toMatchObject({
        data: {
          created_at: null,
          created_by: null,
          description: null,
          field_mappings: [],
          name: collection,
          retention_secs: null,
          sources: [],
          stats: null,
          status: 'CREATED',
          workspace: 'commons',
        },
      });
    } catch (e) {
      fail(e);
    }
  });

  test('running a query', async () => {
    const out = await rockset.queries.query({
      sql: {
        query: 'Select count(*) from _events;',
      },
    });
    expect(out).toMatchObject({
      collections: ['commons._events'],
      column_fields: [{ name: '?count', type: '' }],
      results: [{ '?count': expect.anything() }],
    });
  });

  test('getting collections', async () => {
    const out = await rockset.collections.getCollection('commons', '_events');
    const sampleOutput = {
      data: {
        created_at: '2019-10-16T01:46:55Z',
        created_by: null,
        description: null,
        field_mappings: [],
        name: '_events',
        retention_secs: 2592000,
        sources: [],
        stats: expect.anything(),
        status: 'READY',
        workspace: 'commons',
      },
    };

    expect(Object.getOwnPropertyNames(out)).toMatchObject(
      Object.getOwnPropertyNames(sampleOutput)
    );
  });

  test('deleting a collection', async () => {
    try {
      const result = await rockset.collections.deleteCollection(
        'commons',
        collection
      );
      expect(result).toMatchObject({
        data: {
          created_at: null,
          created_by: null,
          description: null,
          field_mappings: [],
          name: collection,
          retention_secs: null,
          sources: [],
          stats: null,
          status: 'DELETED',
          workspace: 'commons',
        },
      });
    } catch (e) {
      fail(e);
    }
  });

  let queryLambda: QueryLambdaVersionResponse;
  test('creating a Query Lambda', async () => {
    try {
      queryLambda = await rockset.queryLambdas.createQueryLambda('commons', {
        name: queryLambdaName,
        sql: {
          query: 'SELECT :param as echo',
          default_parameters: [
            {
              name: 'param',
              type: 'string',
              value: 'Hello world!',
            },
          ],
        },
      });
      expect(queryLambda).toMatchObject({
        data: {
          created_at: expect.anything(),
          created_by: expect.anything(),
          name: queryLambdaName,
          workspace: 'commons',
          version: expect.anything(),
          description: null,
          sql: {
            query: 'SELECT :param as echo',
            default_parameters: [
              {
                name: 'param',
                type: 'string',
                value: 'Hello world!',
              },
            ],
          },
          stats: expect.anything(),
          collections: [],
        },
      });
    } catch (e) {
      fail(e);
    }
  });

  test('running a Query Lambda with default parameters', async () => {
    try {
      const result = await rockset.queryLambdas.executeQueryLambda(
        'commons',
        queryLambdaName,
        queryLambda.data?.version ?? ''
      );
      expect(result).toMatchObject({
        results: [
          {
            echo: 'Hello world!',
          },
        ],
        stats: expect.anything(),
      });
    } catch (e) {
      fail(e);
    }
  });

  test('running a Query Lambda with custom parameters', async () => {
    try {
      const result = await rockset.queryLambdas.executeQueryLambda(
        'commons',
        queryLambdaName,
        queryLambda.data?.version ?? '',
        {
          parameters: [
            {
              name: 'param',
              type: 'string',
              value: 'All work and no play makes Jack a dull boy',
            },
          ],
        }
      );
      expect(result).toMatchObject({
        results: [
          {
            echo: 'All work and no play makes Jack a dull boy',
          },
        ],
        stats: expect.anything(),
      });
    } catch (e) {
      fail(e);
    }
  });

  // This test also tests that errors are converted to JSON before being thrown
  test("Running a query lambda that doesn't exist", async () => {
    try {
      await rockset.queryLambdas.executeQueryLambda(
        'commons.fake.workspace',
        'myFakeQuery',
        'not_a_version',
        {
          parameters: [
            {
              name: 'param',
              type: 'string',
              value: 'All work and no play makes Jack a dull boy',
            },
          ],
        }
      );
      fail("This query shouldn't exist!");
    } catch (e) {
      const error: ErrorModel = e;
      expect(error).toMatchObject({
        message:
          'Query Lambda "myFakeQuery" not found in workspace "commons.fake.workspace"',
        type: 'NotFound',
        line: null,
        column: null,
        trace_id: expect.anything(),
      });
    }
  });

  test('deleting a Query Lambda', async () => {
    try {
      const result = await rockset.queryLambdas.deleteQueryLambda(
        'commons',
        queryLambdaName
      );
      expect(result).toMatchObject({
        data: {
          name: queryLambdaName,
          workspace: 'commons',
          collections: [],
        },
      });
    } catch (e) {
      fail(e);
    }
  });
});
