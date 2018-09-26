var apiKey = process.env.API_KEY;
var rockset = require('../lib/rockset')(apiKey);

rockset.apiKeys.list(function (error, response, body) {
  console.log(response);
});
