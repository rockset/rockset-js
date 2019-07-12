(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/CsvParams', '../model/XmlParams'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./CsvParams'), require('./XmlParams'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.FormatParams = factory(root.RestApi.ApiClient, root.RestApi.CsvParams, root.RestApi.XmlParams);
  }
}(this, function(ApiClient, CsvParams, XmlParams) {
    'use strict';




  /**
   * The FormatParams model module.
   * @module model/FormatParams
   * @version v1
   */

  /**
   * Constructs a new <code>FormatParams</code>.
   * @alias module:model/FormatParams
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>FormatParams</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/FormatParams} obj Optional instance to populate.
   * @return {module:model/FormatParams} The populated <code>FormatParams</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('json')) {
        obj['json'] = ApiClient.convertToType(data['json'], 'Boolean');
      }
      if (data.hasOwnProperty('csv')) {
        obj['csv'] = CsvParams.constructFromObject(data['csv']);
      }
      if (data.hasOwnProperty('xml')) {
        obj['xml'] = XmlParams.constructFromObject(data['xml']);
      }
    }
    return obj;
  }

  /**
   * source data is in json format
   * @member {Boolean} json
   */
  exports.prototype['json'] = undefined;
  /**
   * @member {module:model/CsvParams} csv
   */
  exports.prototype['csv'] = undefined;
  /**
   * @member {module:model/XmlParams} xml
   */
  exports.prototype['xml'] = undefined;



  return exports;
}));


