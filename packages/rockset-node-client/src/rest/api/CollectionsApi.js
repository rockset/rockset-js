(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CreateCollectionRequest', 'model/CreateCollectionResponse', 'model/DeleteCollectionResponse', 'model/GetCollectionResponse', 'model/ListCollectionsResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/CreateCollectionRequest'), require('../model/CreateCollectionResponse'), require('../model/DeleteCollectionResponse'), require('../model/GetCollectionResponse'), require('../model/ListCollectionsResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.CollectionsApi = factory(root.RestApi.ApiClient, root.RestApi.CreateCollectionRequest, root.RestApi.CreateCollectionResponse, root.RestApi.DeleteCollectionResponse, root.RestApi.GetCollectionResponse, root.RestApi.ListCollectionsResponse);
  }
}(this, function(ApiClient, CreateCollectionRequest, CreateCollectionResponse, DeleteCollectionResponse, GetCollectionResponse, ListCollectionsResponse) {
    'use strict';

  /**
   * Collections service.
   * @module api/CollectionsApi
   * @version v1
   */

  /**
   * Constructs a new CollectionsApi. 
   * @alias module:api/CollectionsApi
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
     * @callback module:api/CollectionsApi~createCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateCollectionResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create Collection
     * Create new collection in a workspace.
     * @param {String} workspace name of the workspace
     * @param {module:model/CreateCollectionRequest} body JSON object
     * @param {module:api/CollectionsApi~createCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateCollectionResponse}
     */
    this.create = function(workspace, body, callback) {
      var postBody = body;

      // verify the required parameter 'workspace' is set
      if (workspace === undefined || workspace === null) {
        throw new Error("Missing the required parameter 'workspace' when calling create");
      }

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling create");
      }


      var pathParams = {
        'workspace': workspace
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
      var returnType = CreateCollectionResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/ws/{workspace}/collections', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the get operation.
     * @callback module:api/CollectionsApi~getCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetCollectionResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Collection
     * Get details about a collection.
     * @param {String} workspace name of the workspace
     * @param {String} collection name of the collection
     * @param {module:api/CollectionsApi~getCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetCollectionResponse}
     */
    this.get = function(workspace, collection, callback) {
      var postBody = null;

      // verify the required parameter 'workspace' is set
      if (workspace === undefined || workspace === null) {
        throw new Error("Missing the required parameter 'workspace' when calling get");
      }

      // verify the required parameter 'collection' is set
      if (collection === undefined || collection === null) {
        throw new Error("Missing the required parameter 'collection' when calling get");
      }


      var pathParams = {
        'workspace': workspace,
        'collection': collection
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
      var returnType = GetCollectionResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/ws/{workspace}/collections/{collection}', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the list operation.
     * @callback module:api/CollectionsApi~listCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ListCollectionsResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List Collections
     * Retrieve all collections in a workspace.
     * @param {String} workspace name of the workspace
     * @param {module:api/CollectionsApi~listCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ListCollectionsResponse}
     */
    this.list = function(workspace, callback) {
      var postBody = null;

      // verify the required parameter 'workspace' is set
      if (workspace === undefined || workspace === null) {
        throw new Error("Missing the required parameter 'workspace' when calling list");
      }


      var pathParams = {
        'workspace': workspace
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
      var returnType = ListCollectionsResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/ws/{workspace}/collections', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the remove operation.
     * @callback module:api/CollectionsApi~removeCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DeleteCollectionResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete Collection
     * Delete a collection and all its documents from Rockset.
     * @param {String} workspace name of the workspace
     * @param {String} collection name of the collection
     * @param {module:api/CollectionsApi~removeCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/DeleteCollectionResponse}
     */
    this.remove = function(workspace, collection, callback) {
      var postBody = null;

      // verify the required parameter 'workspace' is set
      if (workspace === undefined || workspace === null) {
        throw new Error("Missing the required parameter 'workspace' when calling remove");
      }

      // verify the required parameter 'collection' is set
      if (collection === undefined || collection === null) {
        throw new Error("Missing the required parameter 'collection' when calling remove");
      }


      var pathParams = {
        'workspace': workspace,
        'collection': collection
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
      var returnType = DeleteCollectionResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/ws/{workspace}/collections/{collection}', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the set operation.
     * @callback module:api/CollectionsApi~setCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetCollectionResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update state of Collection
     * Update state of a collection.
     * @param {String} workspace name of the workspace
     * @param {String} collection name of the collection
     * @param {module:model/String} state new state of this collection
     * @param {module:api/CollectionsApi~setCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetCollectionResponse}
     */
    this.set = function(workspace, collection, state, callback) {
      var postBody = null;

      // verify the required parameter 'workspace' is set
      if (workspace === undefined || workspace === null) {
        throw new Error("Missing the required parameter 'workspace' when calling set");
      }

      // verify the required parameter 'collection' is set
      if (collection === undefined || collection === null) {
        throw new Error("Missing the required parameter 'collection' when calling set");
      }

      // verify the required parameter 'state' is set
      if (state === undefined || state === null) {
        throw new Error("Missing the required parameter 'state' when calling set");
      }


      var pathParams = {
        'workspace': workspace,
        'collection': collection,
        'state': state
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
      var returnType = GetCollectionResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/ws/{workspace}/collections/{collection}/state/{state}', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
