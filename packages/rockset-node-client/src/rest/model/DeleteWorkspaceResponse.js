(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/Workspace'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Workspace'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.DeleteWorkspaceResponse = factory(root.RestApi.ApiClient, root.RestApi.Workspace);
  }
}(this, function(ApiClient, Workspace) {
    'use strict';




  /**
   * The DeleteWorkspaceResponse model module.
   * @module model/DeleteWorkspaceResponse
   * @version v1
   */

  /**
   * Constructs a new <code>DeleteWorkspaceResponse</code>.
   * @alias module:model/DeleteWorkspaceResponse
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>DeleteWorkspaceResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/DeleteWorkspaceResponse} obj Optional instance to populate.
   * @return {module:model/DeleteWorkspaceResponse} The populated <code>DeleteWorkspaceResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('data')) {
        obj['data'] = Workspace.constructFromObject(data['data']);
      }
    }
    return obj;
  }

  /**
   * the workspace that was deleted
   * @member {module:model/Workspace} data
   */
  exports.prototype['data'] = undefined;



  return exports;
}));


