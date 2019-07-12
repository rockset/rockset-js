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
    root.RestApi.SourceDynamoDb = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The SourceDynamoDb model module.
   * @module model/SourceDynamoDb
   * @version v1
   */

  /**
   * Constructs a new <code>SourceDynamoDb</code>.
   * @alias module:model/SourceDynamoDb
   * @class
   * @param tableName {String} name of DynamoDB table containing data
   */
  var exports = function(tableName) {
    var _this = this;

    _this['table_name'] = tableName;

  };

  /**
   * Constructs a <code>SourceDynamoDb</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SourceDynamoDb} obj Optional instance to populate.
   * @return {module:model/SourceDynamoDb} The populated <code>SourceDynamoDb</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('table_name')) {
        obj['table_name'] = ApiClient.convertToType(data['table_name'], 'String');
      }
      if (data.hasOwnProperty('aws_region')) {
        obj['aws_region'] = ApiClient.convertToType(data['aws_region'], 'String');
      }
    }
    return obj;
  }

  /**
   * name of DynamoDB table containing data
   * @member {String} table_name
   */
  exports.prototype['table_name'] = undefined;
  /**
   * AWS region name of DynamoDB table, by default us-west-2 is used
   * @member {String} aws_region
   */
  exports.prototype['aws_region'] = undefined;



  return exports;
}));


