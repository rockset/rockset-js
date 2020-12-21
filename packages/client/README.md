@rockset/client
============

[![Version](https://img.shields.io/npm/v/@rockset/client.svg)](https://npmjs.org/package/@rockset/client)
[![Downloads/week](https://img.shields.io/npm/dw/@rockset/client.svg)](https://npmjs.org/package/@rockset/client)
[![License](https://img.shields.io/npm/l/@rockset/client.svg)](https://github.com/rockset/rockset-js/blob/master/package.json)
![Build|Lint|Test](https://github.com/rockset/rockset-js/workflows/Build%7CLint%7CTest/badge.svg)

Official Rockset Javascript/Typescript Client

## Requirements

Node 10+

Optionally use Typescript for type checking.

## Installation

```
npm i @rockset/client
```

Note: you can also install using `yarn`.

## Complete Reference

A complete reference of this library (powered by [TypeDoc](https://typedoc.org/)) can be found [here](https://docs.rockset.com/client/node/docs/).

## Usage Examples

### Import (ES6 Syntax)

Note: you can also import using CommonJS syntax.

```ts
import rockset from "@rockset/client";
```

### Configure Client

```ts
const rocksetClient = rockset(process.env.ROCKSET_APIKEY);
```

Note: most sans-TypeScript projects require the following
(we're working on supporting default exports for both environments right now):

```ts
const rocksetClient = rockset.default(process.env.ROCKSET_APIKEY);
```

### Execute a Query Lambda

```ts
// Run a Query Lambda by tag with default parameters (or no parameters)
rocksetClient.queryLambdas
  .executeQueryLambdaByTag(
    /* workspace */ "commons",
    /* queryName */ "myQuery",
    /* tag */ "dev"
  )
  .then(console.log)
  .catch(console.error);


// Run a Query Lambda with default parameters (or no parameters)
rocksetClient.queryLambdas
  .executeQueryLambda(
    /* workspace */ "commons",
    /* queryName */ "myQuery",
    /* version */ "1ab853df3eab33b"
  )
  .then(console.log)
  .catch(console.error);

// Run a Query Lambda with custom parameters
rocksetClient.queryLambdas
  .executeQueryLambda("commons", "myQuery", "1ab853df3eab33b", {
    parameters: [
      {
        name: "param",
        type: "string",
        value: "All work and no play makes Jack a dull boy",
      },
    ],
  })
  .then(console.log)
  .catch(console.error);
```


### Execute an Arbitrary SQL Query

```ts
rocksetClient.queries
  .query({
    sql: {
      query: "SELECT 'Hello, world!'",
    },
  })
  .then(console.log);
```

### Create an Integration

```ts
rocksetClient.integrations
  .createIntegration({
    name: "my-first-integration",
    description: "my-first-integration",
    s3: {
      aws_role: {
        aws_role_arn: "...",
      },
    },
  })
  .then(console.log);
```

### Create a Collection from Amazon S3

```ts
rocksetClient.collections
  .createCollection("commons", {
    name: "my-first-s3-collection",
    description: "my first s3 collection",
    sources: [
      {
        integration_name: "my-first-integration",
        s3: {
          bucket: "bucket-name",
        },
      },
    ],
  })
  .then(console.log);
```

### Write Data to a Collection

```ts
rocksetClient.documents
  .addDocuments("commons", "my-first-collection", {
    data: [
      {
        name: "foo",
        address: "bar",
      },
    ],
  })
  .then(console.log);
```

### Create a Query Lambda

```ts
rocksetClient.queryLambdas
  .createQueryLambda("commons", {
    name: "myQueryLambda",
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
  .then(console.log);
```

## Testing

Unit tests are available in the [tests](tests) folder.

Set ROCKSET_APIKEY and ROCKSET_HOST endpoint in the environment variables. To run tests:

```
yarn test
```

This runs unit tests and integration tests. You can alternately run individual tests or test files using Jest:

```
jest src/tests/mockclient.test.ts
```

## Advanced

### Custom Fetch Function

By default, the client is a thin wrapper that sends REST calls to Rockset using `node-fetch`. Some applications may require more complex behavior. If additional functionality is required, the client can be configured to generate the parameters for a REST call, and pass them to a custom fetch function to be handled accordingly.

Here is an example that shows how to support cancelling API calls using a custom fetch function with Axios. To supply a custom fetch function, we pass it in as the last parameter to `rockset`.

```ts
import axios from "axios";
import rockset from "@rockset/client";

// Simple fetch with Axios instead of node-fetch
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
const rocksetClient = rockset(process.env.ROCKSET_APIKEY, basePath, customFetchAxios);
const cancelSource = axios.CancelToken.source();

// Execute a query
rockset.queries
  .query(
    { sql: { query: "SELECT count(*) FROM _events" } },
    { cancelToken: cancelSource.token }
  )
  .then(console.log)
  .catch(console.error);

// Cancel the request through axios
// Note: this merely cancels the HTTP call - it does not cancel the query on Rockset's servers
cancelSource.cancel();
```

## How to contribute

Please feel free to submit a pull request for modifications that can benefit other users in the community. It is best to have a unit test associated with each pull request.

## Support

File any issues with this client through GitHub.

## License

This client is licensed under the [Apache 2.0 License](LICENSE).
