import rocksetConfigure from "../src/index";

const basePath = process.env.ROCKSET_HOST || "https://api.rs2.usw2.rockset.com";
const apikey = process.env.ROCKSET_APIKEY as string;

if (apikey == null) {
  throw "No ROCKSET_APIKEY specified. Please specify an environment variable ROCKSET_APIKEY with your Rockset key. eg: $ export ROCKSET_APIKEY=...";
}

const rockset = rocksetConfigure(apikey, basePath);
const collection =
  "test_collection_" +
  Math.random()
    .toString(36)
    .slice(2);

const savedQuery =
  "test_query_" +
  Math.random()
    .toString(36)
    .slice(2);
  
afterAll(function() {});
describe("Rockset Unit Tests", function() {
  test("creating a collection", async () => {
    try {
      const result = await rockset.collections.createCollection("commons", {
        name: collection
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
          status: "CREATED",
          workspace: "commons"
        }
      });
    } catch (e) {
      fail(e);
    }
  });

  test("running a query", async () => {
    const out = await rockset.queries.query({
      sql: {
        query: "Select count(*) from _events;"
      }
    });
    expect(out).toMatchObject({
      collections: ["commons._events"],
      column_fields: [{ name: "?count", type: "" }],
      results: [{ "?count": expect.anything() }],
      stats: { rows_scanned: 0 }
    });
  });

  test("getting collections", async () => {
    const out = await rockset.collections.getCollection("commons", "_events");
    const sampleOutput = {
      data: {
        created_at: "2019-10-16T01:46:55Z",
        created_by: null,
        description: null,
        field_mappings: [],
        name: "_events",
        retention_secs: 2592000,
        sources: [],
        stats: expect.anything(),
        status: "READY",
        workspace: "commons"
      }
    };

    expect(Object.getOwnPropertyNames(out)).toMatchObject(
      Object.getOwnPropertyNames(sampleOutput)
    );
  });

  test("deleting a collection", async () => {
    try {
      const result = await rockset.collections.deleteCollection(
        "commons",
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
          status: "DELETED",
          workspace: "commons"
        }
      });
    } catch (e) {
      fail(e);
    }
  });

  test("creating a Query Lambda", async () => {
    try {
      const result = await rockset.queryLambdas.createQueryLambda("commons", {
        name: savedQuery,
        sql: {
          query: 'SELECT :param as echo',
          parameters: [{
            name: 'param',
            type: 'string',
            default_value: 'Hello world!'
          }],
        },
      });
      expect(result).toMatchObject({
        data: {
          created_at: expect.anything(),
          created_by: expect.anything(),
          name: savedQuery,
          workspace: "commons",
          version: 1,
          description: null,
          sql: { 
            query: 'SELECT :param as echo',
            parameters: [{
              name: 'param',
              type: 'string',
              default_value: 'Hello world!'
            }],
          },
          stats: expect.anything(),
          collections: [],
        }
      });
    } catch (e) {
      fail(e);
    }
  });

  test("running a Query Lambda with default parameters", async () => {
    try {
      const result = await rockset.queryLambdas.executeQueryLambda("commons", savedQuery, 1);
      expect(result).toMatchObject({
        results: [{
          "echo": "Hello world!",
        }],
        stats: expect.anything(),
      });
    } catch (e) {
      fail(e);
    }
  });

  test("running a Query Lambda with custom parameters", async () => {
    try {
      const result = await rockset.queryLambdas.executeQueryLambda("commons", savedQuery, 1, {
        parameters: [{
          name: 'param',
          value: 'All work and no play makes Jack a dull boy',
        }]
      });
      expect(result).toMatchObject({
        results: [{
          "echo": "All work and no play makes Jack a dull boy",
        }],
        stats: expect.anything(),
      });
    } catch (e) {
      fail(e);
    }
  });

  test("deleting a Query Lambda", async () => {
    try {
      const result = await rockset.queryLambdas.deleteQueryLambda("commons", savedQuery);
      expect(result).toMatchObject({
        data: {
          created_at: expect.anything(),
          created_by: expect.anything(),
          name: savedQuery,
          workspace: "commons",
          version: 1,
          description: null,
          sql: {
            query: 'SELECT :param as echo',
            parameters: [{
              name: 'param',
              type: 'string',
              default_value: 'Hello world!'
            }],
          },
          stats: expect.anything(),
          collections: [],
        }
      });
    } catch (e) {
      fail(e);
    }
  });
});
