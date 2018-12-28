(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/AddDocumentsRequest', 'model/AddDocumentsResponse', 'model/DeleteDocumentsRequest', 'model/DeleteDocumentsResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/AddDocumentsRequest'), require('../model/AddDocumentsResponse'), require('../model/DeleteDocumentsRequest'), require('../model/DeleteDocumentsResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.DocumentsApi = factory(root.RestApi.ApiClient, root.RestApi.AddDocumentsRequest, root.RestApi.AddDocumentsResponse, root.RestApi.DeleteDocumentsRequest, root.RestApi.DeleteDocumentsResponse);
  }
}(this, function(ApiClient, AddDocumentsRequest, AddDocumentsResponse, DeleteDocumentsRequest, DeleteDocumentsResponse) {
    'use strict';

  /**
   * Documents service.
   * @module api/DocumentsApi
   * @version v1
   */

  /**
   * Constructs a new DocumentsApi. 
   * @alias module:api/DocumentsApi
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
     * Callback function to receive the result of the add operation.
     * @callback module:api/DocumentsApi~addCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AddDocumentsResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add Documents
     * Add documents to a collection in Rockset.
     * @param {String} collection name of the collection
     * @param {module:model/AddDocumentsRequest} body JSON object
     * @param {module:api/DocumentsApi~addCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AddDocumentsResponse}
     */
    this.add = function(collection, body, callback) {
      var postBody = body;

      // verify the required parameter 'collection' is set
      if (collection === undefined || collection === null) {
        throw new Error("Missing the required parameter 'collection' when calling add");
      }

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling add");
      }


      var pathParams = {
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
      var returnType = AddDocumentsResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/ws/commons/collections/{collection}/docs', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the remove operation.
     * @callback module:api/DocumentsApi~removeCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DeleteDocumentsResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete Documents
     * Delete documents from a collection in Rockset.
     * @param {String} collection name of the collection
     * @param {module:model/DeleteDocumentsRequest} body JSON object
     * @param {module:api/DocumentsApi~removeCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/DeleteDocumentsResponse}
     */
    this.remove = function(collection, body, callback) {
      var postBody = body;

      // verify the required parameter 'collection' is set
      if (collection === undefined || collection === null) {
        throw new Error("Missing the required parameter 'collection' when calling remove");
      }

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling remove");
      }


      var pathParams = {
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
      var returnType = DeleteDocumentsResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/ws/commons/collections/{collection}/docs', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
