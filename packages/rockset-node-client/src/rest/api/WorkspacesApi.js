(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/CreateWorkspaceRequest', '../model/CreateWorkspaceResponse', '../model/DeleteWorkspaceResponse', '../model/GetWorkspaceResponse', '../model/ListWorkspacesResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/CreateWorkspaceRequest'), require('../model/CreateWorkspaceResponse'), require('../model/DeleteWorkspaceResponse'), require('../model/GetWorkspaceResponse'), require('../model/ListWorkspacesResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.WorkspacesApi = factory(root.RestApi.ApiClient, root.RestApi.CreateWorkspaceRequest, root.RestApi.CreateWorkspaceResponse, root.RestApi.DeleteWorkspaceResponse, root.RestApi.GetWorkspaceResponse, root.RestApi.ListWorkspacesResponse);
  }
}(this, function(ApiClient, CreateWorkspaceRequest, CreateWorkspaceResponse, DeleteWorkspaceResponse, GetWorkspaceResponse, ListWorkspacesResponse) {
    'use strict';

  /**
   * Workspaces service.
   * @module api/WorkspacesApi
   * @version v1
   */

  /**
   * Constructs a new WorkspacesApi. 
   * @alias module:api/WorkspacesApi
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
     * Callback function to receive the result of the child operation.
     * @callback module:api/WorkspacesApi~childCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ListWorkspacesResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List Workspaces
     * List workspaces under given workspace.
     * @param {String} workspace name of the workspace
     * @param {module:api/WorkspacesApi~childCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ListWorkspacesResponse}
     */
    this.child = function(workspace, callback) {
      var postBody = null;

      // verify the required parameter 'workspace' is set
      if (workspace === undefined || workspace === null) {
        throw new Error("Missing the required parameter 'workspace' when calling child");
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
      var returnType = ListWorkspacesResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/ws/{workspace}/ws', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the create operation.
     * @callback module:api/WorkspacesApi~createCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateWorkspaceResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create Workspace
     * Create a new workspace in your org.
     * @param {module:model/CreateWorkspaceRequest} body workspace details
     * @param {module:api/WorkspacesApi~createCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateWorkspaceResponse}
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
      var returnType = CreateWorkspaceResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/ws', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the get operation.
     * @callback module:api/WorkspacesApi~getCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetWorkspaceResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Workspace
     * Get information about a single workspace.
     * @param {String} workspace name of the workspace
     * @param {module:api/WorkspacesApi~getCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetWorkspaceResponse}
     */
    this.get = function(workspace, callback) {
      var postBody = null;

      // verify the required parameter 'workspace' is set
      if (workspace === undefined || workspace === null) {
        throw new Error("Missing the required parameter 'workspace' when calling get");
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
      var returnType = GetWorkspaceResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/ws/{workspace}', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the list operation.
     * @callback module:api/WorkspacesApi~listCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ListWorkspacesResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List Workspaces
     * List all workspaces.
     * @param {module:api/WorkspacesApi~listCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ListWorkspacesResponse}
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
      var returnType = ListWorkspacesResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/ws', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the remove operation.
     * @callback module:api/WorkspacesApi~removeCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DeleteWorkspaceResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete Workspace
     * Remove a workspace.
     * @param {String} workspace name of the workspace
     * @param {module:api/WorkspacesApi~removeCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/DeleteWorkspaceResponse}
     */
    this.remove = function(workspace, callback) {
      var postBody = null;

      // verify the required parameter 'workspace' is set
      if (workspace === undefined || workspace === null) {
        throw new Error("Missing the required parameter 'workspace' when calling remove");
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
      var returnType = DeleteWorkspaceResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/ws/{workspace}', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
