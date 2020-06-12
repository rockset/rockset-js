import rocksetConfigure from '../index';

const basePath = 'https://api.rs2.usw2.rockset.com';
const apikey = 'apikey';

const customFetch = jest.fn(async (url: string, options: unknown) => ({
  url,
  options,
}));

const rockset = rocksetConfigure(apikey, basePath, customFetch);
afterAll(() => customFetch.mockClear());
test('simple query', async () => {
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
        'User-Agent': 'Rockset Node SDK',
      },
      method: 'POST',
    },
    url: 'https://api.rs2.usw2.rockset.com/v1/orgs/self/queries',
  });

  expect(customFetch).toHaveBeenCalledWith(
    'https://api.rs2.usw2.rockset.com/v1/orgs/self/queries',
    {
      body: '{"sql":{"query":"Select count(*) from _events;"}}',
      headers: {
        Authorization: 'ApiKey apikey',
        'Content-Type': 'application/json',
        'User-Agent': 'Rockset Node SDK',
      },
      method: 'POST',
    }
  );
});

test('add documents', async () => {
  await rockset.documents.addDocuments('commons', 'thebestcollection', {
    data: [{}],
  });

  expect(customFetch).toHaveBeenCalledWith(
    'https://api.rs2.usw2.rockset.com/v1/orgs/self/ws/commons/collections/thebestcollection/docs',
    {
      body: '{"data":[{}]}',
      headers: {
        Authorization: 'ApiKey apikey',
        'Content-Type': 'application/json',
        'User-Agent': 'Rockset Node SDK',
      },
      method: 'POST',
    }
  );
});

test('is snake case', async () => {
  // This line won't type check if the generated code is camel case
  await rockset.collections.createCollection('ws', {
    name: 'sname',
    field_mappings: [],
  });
});
