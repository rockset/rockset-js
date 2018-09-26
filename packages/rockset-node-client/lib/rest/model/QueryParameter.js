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
    root.RestApi.QueryParameter = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The QueryParameter model module.
   * @module model/QueryParameter
   * @version v1
   */

  /**
   * Constructs a new <code>QueryParameter</code>.
   * @alias module:model/QueryParameter
   * @class
   * @param name {String} name of the field
   * @param type {String} data type of the field
   * @param value {String} literal value of the field
   */
  var exports = function(name, type, value) {
    var _this = this;

    _this['name'] = name;
    _this['type'] = type;
    _this['value'] = value;
  };

  /**
   * Constructs a <code>QueryParameter</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/QueryParameter} obj Optional instance to populate.
   * @return {module:model/QueryParameter} The populated <code>QueryParameter</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
      if (data.hasOwnProperty('value')) {
        obj['value'] = ApiClient.convertToType(data['value'], 'String');
      }
    }
    return obj;
  }

  /**
   * name of the field
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * data type of the field
   * @member {String} type
   */
  exports.prototype['type'] = undefined;
  /**
   * literal value of the field
   * @member {String} value
   */
  exports.prototype['value'] = undefined;



  return exports;
}));


