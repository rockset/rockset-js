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
    root.RestApi.DeleteUserResponse = factory(root.RestApi.ApiClient, root.RestApi.User);
  }
}(this, function(ApiClient, User) {
    'use strict';




  /**
   * The DeleteUserResponse model module.
   * @module model/DeleteUserResponse
   * @version v1
   */

  /**
   * Constructs a new <code>DeleteUserResponse</code>.
   * @alias module:model/DeleteUserResponse
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>DeleteUserResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/DeleteUserResponse} obj Optional instance to populate.
   * @return {module:model/DeleteUserResponse} The populated <code>DeleteUserResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('data')) {
        obj['data'] = User.constructFromObject(data['data']);
      }
    }
    return obj;
  }

  /**
   * user object that was deleted
   * @member {module:model/User} data
   */
  exports.prototype['data'] = undefined;



  return exports;
}));


