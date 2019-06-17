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
    root.RestApi.AwsAccessKey = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The AwsAccessKey model module.
   * @module model/AwsAccessKey
   * @version v1
   */

  /**
   * Constructs a new <code>AwsAccessKey</code>.
   * @alias module:model/AwsAccessKey
   * @class
   * @param awsAccessKeyId {String} AWS access key ID
   * @param awsSecretAccessKey {String} AWS secret access key
   */
  var exports = function(awsAccessKeyId, awsSecretAccessKey) {
    var _this = this;

    _this['aws_access_key_id'] = awsAccessKeyId;
    _this['aws_secret_access_key'] = awsSecretAccessKey;
  };

  /**
   * Constructs a <code>AwsAccessKey</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AwsAccessKey} obj Optional instance to populate.
   * @return {module:model/AwsAccessKey} The populated <code>AwsAccessKey</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('aws_access_key_id')) {
        obj['aws_access_key_id'] = ApiClient.convertToType(data['aws_access_key_id'], 'String');
      }
      if (data.hasOwnProperty('aws_secret_access_key')) {
        obj['aws_secret_access_key'] = ApiClient.convertToType(data['aws_secret_access_key'], 'String');
      }
    }
    return obj;
  }

  /**
   * AWS access key ID
   * @member {String} aws_access_key_id
   */
  exports.prototype['aws_access_key_id'] = undefined;
  /**
   * AWS secret access key
   * @member {String} aws_secret_access_key
   */
  exports.prototype['aws_secret_access_key'] = undefined;



  return exports;
}));


