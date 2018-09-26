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
    root.RestApi.ResourceStats = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The ResourceStats model module.
   * @module model/ResourceStats
   * @version v1
   */

  /**
   * Constructs a new <code>ResourceStats</code>.
   * @alias module:model/ResourceStats
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>ResourceStats</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResourceStats} obj Optional instance to populate.
   * @return {module:model/ResourceStats} The populated <code>ResourceStats</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('doc_count')) {
        obj['doc_count'] = ApiClient.convertToType(data['doc_count'], 'Number');
      }
      if (data.hasOwnProperty('total_size')) {
        obj['total_size'] = ApiClient.convertToType(data['total_size'], 'Number');
      }
      if (data.hasOwnProperty('fill_progress')) {
        obj['fill_progress'] = ApiClient.convertToType(data['fill_progress'], 'Number');
      }
      if (data.hasOwnProperty('last_updated_ms')) {
        obj['last_updated_ms'] = ApiClient.convertToType(data['last_updated_ms'], 'Number');
      }
      if (data.hasOwnProperty('last_queried_ms')) {
        obj['last_queried_ms'] = ApiClient.convertToType(data['last_queried_ms'], 'Number');
      }
    }
    return obj;
  }

  /**
   * number of documents in the collection
   * @member {Number} doc_count
   */
  exports.prototype['doc_count'] = undefined;
  /**
   * total collection size in bytes
   * @member {Number} total_size
   */
  exports.prototype['total_size'] = undefined;
  /**
   * number between 0 and 1 that indicates progress of collection creation
   * @member {Number} fill_progress
   */
  exports.prototype['fill_progress'] = undefined;
  /**
   * milliseconds since Unix epoch Jan 1, 1970
   * @member {Number} last_updated_ms
   */
  exports.prototype['last_updated_ms'] = undefined;
  /**
   * milliseconds since Unix epoch Jan 1, 1970
   * @member {Number} last_queried_ms
   */
  exports.prototype['last_queried_ms'] = undefined;



  return exports;
}));


