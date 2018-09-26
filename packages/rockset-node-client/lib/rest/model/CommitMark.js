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
    root.RestApi.CommitMark = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The CommitMark model module.
   * @module model/CommitMark
   * @version v1
   */

  /**
   * Constructs a new <code>CommitMark</code>.
   * @alias module:model/CommitMark
   * @class
   */
  var exports = function() {
    var _this = this;

  };

  /**
   * Constructs a <code>CommitMark</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CommitMark} obj Optional instance to populate.
   * @return {module:model/CommitMark} The populated <code>CommitMark</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

    }
    return obj;
  }




  return exports;
}));


