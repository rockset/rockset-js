(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/FieldMaskMask'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./FieldMaskMask'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.FieldMask = factory(root.RestApi.ApiClient, root.RestApi.FieldMaskMask);
  }
}(this, function(ApiClient, FieldMaskMask) {
    'use strict';




  /**
   * The FieldMask model module.
   * @module model/FieldMask
   * @version v1
   */

  /**
   * Constructs a new <code>FieldMask</code>.
   * @alias module:model/FieldMask
   * @class
   * @param inputPath {Array.<String>} 
   */
  var exports = function(inputPath) {
    var _this = this;

    _this['input_path'] = inputPath;

  };

  /**
   * Constructs a <code>FieldMask</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/FieldMask} obj Optional instance to populate.
   * @return {module:model/FieldMask} The populated <code>FieldMask</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('input_path')) {
        obj['input_path'] = ApiClient.convertToType(data['input_path'], ['String']);
      }
      if (data.hasOwnProperty('mask')) {
        obj['mask'] = FieldMaskMask.constructFromObject(data['mask']);
      }
    }
    return obj;
  }

  /**
   * @member {Array.<String>} input_path
   */
  exports.prototype['input_path'] = undefined;
  /**
   * @member {module:model/FieldMaskMask} mask
   */
  exports.prototype['mask'] = undefined;



  return exports;
}));


