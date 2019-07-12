(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/InputField', '../model/OutputField'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./InputField'), require('./OutputField'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.FieldMappingV2 = factory(root.RestApi.ApiClient, root.RestApi.InputField, root.RestApi.OutputField);
  }
}(this, function(ApiClient, InputField, OutputField) {
    'use strict';




  /**
   * The FieldMappingV2 model module.
   * @module model/FieldMappingV2
   * @version v1
   */

  /**
   * Constructs a new <code>FieldMappingV2</code>.
   * @alias module:model/FieldMappingV2
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>FieldMappingV2</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/FieldMappingV2} obj Optional instance to populate.
   * @return {module:model/FieldMappingV2} The populated <code>FieldMappingV2</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('input_fields')) {
        obj['input_fields'] = ApiClient.convertToType(data['input_fields'], [InputField]);
      }
      if (data.hasOwnProperty('output_field')) {
        obj['output_field'] = OutputField.constructFromObject(data['output_field']);
      }
    }
    return obj;
  }

  /**
   * A user specified string that is a name for this mapping
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * A List of InputField for this mapping
   * @member {Array.<module:model/InputField>} input_fields
   */
  exports.prototype['input_fields'] = undefined;
  /**
   * An OutputField for this mapping
   * @member {module:model/OutputField} output_field
   */
  exports.prototype['output_field'] = undefined;



  return exports;
}));


