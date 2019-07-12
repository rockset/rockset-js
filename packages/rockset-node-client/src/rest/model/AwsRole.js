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
    root.RestApi.AwsRole = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The AwsRole model module.
   * @module model/AwsRole
   * @version v1
   */

  /**
   * Constructs a new <code>AwsRole</code>.
   * @alias module:model/AwsRole
   * @class
   * @param awsRoleArn {String} ARN of rockset-role created in your account
   */
  var exports = function(awsRoleArn) {
    var _this = this;

    _this['aws_role_arn'] = awsRoleArn;
  };

  /**
   * Constructs a <code>AwsRole</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AwsRole} obj Optional instance to populate.
   * @return {module:model/AwsRole} The populated <code>AwsRole</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('aws_role_arn')) {
        obj['aws_role_arn'] = ApiClient.convertToType(data['aws_role_arn'], 'String');
      }
    }
    return obj;
  }

  /**
   * ARN of rockset-role created in your account
   * @member {String} aws_role_arn
   */
  exports.prototype['aws_role_arn'] = undefined;



  return exports;
}));


