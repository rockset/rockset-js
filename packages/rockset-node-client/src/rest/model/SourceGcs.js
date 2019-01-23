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
    root.RestApi.SourceGcs = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The SourceGcs model module.
   * @module model/SourceGcs
   * @version v1
   */

  /**
   * Constructs a new <code>SourceGcs</code>.
   * @alias module:model/SourceGcs
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>SourceGcs</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SourceGcs} obj Optional instance to populate.
   * @return {module:model/SourceGcs} The populated <code>SourceGcs</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('bucket')) {
        obj['bucket'] = ApiClient.convertToType(data['bucket'], 'String');
      }
      if (data.hasOwnProperty('prefix')) {
        obj['prefix'] = ApiClient.convertToType(data['prefix'], 'String');
      }
    }
    return obj;
  }

  /**
   * name of GCS bucket you want to ingest from
   * @member {String} bucket
   */
  exports.prototype['bucket'] = undefined;
  /**
   * Prefix that selects keys to ingest.
   * @member {String} prefix
   */
  exports.prototype['prefix'] = undefined;



  return exports;
}));


