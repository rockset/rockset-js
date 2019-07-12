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
    root.RestApi.AddDocumentsResponse = factory(root.RestApi.ApiClient, root.RestApi.DocumentStatus);
  }
}(this, function(ApiClient, DocumentStatus) {
    'use strict';




  /**
   * The AddDocumentsResponse model module.
   * @module model/AddDocumentsResponse
   * @version v1
   */

  /**
   * Constructs a new <code>AddDocumentsResponse</code>.
   * @alias module:model/AddDocumentsResponse
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>AddDocumentsResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AddDocumentsResponse} obj Optional instance to populate.
   * @return {module:model/AddDocumentsResponse} The populated <code>AddDocumentsResponse</code> instance.
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
   * information about the added documents
   * @member {Array.<module:model/DocumentStatus>} data
   */
  exports.prototype['data'] = undefined;



  return exports;
}));


