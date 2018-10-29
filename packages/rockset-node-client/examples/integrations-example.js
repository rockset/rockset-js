var apiKey = process.env.ROCKSET_APIKEY;
var apiServer = process.env.ROCKSET_APISERVER;
var rockset = require('../src/rockset')(apiKey, apiServer);


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
  console.log('\n\n=== List Integration ===');
  rockset.integrations.list(getResponseLogger(example2));
}


function example2() {
  console.log('\n\n=== Create an Integration ===');
  rockset.integrations.create({
    'name': 'myintegration',
    'aws': {
        'aws_access_key_id': '....',
        'aws_secret_access_key': '....'
    }
  }, getResponseLogger(example3))
}


function example3() {
  console.log('\n\n=== Delete the integration ===');
  rockset.integrations.remove('myintegration', getResponseLogger(done));
}

function done() {
  console.log('\n\n=== done ===');
}


example1()
