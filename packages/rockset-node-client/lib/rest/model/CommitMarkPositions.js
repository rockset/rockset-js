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
    root.RestApi.CommitMarkPositions = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The CommitMarkPositions model module.
   * @module model/CommitMarkPositions
   * @version v1
   */

  /**
   * Constructs a new <code>CommitMarkPositions</code>.
   * @alias module:model/CommitMarkPositions
   * @class
   */
  var exports = function() {
    var _this = this;

  };

  /**
   * Constructs a <code>CommitMarkPositions</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CommitMarkPositions} obj Optional instance to populate.
   * @return {module:model/CommitMarkPositions} The populated <code>CommitMarkPositions</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

    }
    return obj;
  }




  return exports;
}));


