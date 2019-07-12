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
    root.RestApi.CreateApiKeyRequest = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The CreateApiKeyRequest model module.
   * @module model/CreateApiKeyRequest
   * @version v1
   */

  /**
   * Constructs a new <code>CreateApiKeyRequest</code>.
   * @alias module:model/CreateApiKeyRequest
   * @class
   * @param name {String} descriptive label
   */
  var exports = function(name) {
    var _this = this;

    _this['name'] = name;
  };

  /**
   * Constructs a <code>CreateApiKeyRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CreateApiKeyRequest} obj Optional instance to populate.
   * @return {module:model/CreateApiKeyRequest} The populated <code>CreateApiKeyRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
    }
    return obj;
  }

  /**
   * descriptive label
   * @member {String} name
   */
  exports.prototype['name'] = undefined;



  return exports;
}));


