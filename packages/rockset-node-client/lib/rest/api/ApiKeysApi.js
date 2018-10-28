(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CreateApiKeyRequest', 'model/CreateApiKeyResponse', 'model/DeleteApiKeyResponse', 'model/ListApiKeysResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/CreateApiKeyRequest'), require('../model/CreateApiKeyResponse'), require('../model/DeleteApiKeyResponse'), require('../model/ListApiKeysResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.ApiKeysApi = factory(root.RestApi.ApiClient, root.RestApi.CreateApiKeyRequest, root.RestApi.CreateApiKeyResponse, root.RestApi.DeleteApiKeyResponse, root.RestApi.ListApiKeysResponse);
  }
}(this, function(ApiClient, CreateApiKeyRequest, CreateApiKeyResponse, DeleteApiKeyResponse, ListApiKeysResponse) {
    'use strict';

  /**
   * ApiKeys service.
   * @module api/ApiKeysApi
   * @version v1
   */

  /**
   * Constructs a new ApiKeysApi. 
   * @alias module:api/ApiKeysApi
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
     * @callback module:api/ApiKeysApi~createCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateApiKeyResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create API Key
     * Create a new API key for the authenticated user.
     * @param {module:model/CreateApiKeyRequest} body JSON object
     * @param {module:api/ApiKeysApi~createCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateApiKeyResponse}
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
      var returnType = CreateApiKeyResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/users/self/apikeys', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the create_0 operation.
     * @callback module:api/ApiKeysApi~create_0Callback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateApiKeyResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create API Key for any user (admin only)
     * Create a new API key for any user (admin only).
     * @param {module:model/CreateApiKeyRequest} body JSON object
     * @param {String} user 
     * @param {module:api/ApiKeysApi~create_0Callback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateApiKeyResponse}
     */
    this.create_0 = function(body, user, callback) {
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling create_0");
      }

      // verify the required parameter 'user' is set
      if (user === undefined || user === null) {
        throw new Error("Missing the required parameter 'user' when calling create_0");
      }


      var pathParams = {
        'user': user
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
      var returnType = CreateApiKeyResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/users/{user}/apikeys', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the list operation.
     * @callback module:api/ApiKeysApi~listCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ListApiKeysResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List API Keys
     * List all API keys for the authenticated user.
     * @param {module:api/ApiKeysApi~listCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ListApiKeysResponse}
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
      var returnType = ListApiKeysResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/users/self/apikeys', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the list_0 operation.
     * @callback module:api/ApiKeysApi~list_0Callback
     * @param {String} error Error message, if any.
     * @param {module:model/ListApiKeysResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List API Keys for any user (admin only)
     * List all API keys for any user (admin only).
     * @param {String} user 
     * @param {module:api/ApiKeysApi~list_0Callback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ListApiKeysResponse}
     */
    this.list_0 = function(user, callback) {
      var postBody = null;

      // verify the required parameter 'user' is set
      if (user === undefined || user === null) {
        throw new Error("Missing the required parameter 'user' when calling list_0");
      }


      var pathParams = {
        'user': user
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
      var returnType = ListApiKeysResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/users/{user}/apikeys', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the remove operation.
     * @callback module:api/ApiKeysApi~removeCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DeleteApiKeyResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete API Key
     * Delete an API key for the authenticated user.
     * @param {String} name name of the API key
     * @param {module:api/ApiKeysApi~removeCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/DeleteApiKeyResponse}
     */
    this.remove = function(name, callback) {
      var postBody = null;

      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling remove");
      }


      var pathParams = {
        'name': name
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
      var returnType = DeleteApiKeyResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/users/self/apikeys/{name}', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the remove_0 operation.
     * @callback module:api/ApiKeysApi~remove_0Callback
     * @param {String} error Error message, if any.
     * @param {module:model/DeleteApiKeyResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete API Key for any user (admin only)
     * Delete an API key for any user (admin only).
     * @param {String} name name of the API key
     * @param {String} user 
     * @param {module:api/ApiKeysApi~remove_0Callback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/DeleteApiKeyResponse}
     */
    this.remove_0 = function(name, user, callback) {
      var postBody = null;

      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling remove_0");
      }

      // verify the required parameter 'user' is set
      if (user === undefined || user === null) {
        throw new Error("Missing the required parameter 'user' when calling remove_0");
      }


      var pathParams = {
        'name': name,
        'user': user
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
      var returnType = DeleteApiKeyResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/users/{user}/apikeys/{name}', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
