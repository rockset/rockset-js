import rocksetConfigure from "rockset";

const host = "https://api.rs2.usw2.rockset.com";
const apikey = "...";
const rockset = rocksetConfigure(apikey, host);

// All of these examples are strongly typed

// Create a collection
rockset.collections
  .createCollection("commons", {
    name: "collection",
  })
  .then(console.log)
  .catch(console.error);

// Execute a query from SQL text
const executeQuery = async (query: string) =>
  rockset.queries.query({
    sql: {
      query,
    },
  });

executeQuery("Select count(*) from _events;");

// Create a Query Lambda
rockset.queryLambdas
  .createQueryLambda("commons", {
    name: "myQuery",
    sql: {
      query: "SELECT :param as echo",
      default_parameters: [
        {
          name: "param",
          type: "string",
          value: "Hello world!",
        },
      ],
    },
  })
  .then(console.log)
  .catch(console.error);

// Execute a Query Lambda with default parameters (or no parameters)
rockset.queryLambdas
  .executeQueryLambda(
    /* workspace */ "commons",
    /* queryName */ "myQuery",
    /* version */ 1
  )
  .then(console.log)
  .catch(console.error);

// Execute a Query Lambda with, and specify parameters
rockset.queryLambdas
  .executeQueryLambda("commons", "myQuery", 1, {
    parameters: [
      {
        name: "param",
        value: "All work and no play makes Jack a dull boy",
        type: "string",
      },
    ],
  })
  .then(console.log)
  .catch(console.error);

// Delete a collection
rockset.collections
  .deleteCollection("commons", "collection")
  .then(console.log)
  .catch(console.error);
