(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.CreateWorkspaceRequest = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The CreateWorkspaceRequest model module.
   * @module model/CreateWorkspaceRequest
   * @version v1
   */

  /**
   * Constructs a new <code>CreateWorkspaceRequest</code>.
   * @alias module:model/CreateWorkspaceRequest
   * @class
   * @param name {String} descriptive label and unique identifier
   */
  var exports = function(name) {
    var _this = this;

    _this['name'] = name;

  };

  /**
   * Constructs a <code>CreateWorkspaceRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CreateWorkspaceRequest} obj Optional instance to populate.
   * @return {module:model/CreateWorkspaceRequest} The populated <code>CreateWorkspaceRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
    }
    return obj;
  }

  /**
   * descriptive label and unique identifier
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * longer explanation for the workspace
   * @member {String} description
   */
  exports.prototype['description'] = undefined;



  return exports;
}));


