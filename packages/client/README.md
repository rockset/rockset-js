@rockset/client
============

[![Version](https://img.shields.io/npm/v/@rockset/client.svg)](https://npmjs.org/package/@rockset/client)
[![Downloads/week](https://img.shields.io/npm/dw/@rockset/client.svg)](https://npmjs.org/package/@rockset/client)
[![License](https://img.shields.io/npm/l/@rockset/client.svg)](https://github.com/rockset/rockset-js/blob/master/package.json)
![Build|Lint|Test](https://github.com/rockset/rockset-js/workflows/Build%7CLint%7CTest/badge.svg)

Official Rockset Javascript/Typescript SDK.

## Requirements

Node 10+

If you are using Webpack, you should have ES6 support.

Optionally use Typescript for type checking.

## Installation

```
npm i @rockset/client
```


## Documentation

Full API Reference of the Javascript SDK can be found [here](https://docs.rockset.com/client/node/docs/).

## Usage

### Import Using Require

```ts
const rockset = require("rockset").default(
  apikey,
  "https://api.rs2.usw2.rockset.com"
);

await rockset.queries.query({
  sql: { query: "SELECT count(*) FROM _events" },
});
```

### Import Using ES6 Syntax

```ts
import rocksetConfigure from "rockset";
const rockset = rocksetConfigure(apikey, "https://api.rs2.usw2.rockset.com");

await rockset.queries.query({
  sql: { query: "SELECT count(*) FROM _events" },
});
```

### Create a Collection

Create a collection using the `client` object as follows:

```ts
client.collections
  .createCollection("commons", {
    name: "my-first-collection",
    description: "my first collection",
  })
  .then(console.log);
```

### Create an Integration

If you have an Amazon S3 bucket that you want to ingest data from, create a Rockset Integration to store credentials required to access the bucket.
Create an integration object using the `client` object as follows:

```ts
client.integrations
  .createIntegration({
    name: "my-first-integration",
    description: "my-first-integration",
    s3: {
      aws_role: {
        aws_role_arn: "...",
      },
      aws_access_key: {
        aws_access_key_id: "...",
        aws_secret_access_key: "...",
      },
    },
  })
  .then(console.log);
```

### Create a Collection from Amazon S3

Prior to creating a collection using Amazon S3 as source, create a Rockset Integration first as described above.

```ts
client.collections
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

### Add Documents

Add documents to an existing collection using the `client` object.

```ts
client.documents
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

### Query

Make queries to Rockset using the `client` object.

```ts
client.queries
  .query({
    sql: {
      query: "SELECT count(*) FROM _events;",
    },
  })
  .then(console.log);
```

### Create a Query Lambda

Create a Query Lambda using the `client` object.

```ts
client.queryLambdas
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

### Execute a Query Lambda

Execute a Query Lambda using the `client` object.

```ts
// Run a Query Lambda by tag with default parameters (or no parameters)
client.queryLambdas
  .executeQueryLambdaByTag(
    /* workspace */ "commons",
    /* queryName */ "myQuery",
    /* tag */ "dev"
  )
  .then(console.log)
  .catch(console.error);


// Run a Query Lambda with default parameters (or no parameters)
client.queryLambdas
  .executeQueryLambda(
    /* workspace */ "commons",
    /* queryName */ "myQuery",
    /* version */ "1ab853df3eab33b"
  )
  .then(console.log)
  .catch(console.error);

// Run a Query Lambda with custom parameters
client.queryLambdas
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
    { sql: { query: "SELECT count(*) FROM _events" } },
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
yarn test
```

This runs unit tests and integration tests.

## How to contribute

Please feel free to submit a pull request for modifications that can benefit other users in the community. It is best to have a unit test associated with each pull request.

## Support

Feel free to log issues against this client through GitHub.

## License

The Rockset Node Client is licensed under the [Apache 2.0 License](LICENSE)
