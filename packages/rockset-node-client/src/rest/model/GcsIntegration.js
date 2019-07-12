(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/GcpServiceAccount'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./GcpServiceAccount'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.GcsIntegration = factory(root.RestApi.ApiClient, root.RestApi.GcpServiceAccount);
  }
}(this, function(ApiClient, GcpServiceAccount) {
    'use strict';




  /**
   * The GcsIntegration model module.
   * @module model/GcsIntegration
   * @version v1
   */

  /**
   * Constructs a new <code>GcsIntegration</code>.
   * @alias module:model/GcsIntegration
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>GcsIntegration</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GcsIntegration} obj Optional instance to populate.
   * @return {module:model/GcsIntegration} The populated <code>GcsIntegration</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('gcp_service_account')) {
        obj['gcp_service_account'] = GcpServiceAccount.constructFromObject(data['gcp_service_account']);
      }
    }
    return obj;
  }

  /**
   * credentials for an AWS key integration
   * @member {module:model/GcpServiceAccount} gcp_service_account
   */
  exports.prototype['gcp_service_account'] = undefined;



  return exports;
}));


