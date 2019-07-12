(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/DeleteDocumentsRequestData'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./DeleteDocumentsRequestData'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.DeleteDocumentsRequest = factory(root.RestApi.ApiClient, root.RestApi.DeleteDocumentsRequestData);
  }
}(this, function(ApiClient, DeleteDocumentsRequestData) {
    'use strict';




  /**
   * The DeleteDocumentsRequest model module.
   * @module model/DeleteDocumentsRequest
   * @version v1
   */

  /**
   * Constructs a new <code>DeleteDocumentsRequest</code>.
   * @alias module:model/DeleteDocumentsRequest
   * @class
   * @param data {Array.<module:model/DeleteDocumentsRequestData>} array of document IDs
   */
  var exports = function(data) {
    var _this = this;

    _this['data'] = data;
  };

  /**
   * Constructs a <code>DeleteDocumentsRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/DeleteDocumentsRequest} obj Optional instance to populate.
   * @return {module:model/DeleteDocumentsRequest} The populated <code>DeleteDocumentsRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [DeleteDocumentsRequestData]);
      }
    }
    return obj;
  }

  /**
   * array of document IDs
   * @member {Array.<module:model/DeleteDocumentsRequestData>} data
   */
  exports.prototype['data'] = undefined;



  return exports;
}));


