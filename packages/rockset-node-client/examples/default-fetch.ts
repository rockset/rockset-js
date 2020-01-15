import rocksetConfigure from "rockset";

const basePath = "https://api.rs2.usw2.rockset.com";
const apikey = "apikey";
const rockset = rocksetConfigure(apikey, basePath);

// All of these examples are strongly typed

// Create a collection
rockset.collections
  .createCollection("commons", {
    name: "collection"
  })
  .then(console.log)
  .catch(console.error);

// Execute a query helper
const executeQuery = async (query: string) =>
  rockset.queries.query({
    sql: {
      query
    }
  });

executeQuery("Select count(*) from _events;");

// Delete a collection
rockset.collections
  .deleteCollection("commons", "collection")
  .then(console.log)
  .catch(console.error);
