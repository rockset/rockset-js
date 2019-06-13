(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CreateUserRequest', 'model/CreateUserResponse', 'model/DeleteUserResponse', 'model/ListUsersResponse', 'model/User'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/CreateUserRequest'), require('../model/CreateUserResponse'), require('../model/DeleteUserResponse'), require('../model/ListUsersResponse'), require('../model/User'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.UsersApi = factory(root.RestApi.ApiClient, root.RestApi.CreateUserRequest, root.RestApi.CreateUserResponse, root.RestApi.DeleteUserResponse, root.RestApi.ListUsersResponse, root.RestApi.User);
  }
}(this, function(ApiClient, CreateUserRequest, CreateUserResponse, DeleteUserResponse, ListUsersResponse, User) {
    'use strict';

  /**
   * Users service.
   * @module api/UsersApi
   * @version v1
   */

  /**
   * Constructs a new UsersApi. 
   * @alias module:api/UsersApi
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
     * @callback module:api/UsersApi~createCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CreateUserResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create User
     * Create a new user for an organization.
     * @param {module:model/CreateUserRequest} body JSON object
     * @param {module:api/UsersApi~createCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CreateUserResponse}
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
      var returnType = CreateUserResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/users', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the get operation.
     * @callback module:api/UsersApi~getCallback
     * @param {String} error Error message, if any.
     * @param {module:model/User} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Current User
     * Retrieve currently active user.
     * @param {module:api/UsersApi~getCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/User}
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
      var returnType = User;

      return this.apiClient.callApi(
        '/v1/orgs/self/users/self', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the list operation.
     * @callback module:api/UsersApi~listCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ListUsersResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List Users
     * Retrieve all users for an organization.
     * @param {module:api/UsersApi~listCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ListUsersResponse}
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
      var returnType = ListUsersResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/users', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the remove operation.
     * @callback module:api/UsersApi~removeCallback
     * @param {String} error Error message, if any.
     * @param {module:model/DeleteUserResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete User
     * Delete a user from an organization.
     * @param {String} user user email
     * @param {module:api/UsersApi~removeCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/DeleteUserResponse}
     */
    this.remove = function(user, callback) {
      var postBody = null;

      // verify the required parameter 'user' is set
      if (user === undefined || user === null) {
        throw new Error("Missing the required parameter 'user' when calling remove");
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
      var returnType = DeleteUserResponse;

      return this.apiClient.callApi(
        '/v1/orgs/self/users/{user}', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
