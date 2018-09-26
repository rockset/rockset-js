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
    root.RestApi.QueryResponseStats = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The QueryResponseStats model module.
   * @module model/QueryResponseStats
   * @version v1
   */

  /**
   * Constructs a new <code>QueryResponseStats</code>.
   * @alias module:model/QueryResponseStats
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>QueryResponseStats</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/QueryResponseStats} obj Optional instance to populate.
   * @return {module:model/QueryResponseStats} The populated <code>QueryResponseStats</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('elapsed_time_ms')) {
        obj['elapsed_time_ms'] = ApiClient.convertToType(data['elapsed_time_ms'], 'Number');
      }
    }
    return obj;
  }

  /**
   * query time in milliseconds
   * @member {Number} elapsed_time_ms
   */
  exports.prototype['elapsed_time_ms'] = undefined;



  return exports;
}));


