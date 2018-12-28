(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/OrganizationResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/OrganizationResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.OrganizationsApi = factory(root.RestApi.ApiClient, root.RestApi.OrganizationResponse);
  }
}(this, function(ApiClient, OrganizationResponse) {
    'use strict';

  /**
   * Organizations service.
   * @module api/OrganizationsApi
   * @version v1
   */

  /**
   * Constructs a new OrganizationsApi. 
   * @alias module:api/OrganizationsApi
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
     * Callback function to receive the result of the get operation.
     * @callback module:api/OrganizationsApi~getCallback
     * @param {String} error Error message, if any.
     * @param {module:model/OrganizationResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Organization
     * Retrieve information about current organization.
     * @param {module:api/OrganizationsApi~getCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/OrganizationResponse}
     */
    this.get = function(callback) {
      var postBody = null;


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
      var returnType = OrganizationResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
