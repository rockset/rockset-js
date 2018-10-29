(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Organization', 'model/Response'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/Organization'), require('../model/Response'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.OrganizationsApi = factory(root.RestApi.ApiClient, root.RestApi.Organization, root.RestApi.Response);
  }
}(this, function(ApiClient, Organization, Response) {
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
     * @param {module:model/Organization} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Current Organization
     * Get information about current organization.
     * @param {module:api/OrganizationsApi~getCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Organization}
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
      var returnType = Organization;

      return this.apiClient.callApi(
        '/v1/orgs/self', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the get_0 operation.
     * @callback module:api/OrganizationsApi~get_0Callback
     * @param {String} error Error message, if any.
     * @param {module:model/Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve billing information
     * Get stored billing information for your organization.
     * @param {module:api/OrganizationsApi~get_0Callback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Response}
     */
    this.get_0 = function(callback) {
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
      var returnType = Response;

      return this.apiClient.callApi(
        '/v1/orgs/self/billing', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the get_1 operation.
     * @callback module:api/OrganizationsApi~get_1Callback
     * @param {String} error Error message, if any.
     * @param {module:model/Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve Data Limits
     * Get the current data limits for your organization.
     * @param {module:api/OrganizationsApi~get_1Callback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Response}
     */
    this.get_1 = function(callback) {
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
      var returnType = Response;

      return this.apiClient.callApi(
        '/v1/orgs/self/limits', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the get_2 operation.
     * @callback module:api/OrganizationsApi~get_2Callback
     * @param {String} error Error message, if any.
     * @param {module:model/Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve Usage Information
     * Get ingestion metrics for your collections over time.
     * @param {Object} opts Optional parameters
     * @param {String} opts.start usage window start (ISO format)
     * @param {String} opts.end usage window end (ISO format)
     * @param {module:api/OrganizationsApi~get_2Callback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Response}
     */
    this.get_2 = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'start': opts['start'],
        'end': opts['end'],
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
      var returnType = Response;

      return this.apiClient.callApi(
        '/v1/orgs/self/stats', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
