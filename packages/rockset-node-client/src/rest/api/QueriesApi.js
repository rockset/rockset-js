(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/QueryRequest', 'model/QueryResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/QueryRequest'), require('../model/QueryResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.QueriesApi = factory(root.RestApi.ApiClient, root.RestApi.QueryRequest, root.RestApi.QueryResponse);
  }
}(this, function(ApiClient, QueryRequest, QueryResponse) {
    'use strict';

  /**
   * Queries service.
   * @module api/QueriesApi
   * @version v1
   */

  /**
   * Constructs a new QueriesApi. 
   * @alias module:api/QueriesApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    if (apiClient === undefined || apiClient === null) {
      throw new Error("Missing required argument 'apiClient'");
    }
    this.apiClient = apiClient;


    /**
     * Callback function to receive the result of the query operation.
     * @callback module:api/QueriesApi~queryCallback
     * @param {String} error Error message, if any.
     * @param {module:model/QueryResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Query
     * Make a SQL query to Rockset.
     * @param {module:model/QueryRequest} body JSON object
     * @param {module:api/QueriesApi~queryCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/QueryResponse}
     */
    this.query = function(body, callback) {
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling query");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = QueryResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/queries', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
