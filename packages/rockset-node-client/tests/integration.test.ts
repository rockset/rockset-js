import rocksetConfigure from "../src/index";

const basePath = process.env.ROCKSET_HOST || "https://api.rs2.usw2.rockset.com";
const apikey = process.env.ROCKSET_APIKEY as string;

if (apikey == null) {
  throw "No APIKEY specified. Please specify an environment variable APIKEY with your rockset apikey. eg: $ APIKEY=abc jest";
}

const rockset = rocksetConfigure(apikey, basePath);
const collection =
  "test_collection_" +
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
          creation_time: null,
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
      results: [{ "?count": out?.results?.[0]?.["?count"] }],
      stats: { rows_scanned: 0 }
    });
  });

  test("getting collections", async () => {
    const out = await rockset.collections.getCollection("commons", "_events");
    const sampleOutput = {
      data: {
        created_at: "2019-10-16T01:46:55Z",
        created_by: null,
        creation_time: 1571190415924,
        description: null,
        field_mappings: [],
        name: "_events",
        retention_secs: 2592000,
        sources: [],
        stats: out?.data?.stats,
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
          creation_time: null,
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
});
