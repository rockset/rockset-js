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
    root.RestApi.AddDocumentsRequest = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The AddDocumentsRequest model module.
   * @module model/AddDocumentsRequest
   * @version v1
   */

  /**
   * Constructs a new <code>AddDocumentsRequest</code>.
   * @alias module:model/AddDocumentsRequest
   * @class
   * @param data {Array.<Object>} Array of JSON documents
   */
  var exports = function(data) {
    var _this = this;

    _this['data'] = data;
  };

  /**
   * Constructs a <code>AddDocumentsRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AddDocumentsRequest} obj Optional instance to populate.
   * @return {module:model/AddDocumentsRequest} The populated <code>AddDocumentsRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [Object]);
      }
    }
    return obj;
  }

  /**
   * Array of JSON documents
   * @member {Array.<Object>} data
   */
  exports.prototype['data'] = undefined;



  return exports;
}));


