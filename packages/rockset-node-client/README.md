

# rockset-node-client v2 [![npm version](https://badge.fury.io/js/rockset.svg)](https://badge.fury.io/js/rockset) [![npm version](https://img.shields.io/npm/dm/rockset.svg)](https://www.npmjs.com/package/rockset)


Official JS/TS client library for Rockset.

```
npm i rockset
```

## What's new
Supports ES6 promises and TS types out of the box.

If you are looking for the old Rockset client, you can find it at branch [v1](https://github.com/rockset/rockset-node-client/tree/v1)

## Requirements

ES6 node or Webpack. Typescript in order to get types support.

## Usage

```ts
import rocksetConfigure from "rockset";
const rockset = rocksetConfigure(apikey, "https://api.rs2.usw2.rockset.com");
await rockset.queries.query({
  sql: {
    query
  }
});
```

To supply a custom fetch function, we pass it in as the last parameter to rocksetConfigure.

This example shows how to configure a custom fetch function with axios's promise cancellation feature.

*Note this does not cancel the api request on Rockset's servers*

```ts
import axios from "axios";
import rocksetConfigure from "rockset";

// Super simple fetch with axios: axios docs show how to check for errors, cancel requests etc.
const customFetchAxios = async (url: string, {
  headers,
  method,
  body: data,
  queryParams: params,
  cancelToken
}:any) => {
  const res = await axios.request({
    url,
    headers,
    method,
    data,
    params,
    cancelToken
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

You can see a few more [sample examples](https://github.com/rockset/rockset-node-client/tree/v2.0/examples) of how to create a collection, how to put documents in a collection and how to use SQL to query your collections.

## Testing

Unit tests are available in the [Test](https://github.com/rockset/rockset-node-client/tree/v2.0/test) folder.

Set ROCKSET_APIKEY and ROCKSET_APISERVER endpoint in the environment variables. To run tests:
```
npm test
```

This runs unit tests and integration tests.

## Support

Feel free to log issues against this client through GitHub.

## License

The Rockset Node Client is licensed under the [Apache 2.0 License](https://github.com/rockset/rockset-node-client/blob/v2.0/LICENSE)