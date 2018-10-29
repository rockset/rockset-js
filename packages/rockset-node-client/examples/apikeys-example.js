var apiKey = process.env.ROCKSET_APIKEY;
var apiServer = process.env.ROCKSET_APISERVER;
var rockset = require('../src/rockset')(apiKey, apiServer);


var getResponseLogger = function (callback) {
  return function (error, response, body) {
      if (error) {
        console.log(error.response.error.text);
        callback();
      } else {
        console.log(response);
        callback();
      }
    }
}


function example1() {
  console.log('\n\n=== List API keys ===');
  rockset.apiKeys.list(getResponseLogger(example2));
}


function example2() {
  console.log('\n\n=== Create an API key ===');
  rockset.apiKeys.create({
    'name': 'myapikey'
  }, getResponseLogger(example3))
}


function example3() {
  console.log('\n\n=== Create an API key that already exists ===');
  rockset.apiKeys.create({
    'name': 'myapikey'
  }, getResponseLogger(example4))
}


function example4() {
  console.log('\n\n=== Delete the API key ===');
  rockset.apiKeys.remove('myapikey', getResponseLogger(done));
}

function done() {
  console.log('\n\n=== done ===');
}


example1()
