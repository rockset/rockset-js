import { loadSql } from '..';
import rocksetConfigure from '@rockset/client';
import { QueryRequest } from '@rockset/client/dist/codegen/api';

const basePath = 'apiserver';
const apikey = 'apikey';

const simpleFetch = jest.fn(
  async (url: string, options: { body: string }) =>
    JSON.parse(options?.body) as QueryRequest
);
const rockset = rocksetConfigure(apikey, basePath, simpleFetch);

beforeAll(() => {
  simpleFetch.mockClear();
});

describe('Test Rockset Test Client', () => {
  test('Simple test', async () => {
    const tester = loadSql('Select * from _events', rockset);
    const body = ((await tester
      .substituteCollections({ _events: 'commons.foo' })
      .addParameter({ name: 'foo', value: 'bar', type: 'string' })
      .defaultRowLimit(100)
      .execute()) as unknown) as QueryRequest;

    expect(body?.sql).toEqual({
      query: 'Select * from "commons"."foo"',
      parameters: [{ name: 'foo', value: 'bar', type: 'string' }],
      default_row_limit: 100,
    });
  });

  test('Simple test validate', async () => {
    const tester = loadSql('Select * from _events', rockset);
    const body = ((await tester
      .substituteCollections({ _events: 'commons.foo' })
      .addParameter({ name: 'foo', value: 'bar', type: 'string' })
      .defaultRowLimit(100)
      .execute()) as unknown) as QueryRequest;

    expect(body?.sql).toEqual({
      query: 'Select * from "commons"."foo"',
      parameters: [{ name: 'foo', value: 'bar', type: 'string' }],
      default_row_limit: 100,
    });
  });

  test('All arguments', async () => {
    const tester = loadSql('Select * from _events', rockset);
    const body = ((await tester
      .substituteCollections({ _events: 'commons.foo' })
      .addParameter({ name: 'foo', value: 'barDeleted', type: 'string' })
      .addParameter({ name: 'bar', value: 'bar', type: 'date' })
      .addParameters([
        { name: 'foo', value: 'bar', type: 'string' },
        { name: 'foo2', value: 'bar', type: 'string' },
      ])
      .defaultRowLimit(100)
      .generateWarnings(true)
      .profilingEnabled(true)
      .execute()) as unknown) as QueryRequest;

    expect(body?.sql).toEqual({
      query: 'Select * from "commons"."foo"',
      parameters: [
        { name: 'foo', value: 'bar', type: 'string' },
        { name: 'bar', value: 'bar', type: 'date' },
        { name: 'foo2', value: 'bar', type: 'string' },
      ],
      default_row_limit: 100,
    });
  });
});
