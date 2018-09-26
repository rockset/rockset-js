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
    root.RestApi.CreateUserRequest = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The CreateUserRequest model module.
   * @module model/CreateUserRequest
   * @version v1
   */

  /**
   * Constructs a new <code>CreateUserRequest</code>.
   * @alias module:model/CreateUserRequest
   * @class
   * @param email {String} user email, must be unique
   */
  var exports = function(email) {
    var _this = this;

    _this['email'] = email;
  };

  /**
   * Constructs a <code>CreateUserRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CreateUserRequest} obj Optional instance to populate.
   * @return {module:model/CreateUserRequest} The populated <code>CreateUserRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('email')) {
        obj['email'] = ApiClient.convertToType(data['email'], 'String');
      }
    }
    return obj;
  }

  /**
   * user email, must be unique
   * @member {String} email
   */
  exports.prototype['email'] = undefined;



  return exports;
}));


