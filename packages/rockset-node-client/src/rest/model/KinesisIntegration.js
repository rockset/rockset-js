(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/AwsAccessKey', '../model/AwsRole'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./AwsAccessKey'), require('./AwsRole'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.KinesisIntegration = factory(root.RestApi.ApiClient, root.RestApi.AwsAccessKey, root.RestApi.AwsRole);
  }
}(this, function(ApiClient, AwsAccessKey, AwsRole) {
    'use strict';




  /**
   * The KinesisIntegration model module.
   * @module model/KinesisIntegration
   * @version v1
   */

  /**
   * Constructs a new <code>KinesisIntegration</code>.
   * @alias module:model/KinesisIntegration
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>KinesisIntegration</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/KinesisIntegration} obj Optional instance to populate.
   * @return {module:model/KinesisIntegration} The populated <code>KinesisIntegration</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('aws_role')) {
        obj['aws_role'] = AwsRole.constructFromObject(data['aws_role']);
      }
      if (data.hasOwnProperty('aws_access_key')) {
        obj['aws_access_key'] = AwsAccessKey.constructFromObject(data['aws_access_key']);
      }
    }
    return obj;
  }

  /**
   * details of an AWS cross-account role integration
   * @member {module:model/AwsRole} aws_role
   */
  exports.prototype['aws_role'] = undefined;
  /**
   * credentials for an AWS access key integration
   * @member {module:model/AwsAccessKey} aws_access_key
   */
  exports.prototype['aws_access_key'] = undefined;



  return exports;
}));


