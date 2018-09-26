var apiKey = process.env.API_KEY;
var rockset = require('../lib/rockset')(apiKey);


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
        'query': 'select * from \"_info.events\" limit 1'
    }
  }, null, getResponseLogger(done))
}

function done() {
  console.log('\n\n=== done ===');
}


example1()
