# rockset-node-client
Official Node.js client library for Rockset

Documentation: https://docs.rockset.com/nodejs-client/

## Requirements

Node 4 or later.

## Installation

```
npm install rockset --save
```

## Dependencies

This client has the following external dependencies:
* superagent@3.7.0

## Usage
You can see a few [sample examples](https://github.com/rockset/rockset-node-client/tree/master/examples) of how to create a collection, how to put documents in a collection and how to use SQL to query your collections.

## Testing

Unit tests are available in the [Test](https://github.com/rockset/rockset-node-client/tree/master/test) folder.

Set ROCKSET_APIKEY and ROCKSET_APISERVER endpoint in the environment variables. To run tests:
```
npm test
```

## Support

Feel free to log issues against this client through GitHub.

## License

The Rockset Node Client is licensed under the [Apache 2.0 License](https://github.com/rockset/rockset-node-client/blob/master/LICENSE)
