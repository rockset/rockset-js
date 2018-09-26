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
    root.RestApi.ErrorModelContext = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The ErrorModelContext model module.
   * @module model/ErrorModelContext
   * @version v1
   */

  /**
   * Constructs a new <code>ErrorModelContext</code>.
   * @alias module:model/ErrorModelContext
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>ErrorModelContext</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ErrorModelContext} obj Optional instance to populate.
   * @return {module:model/ErrorModelContext} The populated <code>ErrorModelContext</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('lineinfo')) {
        obj['lineinfo'] = ApiClient.convertToType(data['lineinfo'], 'String');
      }
    }
    return obj;
  }

  /**
   * additional error message
   * @member {String} lineinfo
   */
  exports.prototype['lineinfo'] = undefined;



  return exports;
}));


