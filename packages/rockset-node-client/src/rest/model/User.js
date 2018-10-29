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
    root.RestApi.User = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The User model module.
   * @module model/User
   * @version v1
   */

  /**
   * Constructs a new <code>User</code>.
   * @alias module:model/User
   * @class
   * @param email {String} user email
   */
  var exports = function(email) {
    var _this = this;



    _this['email'] = email;

  };

  /**
   * Constructs a <code>User</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/User} obj Optional instance to populate.
   * @return {module:model/User} The populated <code>User</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
      if (data.hasOwnProperty('created_at')) {
        obj['created_at'] = ApiClient.convertToType(data['created_at'], 'String');
      }
      if (data.hasOwnProperty('email')) {
        obj['email'] = ApiClient.convertToType(data['email'], 'String');
      }
      if (data.hasOwnProperty('roles')) {
        obj['roles'] = ApiClient.convertToType(data['roles'], ['String']);
      }
    }
    return obj;
  }

  /**
   * has value `user` for a user object
   * @member {String} type
   */
  exports.prototype['type'] = undefined;
  /**
   * ISO-8601 date
   * @member {String} created_at
   */
  exports.prototype['created_at'] = undefined;
  /**
   * user email
   * @member {String} email
   */
  exports.prototype['email'] = undefined;
  /**
   * List of roles for a given user
   * @member {Array.<String>} roles
   */
  exports.prototype['roles'] = undefined;



  return exports;
}));


