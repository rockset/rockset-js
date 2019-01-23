(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.GcpServiceAccount = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The GcpServiceAccount model module.
   * @module model/GcpServiceAccount
   * @version v1
   */

  /**
   * Constructs a new <code>GcpServiceAccount</code>.
   * @alias module:model/GcpServiceAccount
   * @class
   * @param serviceAccountKeyFileJson {String} Contents of JSON Service Account key file
   */
  var exports = function(serviceAccountKeyFileJson) {
    var _this = this;

    _this['service_account_key_file_json'] = serviceAccountKeyFileJson;
  };

  /**
   * Constructs a <code>GcpServiceAccount</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GcpServiceAccount} obj Optional instance to populate.
   * @return {module:model/GcpServiceAccount} The populated <code>GcpServiceAccount</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('service_account_key_file_json')) {
        obj['service_account_key_file_json'] = ApiClient.convertToType(data['service_account_key_file_json'], 'String');
      }
    }
    return obj;
  }

  /**
   * Contents of JSON Service Account key file
   * @member {String} service_account_key_file_json
   */
  exports.prototype['service_account_key_file_json'] = undefined;



  return exports;
}));


