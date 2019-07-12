(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/Integration'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Integration'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.GetIntegrationResponse = factory(root.RestApi.ApiClient, root.RestApi.Integration);
  }
}(this, function(ApiClient, Integration) {
    'use strict';




  /**
   * The GetIntegrationResponse model module.
   * @module model/GetIntegrationResponse
   * @version v1
   */

  /**
   * Constructs a new <code>GetIntegrationResponse</code>.
   * @alias module:model/GetIntegrationResponse
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>GetIntegrationResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetIntegrationResponse} obj Optional instance to populate.
   * @return {module:model/GetIntegrationResponse} The populated <code>GetIntegrationResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('data')) {
        obj['data'] = Integration.constructFromObject(data['data']);
      }
    }
    return obj;
  }

  /**
   * integration object
   * @member {module:model/Integration} data
   */
  exports.prototype['data'] = undefined;



  return exports;
}));


