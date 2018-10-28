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
    root.RestApi.Organization = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The Organization model module.
   * @module model/Organization
   * @version v1
   */

  /**
   * Constructs a new <code>Organization</code>.
   * An organization in Rockset is a container for users and collections.
   * @alias module:model/Organization
   * @class
   * @param name {String} name of the organization
   */
  var exports = function(name) {
    var _this = this;

    _this['name'] = name;


  };

  /**
   * Constructs a <code>Organization</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Organization} obj Optional instance to populate.
   * @return {module:model/Organization} The populated <code>Organization</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('inputRateLimitMbs')) {
        obj['inputRateLimitMbs'] = ApiClient.convertToType(data['inputRateLimitMbs'], 'Number');
      }
      if (data.hasOwnProperty('sizeLimitGb')) {
        obj['sizeLimitGb'] = ApiClient.convertToType(data['sizeLimitGb'], 'Number');
      }
    }
    return obj;
  }

  /**
   * name of the organization
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * @member {Number} inputRateLimitMbs
   */
  exports.prototype['inputRateLimitMbs'] = undefined;
  /**
   * @member {Number} sizeLimitGb
   */
  exports.prototype['sizeLimitGb'] = undefined;



  return exports;
}));


