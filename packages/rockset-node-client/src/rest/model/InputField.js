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
    root.RestApi.InputField = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The InputField model module.
   * @module model/InputField
   * @version v1
   */

  /**
   * Constructs a new <code>InputField</code>.
   * @alias module:model/InputField
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>InputField</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/InputField} obj Optional instance to populate.
   * @return {module:model/InputField} The populated <code>InputField</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('field_name')) {
        obj['field_name'] = ApiClient.convertToType(data['field_name'], 'String');
      }
      if (data.hasOwnProperty('if_missing')) {
        obj['if_missing'] = ApiClient.convertToType(data['if_missing'], 'String');
      }
      if (data.hasOwnProperty('is_drop')) {
        obj['is_drop'] = ApiClient.convertToType(data['is_drop'], 'Boolean');
      }
      if (data.hasOwnProperty('param')) {
        obj['param'] = ApiClient.convertToType(data['param'], 'String');
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
   * Define the behaviour if fieldName is missing or is null
   * @member {module:model/InputField.IfMissingEnum} if_missing
   */
  exports.prototype['if_missing'] = undefined;
  /**
   * If true, then drop fieldName from the document
   * @member {Boolean} is_drop
   */
  exports.prototype['is_drop'] = undefined;
  /**
   * Sql parameter name
   * @member {String} param
   */
  exports.prototype['param'] = undefined;


  /**
   * Allowed values for the <code>if_missing</code> property.
   * @enum {String}
   * @readonly
   */
  exports.IfMissingEnum = {
    /**
     * value: "SKIP"
     * @const
     */
    "SKIP": "SKIP",
    /**
     * value: "PASS"
     * @const
     */
    "PASS": "PASS"  };


  return exports;
}));


