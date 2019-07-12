(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/AwsAccessKey'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./AwsAccessKey'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.DynamodbIntegration = factory(root.RestApi.ApiClient, root.RestApi.AwsAccessKey);
  }
}(this, function(ApiClient, AwsAccessKey) {
    'use strict';




  /**
   * The DynamodbIntegration model module.
   * @module model/DynamodbIntegration
   * @version v1
   */

  /**
   * Constructs a new <code>DynamodbIntegration</code>.
   * @alias module:model/DynamodbIntegration
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>DynamodbIntegration</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/DynamodbIntegration} obj Optional instance to populate.
   * @return {module:model/DynamodbIntegration} The populated <code>DynamodbIntegration</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('aws_access_key')) {
        obj['aws_access_key'] = AwsAccessKey.constructFromObject(data['aws_access_key']);
      }
    }
    return obj;
  }

  /**
   * credentials for an AWS access key integration
   * @member {module:model/AwsAccessKey} aws_access_key
   */
  exports.prototype['aws_access_key'] = undefined;



  return exports;
}));


