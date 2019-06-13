var apiKey = process.env.ROCKSET_APIKEY;
var apiServer = process.env.ROCKSET_APISERVER;
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
  console.log('\n\n=== List Collections ===');
  rockset.collections.list(getResponseLogger(example2));
}


function example2() {
  console.log('\n\n=== Create a Collection ===');
  rockset.collections.create('commons', {
    'name': 'mycollection'
  }, getResponseLogger(example3))
}


function example3() {
  console.log('\n\n=== Delete the collection ===');
  rockset.collections.remove('commons', 'mycollection', getResponseLogger(done));
}

function done() {
  console.log('\n\n=== done ===');
}


example1()
