(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/SqlExpression'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./SqlExpression'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.OutputField = factory(root.RestApi.ApiClient, root.RestApi.SqlExpression);
  }
}(this, function(ApiClient, SqlExpression) {
    'use strict';




  /**
   * The OutputField model module.
   * @module model/OutputField
   * @version v1
   */

  /**
   * Constructs a new <code>OutputField</code>.
   * @alias module:model/OutputField
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>OutputField</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OutputField} obj Optional instance to populate.
   * @return {module:model/OutputField} The populated <code>OutputField</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('field_name')) {
        obj['field_name'] = ApiClient.convertToType(data['field_name'], 'String');
      }
      if (data.hasOwnProperty('value')) {
        obj['value'] = SqlExpression.constructFromObject(data['value']);
      }
      if (data.hasOwnProperty('on_error')) {
        obj['on_error'] = ApiClient.convertToType(data['on_error'], 'String');
      }
    }
    return obj;
  }

  /**
   * The name of a field, parsed as a SQL qualified name 
   * @member {String} field_name
   */
  exports.prototype['field_name'] = undefined;
  /**
   * The name of a sql function
   * @member {module:model/SqlExpression} value
   */
  exports.prototype['value'] = undefined;
  /**
   * Error in Mapping execution: 'skip' or 'fail' 
   * @member {module:model/OutputField.OnErrorEnum} on_error
   */
  exports.prototype['on_error'] = undefined;


  /**
   * Allowed values for the <code>on_error</code> property.
   * @enum {String}
   * @readonly
   */
  exports.OnErrorEnum = {
    /**
     * value: "SKIP"
     * @const
     */
    "SKIP": "SKIP",
    /**
     * value: "FAIL"
     * @const
     */
    "FAIL": "FAIL"  };


  return exports;
}));


