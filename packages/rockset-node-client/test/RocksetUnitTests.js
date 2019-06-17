var apiKey = process.env.ROCKSET_APIKEY;
var apiServer = process.env.ROCKSET_APISERVER;

var rockset = require('../src/rockset')(apiKey, apiServer)
var assert = require('assert');
var superagent = require('superagent');
var randomstring = require('randomstring');

var randstr = randomstring.generate(4);
var collection = 'rockset-node-collection-test' + randstr;
var integration = 'rockset-node-integration-test' + randstr;
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

describe('Rockset Unit Tests:', function(done) {
    describe('collection tests', function(done) {
        this.timeout(15000);
        after(function() {
            // cleanup incase of failures
            rockset.collections.remove(collection,
                function(error, response, body) {});
            rockset.integrations.remove(integration,
                function(error, response, body) {});
        });

        it('create an integration', function(done) {
            const result = rockset.integrations.create({
                'name': integration,
                'kinesis': {
                  'aws_access_key': {
                      'aws_access_key_id': 'dummy_id',
                      'aws_secret_access_key': 'dummy_secret',
                  },
                },
            }, function(error, response, body) {
                if (error) console.log(error.response.text);
                assert.equal(response.data.name, integration);
                return done();
            })
        });
        it('create a collection', function(done) {
            const result = rockset.collections.create('commons', {
                'name': collection,
            }, function(error, response, body) {
                if (error) console.log(error.response.text);
                assert.equal(response.data.name, collection);
                assert.equal(response.data.status, 'CREATED');
                return done();
            })
        });
        it('delete a collection', function(done) {
            sleep(5000).then(() => {
                rockset.collections.remove('commons', collection,
                        function(error, response, body) {
                            if (error) console.log(error.response.text);
                            assert.equal(response.data.name, collection);
                            assert.equal(response.data.status, 'DELETED');
                            return done();
                        })
            });
        })
        it('delete an integration', function(done) {
            rockset.integrations.remove(integration,
                function(error, response, body) {
                    if (error) console.log(error.response.text);
                    assert.equal(response.data.name, integration);
                    return done();
            })
        })
        it('query _events', function(done) {
            rockset.queries.query({
                'sql': {
                            'query': 'select * from _events limit 1'
                }
            }, function(error, response, body) {
                if (error) console.log(error.response.text);
                assert.equal(error, null)
                return done()
            });
        })
    });
});
