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
  console.log('\n\n=== Query Collection ===');
  rockset.queries.query({
    'sql': {
        'query': 'select * from \"_events\" limit 1'
    }
  }, null, getResponseLogger(done))
}

function done() {
  console.log('\n\n=== done ===');
}


example1()
