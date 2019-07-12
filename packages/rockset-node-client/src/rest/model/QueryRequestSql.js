(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/QueryParameter'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./QueryParameter'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.QueryRequestSql = factory(root.RestApi.ApiClient, root.RestApi.QueryParameter);
  }
}(this, function(ApiClient, QueryParameter) {
    'use strict';




  /**
   * The QueryRequestSql model module.
   * @module model/QueryRequestSql
   * @version v1
   */

  /**
   * Constructs a new <code>QueryRequestSql</code>.
   * @alias module:model/QueryRequestSql
   * @class
   * @param query {String} SQL query as a string
   */
  var exports = function(query) {
    var _this = this;

    _this['query'] = query;

  };

  /**
   * Constructs a <code>QueryRequestSql</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/QueryRequestSql} obj Optional instance to populate.
   * @return {module:model/QueryRequestSql} The populated <code>QueryRequestSql</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('query')) {
        obj['query'] = ApiClient.convertToType(data['query'], 'String');
      }
      if (data.hasOwnProperty('parameters')) {
        obj['parameters'] = ApiClient.convertToType(data['parameters'], [QueryParameter]);
      }
    }
    return obj;
  }

  /**
   * SQL query as a string
   * @member {String} query
   */
  exports.prototype['query'] = undefined;
  /**
   * list of named parameters
   * @member {Array.<module:model/QueryParameter>} parameters
   */
  exports.prototype['parameters'] = undefined;



  return exports;
}));


