(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.ApiKey = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The ApiKey model module.
   * @module model/ApiKey
   * @version v1
   */

  /**
   * Constructs a new <code>ApiKey</code>.
   * API keys are used to authenticate requests to Rockset&#39;s API. An API key is tied to the user who creates it. A new API key can be created for each use case, with a maximum of 10 API keys per user.
   * @alias module:model/ApiKey
   * @class
   * @param name {String} descriptive label
   * @param key {String} string of 64 alphanumeric characters
   */
  var exports = function(name, key) {
    var _this = this;


    _this['name'] = name;
    _this['key'] = key;
  };

  /**
   * Constructs a <code>ApiKey</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ApiKey} obj Optional instance to populate.
   * @return {module:model/ApiKey} The populated <code>ApiKey</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('created_at')) {
        obj['created_at'] = ApiClient.convertToType(data['created_at'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('key')) {
        obj['key'] = ApiClient.convertToType(data['key'], 'String');
      }
    }
    return obj;
  }

  /**
   * ISO-8601 date
   * @member {String} created_at
   */
  exports.prototype['created_at'] = undefined;
  /**
   * descriptive label
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * string of 64 alphanumeric characters
   * @member {String} key
   */
  exports.prototype['key'] = undefined;



  return exports;
}));


