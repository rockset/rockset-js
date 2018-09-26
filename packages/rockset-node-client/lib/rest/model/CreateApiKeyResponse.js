(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ApiKey'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ApiKey'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.CreateApiKeyResponse = factory(root.RestApi.ApiClient, root.RestApi.ApiKey);
  }
}(this, function(ApiClient, ApiKey) {
    'use strict';




  /**
   * The CreateApiKeyResponse model module.
   * @module model/CreateApiKeyResponse
   * @version v1
   */

  /**
   * Constructs a new <code>CreateApiKeyResponse</code>.
   * @alias module:model/CreateApiKeyResponse
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>CreateApiKeyResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CreateApiKeyResponse} obj Optional instance to populate.
   * @return {module:model/CreateApiKeyResponse} The populated <code>CreateApiKeyResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiKey.constructFromObject(data['data']);
      }
    }
    return obj;
  }

  /**
   * the API key that was created
   * @member {module:model/ApiKey} data
   */
  exports.prototype['data'] = undefined;



  return exports;
}));


