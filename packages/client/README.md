# @rockset/client

[![Version](https://img.shields.io/npm/v/@rockset/client.svg)](https://npmjs.org/package/@rockset/client)
[![Downloads/week](https://img.shields.io/npm/dw/@rockset/client.svg)](https://npmjs.org/package/@rockset/client)
[![License](https://img.shields.io/npm/l/@rockset/client.svg)](https://github.com/rockset/rockset-js/blob/master/package.json)
![Build|Lint|Test](https://github.com/rockset/rockset-js/workflows/Build%7CLint%7CTest/badge.svg)

Official Rockset Javascript/Typescript Client

## Requirements

Node 10+

Recommended: use Typescript for type checking.

## Installation

```
npm i @rockset/client
```

Note: you can also install using `yarn`.

## Complete Reference

A complete reference of this library (powered by [TypeDoc](https://typedoc.org/)) can be found [here](https://docs.rockset.com/client/node/docs/).

## Initialization

To initialize a Rockset client, you will have to import the client, and set client parameters.

### Import (ES6 Syntax)

Note: you can also import using CommonJS syntax.

```ts
import rockset from '@rockset/client';
```

### Configure Client - Apikey

```ts
const rocksetClient = rockset(process.env.ROCKSET_APIKEY);
```

Note: most sans-TypeScript projects currently require the following
(we're currently working on better interoperability for Node / CommonJS / ES6):

```ts
const rocksetClient = rockset.default(process.env.ROCKSET_APIKEY);
```

### Configure Client - Region

By default, our client connects to the Oregon 1 server. To select another region, you will need to explicitly set this region. You can find a list of Rockset API servers and supported regions in the Rockset Docs [here](https://rockset.com/docs/rest-api).

```ts
const rocksetClient = rockset(process.env.ROCKSET_APIKEY, "https://api.use1a1.rockset.com");
```

## Loading Your Data

Note: we recommend using the [Rockset Console](https://console.rockset.com/) for setting up integrations, with which
you can create collections that load data from [external data sources](https://docs.rockset.com/integrations/).

### Create an empty collection

```ts
rocksetClient.collections
  .createCollection('commons' /* name of workspace */, {
    name: 'MyFirstCollection' /* name of collection */,
    description:
      'I can write data to this collection' /* (optional) description */,
  })
  .then(console.log)
  .catch(console.error);
```

### Create an empty collection with field mappings

```ts
import { InputField, OutputField } from '@rockset/client/dist/codegen/api';

rocksetClient.collections
  .createCollection('commons', {
    name: 'Users',
    description: "I'm the map!",
    retention_secs: 10000 /* (optional) number of seconds after which data is purged. */,
    field_mappings: [
      {
        name: 'drop_all_fields' /* name of field mapping */,
        is_drop_all_fields: true /*  (optional) whether to drop all fields - if true, don't set input or output fields */,
      },
      {
        name: 'cast_age_to_int',
        input_fields: [
          {
            field_name: 'age' /* name of field in input data */,
            /*
              (optional) If an incoming document is missing this input field:
                SKIP: the field mapping will not be applied at all
                PASS: the input field value will be set to null when applying the field mapping
            */
            if_missing: InputField.IfMissingEnum.SKIP,
            is_drop: false /* (optional) drop this field at the time of ingest */,
            param:
              'input_age' /* (optional) an alias which can be referred in a SQL expression in the output_field */,
          },
          {
            field_name: 'first_name',
            if_missing: InputField.IfMissingEnum.PASS,
            is_drop: true,
          },
          {
            field_name: 'last_name',
            if_missing: InputField.IfMissingEnum.PASS,
            is_drop: true,
          },
        ],
        output_field: {
          field_name:
            'user_description' /* (optional) name of the new field created by your SQL expression */,
          value: {
            sql:
              "CONCAT(:first_name, ' ', :last_name, ' is ', CAST(:input_age as int), ' years old.')",
          } /* (optional) an expression that is applied to every new document added to your collection */,
          /*
            (optional) When there is an error while evaluating the SQL expression:
              SKIP: skips only this output field but continues the update
              FAIL: causes the update to fail entirely
          */
          on_error: OutputField.OnErrorEnum.FAIL,
        },
      },
    ],
  })
  .then(console.log)
  .catch(console.error);
```

### Add documents into your collection with the Write API

```ts
rocksetClient.documents
  .addDocuments(
    'commons' /* name of workspace */,
    'Users' /* name of collection */,
    {
      /* array of JSON objects, each representing a new document */
      data: [
        { first_name: 'Brian', last_name: 'Morris', age: '14' },
        { first_name: 'Justin', last_name: 'Smith', age: '78' },
        { first_name: 'Scott', last_name: 'Wong', age: '42' },
      ],
    }
  )
  .then(console.log)
  .catch(console.error);
```

## Query your data

### Run a SQL query

```ts
rocksetClient.queries
  .query({
    sql: {
      query: 'SELECT * FROM commons.Users u WHERE u.age > :minimum_age',
      /* (optional) list of parameters that may be used in the query */
      parameters: [
        {
          name: 'minimum_age' /* name of parameter */,
          type:
            'int' /* one of: int, float, bool, string date, datetime, time, timestamp */,
          value: '20' /* value of parameter */,
        },
      ],
      default_row_limit: 150 /* (optional) row limit to be used if no limit is specified in the query */,
    },
  })
  .then(console.log)
  .catch(console.error);
```

### Run queries with pagination

```ts
let page = await rockset.queries.query({
  sql: {
    // This query will return 100 documents.
    query: 'SELECT * FROM my_collection LIMIT 100',

    // Pagination must be enabled explicitly on a per-query basis.
    paginate: true,

    // This tells Rockset how many documents to include in the initial response.
    initial_paginate_response_doc_count: 20,
  },
});

const qid = page.query_id ?? '';

// `next_cursor` will be null when all queries are read.
while (page.pagination?.next_cursor) {
  // Process the results.
  console.log(page.results);

  page = await rockset.queries.getQueryPagination(
    qid,
    page.pagination?.next_cursor ?? '',
    // Read results in batches of 10 results. This can be an arbitrary number.
    10,
    0
  );
}

// Process the last page of results.
console.log(page.results);
```

### Run queries using Query Lambdas

```ts
// Create a Query Lambda
rocksetClient.queryLambdas
  .createQueryLambda('commons' /* name of workspace */, {
    name: 'MyFirstQueryLambda' /* name of Query Lambda */,
    description: 'A Query Lambda' /* (optional) description */,
    sql: {
      query: 'SELECT * FROM commons.Users u WHERE u.age > :minimum_age',
      /* (optional) list of default parameters that may be used in the query */
      default_parameters: [{ name: 'minimum_age', type: 'int', value: '40' }],
    },
  })
  .then(console.log)
  .catch(console.error);
  
// Run a Query Lambda by tag
rocksetClient.queryLambdas
  .executeQueryLambdaByTag('commons', 'MyFirstQueryLambda', 'latest', {
    /* (optional) list of parameters that may be used in the query, that overwrite default parameters */
    parameters: [{ name: 'minimum_age', type: 'int', value: '20' }],
  })
  .then(console.log)
  .catch(console.error);
  
// Update a Query Lambda
rocksetClient.queryLambdas
  .updateQueryLambda('commons', 'MyFirstQueryLambda', {
    description: 'query for exact age',
    sql: {
      query: 'SELECT * FROM commons.Users u WHERE u.age = :minimum_age',
      default_parameters: [{ name: 'minimum_age', type: 'int', value: '42' }],
    },
  })
  .then((response) => {
    console.log(response);
    
    // Run a Query Lambda by version
    rocksetClient.queryLambdas
      .executeQueryLambda(
        'commons',
        'MyFirstQueryLambda',
        response.data.version /* specific Query Lambda version to run */,
        {
          parameters: [{ name: 'minimum_age', type: 'int', value: '10' }],
          default_row_limit: 150,
          generate_warnings: true,
        }
      )
      .then(console.log)
      .catch(console.error);
      
    // Tag a specific version of your Query Lambda
    rocksetClient.queryLambdas
      .createQueryLambdaTag('commons', 'MyFirstQueryLambda', {
        tag_name: 'dev' /* name of tag */,
        version:
          response.data.version /* specific Query Lambda version to be tagged */,
      })
      .then(console.log)
      .catch(console.error);
  })
  .catch(console.error);
```

## Manage your collections

### Create an alias for your collection

```ts
rocksetClient.aliases
  .createAlias('commons', {
    name: 'UsersAlias' /* name of alias */,
    description: 'An alias for users collection' /* (optional) description */,
    collections: [
      'commons.Users',
    ] /* list of collection (paths) that your alias references */,
  })
  .then(console.log)
  .catch(console.error);
```

### Query an alias, as you would any collection

```ts
rocksetClient.queries
  .query({
    sql: {
      query: 'SELECT * FROM commons.UsersAlias',
    },
  })
  .then(console.log)
  .catch(console.error);
```

### Point an alias to a new collection to avoid downtime

```ts
rocksetClient.collections
  .createCollection('commons', {
    name: 'UsersV2',
    description: 'Updated Users collection',
  })
  .then(console.log)
  .catch(console.error);
  
rocksetClient.aliases
  .updateAlias('commons', 'UsersAlias', {
    collections: ['commons.UsersV2'],
  })
  .then(console.log)
  .catch(console.error);
```

## Testing

Unit tests are available in the [tests](https://github.com/rockset/rockset-js/tree/master/packages/client/src/tests) folder.

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
import axios from 'axios';
import rockset from '@rockset/client';

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
const basePath = 'https://api.rs2.usw2.rockset.com';
const rocksetClient = rockset(
  process.env.ROCKSET_APIKEY,
  basePath,
  customFetchAxios
);
const cancelSource = axios.CancelToken.source();

// Execute a query
rockset.queries
  .query(
    { sql: { query: 'SELECT count(*) FROM _events' } },
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

This client is licensed under the [Apache 2.0 License](https://github.com/rockset/rockset-js/blob/master/packages/client/LICENSE).
