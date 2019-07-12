(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/Collection'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Collection'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.ListCollectionsResponse = factory(root.RestApi.ApiClient, root.RestApi.Collection);
  }
}(this, function(ApiClient, Collection) {
    'use strict';




  /**
   * The ListCollectionsResponse model module.
   * @module model/ListCollectionsResponse
   * @version v1
   */

  /**
   * Constructs a new <code>ListCollectionsResponse</code>.
   * @alias module:model/ListCollectionsResponse
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>ListCollectionsResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ListCollectionsResponse} obj Optional instance to populate.
   * @return {module:model/ListCollectionsResponse} The populated <code>ListCollectionsResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [Collection]);
      }
    }
    return obj;
  }

  /**
   * list of all collections
   * @member {Array.<module:model/Collection>} data
   */
  exports.prototype['data'] = undefined;



  return exports;
}));


