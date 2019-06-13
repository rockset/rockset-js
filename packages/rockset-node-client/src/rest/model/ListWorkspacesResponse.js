(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Workspace'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Workspace'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.ListWorkspacesResponse = factory(root.RestApi.ApiClient, root.RestApi.Workspace);
  }
}(this, function(ApiClient, Workspace) {
    'use strict';




  /**
   * The ListWorkspacesResponse model module.
   * @module model/ListWorkspacesResponse
   * @version v1
   */

  /**
   * Constructs a new <code>ListWorkspacesResponse</code>.
   * @alias module:model/ListWorkspacesResponse
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>ListWorkspacesResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ListWorkspacesResponse} obj Optional instance to populate.
   * @return {module:model/ListWorkspacesResponse} The populated <code>ListWorkspacesResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [Workspace]);
      }
    }
    return obj;
  }

  /**
   * list of workspaces
   * @member {Array.<module:model/Workspace>} data
   */
  exports.prototype['data'] = undefined;



  return exports;
}));


