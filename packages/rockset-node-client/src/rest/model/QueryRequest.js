(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/QueryRequestSql'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./QueryRequestSql'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.QueryRequest = factory(root.RestApi.ApiClient, root.RestApi.QueryRequestSql);
  }
}(this, function(ApiClient, QueryRequestSql) {
    'use strict';




  /**
   * The QueryRequest model module.
   * @module model/QueryRequest
   * @version v1
   */

  /**
   * Constructs a new <code>QueryRequest</code>.
   * @alias module:model/QueryRequest
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>QueryRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/QueryRequest} obj Optional instance to populate.
   * @return {module:model/QueryRequest} The populated <code>QueryRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('sql')) {
        obj['sql'] = QueryRequestSql.constructFromObject(data['sql']);
      }
    }
    return obj;
  }

  /**
   * details about the query
   * @member {module:model/QueryRequestSql} sql
   */
  exports.prototype['sql'] = undefined;



  return exports;
}));


