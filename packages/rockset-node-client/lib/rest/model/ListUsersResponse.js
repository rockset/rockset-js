(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/User'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./User'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.ListUsersResponse = factory(root.RestApi.ApiClient, root.RestApi.User);
  }
}(this, function(ApiClient, User) {
    'use strict';




  /**
   * The ListUsersResponse model module.
   * @module model/ListUsersResponse
   * @version v1
   */

  /**
   * Constructs a new <code>ListUsersResponse</code>.
   * @alias module:model/ListUsersResponse
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>ListUsersResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ListUsersResponse} obj Optional instance to populate.
   * @return {module:model/ListUsersResponse} The populated <code>ListUsersResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [User]);
      }
    }
    return obj;
  }

  /**
   * list of users
   * @member {Array.<module:model/User>} data
   */
  exports.prototype['data'] = undefined;



  return exports;
}));


