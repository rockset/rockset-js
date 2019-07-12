(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/DocumentStatus'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./DocumentStatus'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.DeleteDocumentsResponse = factory(root.RestApi.ApiClient, root.RestApi.DocumentStatus);
  }
}(this, function(ApiClient, DocumentStatus) {
    'use strict';




  /**
   * The DeleteDocumentsResponse model module.
   * @module model/DeleteDocumentsResponse
   * @version v1
   */

  /**
   * Constructs a new <code>DeleteDocumentsResponse</code>.
   * @alias module:model/DeleteDocumentsResponse
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>DeleteDocumentsResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/DeleteDocumentsResponse} obj Optional instance to populate.
   * @return {module:model/DeleteDocumentsResponse} The populated <code>DeleteDocumentsResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [DocumentStatus]);
      }
    }
    return obj;
  }

  /**
   * information about deleted documents
   * @member {Array.<module:model/DocumentStatus>} data
   */
  exports.prototype['data'] = undefined;



  return exports;
}));


