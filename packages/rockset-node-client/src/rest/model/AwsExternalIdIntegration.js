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
    root.RestApi.AwsExternalIdIntegration = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The AwsExternalIdIntegration model module.
   * @module model/AwsExternalIdIntegration
   * @version v1
   */

  /**
   * Constructs a new <code>AwsExternalIdIntegration</code>.
   * @alias module:model/AwsExternalIdIntegration
   * @class
   * @param awsRoleArn {String} ARN of rockset-role created in your account
   */
  var exports = function(awsRoleArn) {
    var _this = this;

    _this['aws_role_arn'] = awsRoleArn;


  };

  /**
   * Constructs a <code>AwsExternalIdIntegration</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AwsExternalIdIntegration} obj Optional instance to populate.
   * @return {module:model/AwsExternalIdIntegration} The populated <code>AwsExternalIdIntegration</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('aws_role_arn')) {
        obj['aws_role_arn'] = ApiClient.convertToType(data['aws_role_arn'], 'String');
      }
      if (data.hasOwnProperty('aws_external_id')) {
        obj['aws_external_id'] = ApiClient.convertToType(data['aws_external_id'], 'String');
      }
      if (data.hasOwnProperty('rockset_iam_user')) {
        obj['rockset_iam_user'] = ApiClient.convertToType(data['rockset_iam_user'], 'String');
      }
    }
    return obj;
  }

  /**
   * ARN of rockset-role created in your account
   * @member {String} aws_role_arn
   */
  exports.prototype['aws_role_arn'] = undefined;
  /**
   * @member {String} aws_external_id
   */
  exports.prototype['aws_external_id'] = undefined;
  /**
   * @member {String} rockset_iam_user
   */
  exports.prototype['rockset_iam_user'] = undefined;



  return exports;
}));


