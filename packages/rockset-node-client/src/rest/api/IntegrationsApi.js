(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/CreateIntegrationRequest', '../model/CreateIntegrationResponse', '../model/DeleteIntegrationResponse', '../model/GetIntegrationResponse', '../model/ListIntegrationsResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/CreateIntegrationRequest'), require('../model/CreateIntegrationResponse'), require('../model/DeleteIntegrationResponse'), require('../model/GetIntegrationResponse'), require('../model/ListIntegrationsResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.IntegrationsApi = factory(root.RestApi.ApiClient, root.RestApi.CreateIntegrationRequest, root.RestApi.CreateIntegrationResponse, root.RestApi.DeleteIntegrationResponse, root.RestApi.GetIntegrationResponse, root.RestApi.ListIntegrationsResponse);
  }
}(this, function(ApiClient, CreateIntegrationRequest, CreateIntegrationResponse, DeleteIntegrationResponse, GetIntegrationResponse, ListIntegrationsResponse) {
    'use strict';

  /**
   * Integrations service.
   * @module api/IntegrationsApi
   * @version v1
   */

  /**
   * Constructs a new IntegrationsApi. 
   * @alias module:api/IntegrationsApi
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
     * Callback function to receive the result of the create operation.
     * @callback module:api/IntegrationsApi~createCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateIntegrationResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create Integration
     * Create a new integration with Rockset.
     * @param {module:model/CreateIntegrationRequest} body integration credentials
     * @param {module:api/IntegrationsApi~createCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateIntegrationResponse}
     */
    this.create = function(body, callback) {
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling create");
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
      var returnType = CreateIntegrationResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/integrations', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the get operation.
     * @callback module:api/IntegrationsApi~getCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetIntegrationResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Integration
     * Get information about a single integration.
     * @param {String} integration name of the integration
     * @param {module:api/IntegrationsApi~getCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetIntegrationResponse}
     */
    this.get = function(integration, callback) {
      var postBody = null;

      // verify the required parameter 'integration' is set
      if (integration === undefined || integration === null) {
        throw new Error("Missing the required parameter 'integration' when calling get");
      }


      var pathParams = {
        'integration': integration
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
      var returnType = GetIntegrationResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/integrations/{integration}', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the list operation.
     * @callback module:api/IntegrationsApi~listCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ListIntegrationsResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List Integrations
     * List all integrations for organization.
     * @param {module:api/IntegrationsApi~listCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ListIntegrationsResponse}
     */
    this.list = function(callback) {
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
      var returnType = ListIntegrationsResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/integrations', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the remove operation.
     * @callback module:api/IntegrationsApi~removeCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DeleteIntegrationResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete Integration
     * Remove an integration.
     * @param {String} integration name of the integration
     * @param {module:api/IntegrationsApi~removeCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/DeleteIntegrationResponse}
     */
    this.remove = function(integration, callback) {
      var postBody = null;

      // verify the required parameter 'integration' is set
      if (integration === undefined || integration === null) {
        throw new Error("Missing the required parameter 'integration' when calling remove");
      }


      var pathParams = {
        'integration': integration
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
      var returnType = DeleteIntegrationResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/integrations/{integration}', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
