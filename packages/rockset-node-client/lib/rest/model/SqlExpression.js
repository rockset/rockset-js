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
    root.RestApi.SqlExpression = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The SqlExpression model module.
   * @module model/SqlExpression
   * @version v1
   */

  /**
   * Constructs a new <code>SqlExpression</code>.
   * @alias module:model/SqlExpression
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>SqlExpression</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SqlExpression} obj Optional instance to populate.
   * @return {module:model/SqlExpression} The populated <code>SqlExpression</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('sql')) {
        obj['sql'] = ApiClient.convertToType(data['sql'], 'String');
      }
    }
    return obj;
  }

  /**
   * The name of a sql function
   * @member {String} sql
   */
  exports.prototype['sql'] = undefined;



  return exports;
}));


