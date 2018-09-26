(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Resource'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Resource'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.CreateCollectionResponse = factory(root.RestApi.ApiClient, root.RestApi.Resource);
  }
}(this, function(ApiClient, Resource) {
    'use strict';




  /**
   * The CreateCollectionResponse model module.
   * @module model/CreateCollectionResponse
   * @version v1
   */

  /**
   * Constructs a new <code>CreateCollectionResponse</code>.
   * @alias module:model/CreateCollectionResponse
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>CreateCollectionResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CreateCollectionResponse} obj Optional instance to populate.
   * @return {module:model/CreateCollectionResponse} The populated <code>CreateCollectionResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('data')) {
        obj['data'] = Resource.constructFromObject(data['data']);
      }
    }
    return obj;
  }

  /**
   * collection that was created
   * @member {module:model/Resource} data
   */
  exports.prototype['data'] = undefined;



  return exports;
}));


