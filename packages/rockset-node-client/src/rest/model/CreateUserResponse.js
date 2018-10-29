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
    root.RestApi.CreateUserResponse = factory(root.RestApi.ApiClient, root.RestApi.User);
  }
}(this, function(ApiClient, User) {
    'use strict';




  /**
   * The CreateUserResponse model module.
   * @module model/CreateUserResponse
   * @version v1
   */

  /**
   * Constructs a new <code>CreateUserResponse</code>.
   * @alias module:model/CreateUserResponse
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>CreateUserResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CreateUserResponse} obj Optional instance to populate.
   * @return {module:model/CreateUserResponse} The populated <code>CreateUserResponse</code> instance.
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
   * user that was created
   * @member {module:model/User} data
   */
  exports.prototype['data'] = undefined;



  return exports;
}));


