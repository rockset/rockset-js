var apiKey = process.env.ROCKSET_APIKEY;
var apiServer = process.env.ROCKSET_APISERVER;
var awsKey = process.env.AWS_KEY;
var awsSecret = process.env.AWS_SECRET_KEY;
var rockset = require('rockset')(apiKey, apiServer);


var getResponseLogger = function (callback) {
  return function (error, response, body) {
      if (error) {
        console.log(error.response.error.text);
        callback();
      } else {
        console.log(response)
        callback();
      }
    }
}


function example1() {
  console.log('\n\n=== Create a Collection ===');
  rockset.collections.create({
      'name': 'my-first-s3-collection',
      'description': 'my first s3 collection',
      'sources': [{'integration_name': 'my-first-integration',
                    's3': {'bucket': 'rockset-unittest-public'}}]
  }, function (error, response, body) {
      console.log(response);

  });
}


function done() {
  console.log('\n\n=== done ===');
}


example1()
