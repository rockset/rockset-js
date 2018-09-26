(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Integration'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Integration'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.CreateIntegrationResponse = factory(root.RestApi.ApiClient, root.RestApi.Integration);
  }
}(this, function(ApiClient, Integration) {
    'use strict';




  /**
   * The CreateIntegrationResponse model module.
   * @module model/CreateIntegrationResponse
   * @version v1
   */

  /**
   * Constructs a new <code>CreateIntegrationResponse</code>.
   * @alias module:model/CreateIntegrationResponse
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>CreateIntegrationResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CreateIntegrationResponse} obj Optional instance to populate.
   * @return {module:model/CreateIntegrationResponse} The populated <code>CreateIntegrationResponse</code> instance.
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
   * integration object that was created
   * @member {module:model/Integration} data
   */
  exports.prototype['data'] = undefined;



  return exports;
}));


