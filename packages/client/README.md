# rockset-node-client v2 [![npm version](https://badge.fury.io/js/rockset.svg)](https://badge.fury.io/js/rockset) [![npm version](https://img.shields.io/npm/dm/rockset.svg)](https://www.npmjs.com/package/rockset)

Official Rockset Javascript/Typescript SDK.

```
npm i rockset
```

## What's new

Supports ES6 promises and Typescript out of the box.

## Requirements

At least Node v4.3.2

If you are using Webpack, you should have ES6 support.

Optionally use Typescript for type checking.

## Documentation

Further documentation of the Javascript SDK can be found in the [Rockset Docs](https://docs.rockset.com/nodejs/).

## Usage

### Import Using Require

```js
const rockset = require("rockset").default(
  apikey,
  "https://api.rs2.usw2.rockset.com"
);

await rockset.queries.query({
  sql: { query: "Select count(*) from _events" },
});
```

### Import Using ES6 Syntax

```ts
import rocksetConfigure from "rockset";
const rockset = rocksetConfigure(apikey, "https://api.rs2.usw2.rockset.com");

await rockset.queries.query({
  sql: { query: "Select count(*) from _events" },
});
```

### Query Lambdas

```ts
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
```

### Custom Fetch Function

By default, the rockset-node-client is a thin wrapper that sends REST calls to Rockset using `node-fetch`. Many applications may require more complex behavior. If additional functionality is required, `rockset-node-client` can be configured to generate the parameters for a REST call, and pass them to a custom fetch function to be handled accordingly.

Here is an example that shows how to support cancelling API calls using a custom fetch function with Axios. To supply a custom fetch function, we pass it in as the last parameter to rocksetConfigure.

_Note this does not cancel the API request on Rockset's servers_

```ts
import axios from "axios";
import rocksetConfigure from "rockset";

// Super simple fetch with axios: axios docs show how to check for errors, cancel requests etc.
const customFetchAxios = async (
  url: string,
  { headers, method, body: data, queryParams: params, cancelToken }: any
) => {
  const res = await axios.request({
    url,
    headers,
    method,
    data,
    params,
    cancelToken,
  });

  return res.data;
};

// Configure
const basePath = "https://api.rs2.usw2.rockset.com";
const apikey = "<your apikey>";

const rockset = rocksetConfigure(apikey, basePath, customFetchAxios);
const cancelSource = axios.CancelToken.source();

// To execute a query
rockset.queries
  .query(
    { sql: { query: "Select count(*) from _events" } },
    { cancelToken: cancelSource.token }
  )
  .then(console.log)
  .catch(console.error);

// To cancel the request through axios
// *** THIS DOES NOT CANCEL THE QUERY ON OUR SERVERS ***
cancelSource.cancel();
```

You can see a few more [sample examples](examples) of how to create a collection, how to put documents in a collection and how to use SQL to query your collections.

## Testing

Unit tests are available in the [tests](tests) folder.

Set ROCKSET_APIKEY and ROCKSET_HOST endpoint in the environment variables. To run tests:

```
npm test
```

This runs unit tests and integration tests.

## How to contribute

Please feel free to submit a pull request for modifications that can benefit other users in the community. It is best to have a unit test associated with each pull request.

## Support

Feel free to log issues against this client through GitHub.

## License

The Rockset Node Client is licensed under the [Apache 2.0 License](LICENSE)
