(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/Organization'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Organization'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.OrganizationResponse = factory(root.RestApi.ApiClient, root.RestApi.Organization);
  }
}(this, function(ApiClient, Organization) {
    'use strict';




  /**
   * The OrganizationResponse model module.
   * @module model/OrganizationResponse
   * @version v1
   */

  /**
   * Constructs a new <code>OrganizationResponse</code>.
   * @alias module:model/OrganizationResponse
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>OrganizationResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OrganizationResponse} obj Optional instance to populate.
   * @return {module:model/OrganizationResponse} The populated <code>OrganizationResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('data')) {
        obj['data'] = Organization.constructFromObject(data['data']);
      }
    }
    return obj;
  }

  /**
   * Organization object
   * @member {module:model/Organization} data
   */
  exports.prototype['data'] = undefined;



  return exports;
}));


