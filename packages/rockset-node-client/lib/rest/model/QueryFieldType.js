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
    root.RestApi.QueryFieldType = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The QueryFieldType model module.
   * @module model/QueryFieldType
   * @version v1
   */

  /**
   * Constructs a new <code>QueryFieldType</code>.
   * @alias module:model/QueryFieldType
   * @class
   * @param name {String} name of the field
   * @param type {String} data type of the field
   */
  var exports = function(name, type) {
    var _this = this;

    _this['name'] = name;
    _this['type'] = type;
  };

  /**
   * Constructs a <code>QueryFieldType</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/QueryFieldType} obj Optional instance to populate.
   * @return {module:model/QueryFieldType} The populated <code>QueryFieldType</code> instance.
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



  return exports;
}));


