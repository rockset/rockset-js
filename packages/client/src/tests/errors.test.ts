/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import rocksetConfigure from '../index';

const basePath = process.env.ROCKSET_APISERVER;
const apikey = process.env.ROCKSET_APIKEY as string;

if (!apikey) {
  throw 'No ROCKSET_APIKEY specified. Please specify an environment variable ROCKSET_APIKEY with your Rockset key. eg: $ export ROCKSET_APIKEY=...';
}

if (!basePath) {
  throw 'No ROCKSET_APISERVER specified. Please specify an environment variable ROCKSET_APISERVER with your Rockset key. eg: $ export ROCKSET_APISERVER=...';
}

console.log('Specified apiserver to hit:', basePath);

const rockset = rocksetConfigure(apikey, basePath);

afterAll(function () {});
describe('error handling', function () {
  test('properly parses query error model', async () => {
    const out = await rockset.queries
      .query({
        sql: {
          // Syntax error - typo in COUNT
          query: 'SELECT COUT(*) FROM _events;',
        },
      })
      .catch((e) =>
        expect(e).toMatchObject({
          line: 1,
          column: 8,
          error_id: 'function_not_found',
          message: 'Function `COUT` not found.',
          type: 'QueryError',
        })
      );
    expect(out).toBeUndefined();
  });

  test('properly parses non-JSON error responses', async () => {
    // New client that returns 502 XML response
    const rocksetBadGateway = rocksetConfigure(
      apikey,
      'https://httpstat.us/502?path='
    );
    const out = await rocksetBadGateway.queries
      .query({
        sql: {
          query: 'SELECT 5',
        },
      })
      .catch((e) =>
        expect(e).toMatchObject({
          code: 502,
          message: 'Bad Gateway',
        })
      );
    expect(out).toBeUndefined();
  });
});