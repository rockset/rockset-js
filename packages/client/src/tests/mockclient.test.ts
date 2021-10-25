// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
import rocksetConfigure from '../index';
import { version } from '../version';

const basePath = 'https://api.rs2.usw2.rockset.com';
const apikey = 'apikey';

const simpleFetch = jest.fn(async (url: string, options: unknown) => ({
  url,
  options,
}));

afterAll(() => simpleFetch.mockClear());
test('simple query', async () => {
  const rockset = rocksetConfigure(apikey, basePath, simpleFetch);
  const out = await rockset.queries.query({
    sql: {
      query: 'Select count(*) from _events;',
    },
  });

  expect(out).toMatchObject({
    options: {
      body: '{"sql":{"query":"Select count(*) from _events;"}}',
      headers: {
        Authorization: 'ApiKey apikey',
        'Content-Type': 'application/json',
        'User-Agent': `Rockset Node SDK/${version}`,
      },
      method: 'POST',
    },
    url: 'https://api.rs2.usw2.rockset.com/v1/orgs/self/queries',
  });

  expect(simpleFetch).toHaveBeenCalledWith(
    'https://api.rs2.usw2.rockset.com/v1/orgs/self/queries',
    {
      body: '{"sql":{"query":"Select count(*) from _events;"}}',
      headers: {
        Authorization: 'ApiKey apikey',
        'Content-Type': 'application/json',
        'User-Agent': `Rockset Node SDK/${version}`,
      },
      method: 'POST',
    }
  );
});

test('query with midstream query exception', async () => {
  const fetchWithMidstreamException = jest.fn(
    async (url: string, options: unknown) => ({
      url,
      options,
      query_errors: [
        {
          type: 'ResourceExceeded',
          message: 'You have exceeded your resources',
          status_code: 429,
        },
      ],
    })
  );

  try {
    const rockset = rocksetConfigure(
      apikey,
      basePath,
      fetchWithMidstreamException
    );
    await rockset.queries.query({
      sql: {
        query: 'Select count(*) from _events;',
      },
    });
  } catch (e) {
    expect(e).toMatchObject({
      message: 'You have exceeded your resources',
    });
  }

  expect(fetchWithMidstreamException).toHaveBeenCalledWith(
    'https://api.rs2.usw2.rockset.com/v1/orgs/self/queries',
    {
      body: '{"sql":{"query":"Select count(*) from _events;"}}',
      headers: {
        Authorization: 'ApiKey apikey',
        'Content-Type': 'application/json',
        'User-Agent': `Rockset Node SDK/${version}`,
      },
      method: 'POST',
    }
  );
});

test('add documents', async () => {
  const rockset = rocksetConfigure(apikey, basePath, simpleFetch);
  await rockset.documents.addDocuments('commons', 'thebestcollection', {
    data: [{}],
  });

  expect(simpleFetch).toHaveBeenCalledWith(
    'https://api.rs2.usw2.rockset.com/v1/orgs/self/ws/commons/collections/thebestcollection/docs',
    {
      body: '{"data":[{}]}',
      headers: {
        Authorization: 'ApiKey apikey',
        'Content-Type': 'application/json',
        'User-Agent': `Rockset Node SDK/${version}`,
      },
      method: 'POST',
    }
  );
});

test('is snake case', async () => {
  const rockset = rocksetConfigure(apikey, basePath, simpleFetch);

  // This line won't type check if the generated code is camel case
  await rockset.collections.createCollection('ws', {
    name: 'sname',
    field_mappings: [],
  });
});