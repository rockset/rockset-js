(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/QueryFieldType', '../model/QueryResponseStats'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./QueryFieldType'), require('./QueryResponseStats'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.QueryResponse = factory(root.RestApi.ApiClient, root.RestApi.QueryFieldType, root.RestApi.QueryResponseStats);
  }
}(this, function(ApiClient, QueryFieldType, QueryResponseStats) {
    'use strict';




  /**
   * The QueryResponse model module.
   * @module model/QueryResponse
   * @version v1
   */

  /**
   * Constructs a new <code>QueryResponse</code>.
   * @alias module:model/QueryResponse
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>QueryResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/QueryResponse} obj Optional instance to populate.
   * @return {module:model/QueryResponse} The populated <code>QueryResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('results')) {
        obj['results'] = ApiClient.convertToType(data['results'], [Object]);
      }
      if (data.hasOwnProperty('fields')) {
        obj['fields'] = ApiClient.convertToType(data['fields'], [QueryFieldType]);
      }
      if (data.hasOwnProperty('stats')) {
        obj['stats'] = QueryResponseStats.constructFromObject(data['stats']);
      }
      if (data.hasOwnProperty('column_fields')) {
        obj['column_fields'] = ApiClient.convertToType(data['column_fields'], [QueryFieldType]);
      }
    }
    return obj;
  }

  /**
   * list of objects returned by the query
   * @member {Array.<Object>} results
   */
  exports.prototype['results'] = undefined;
  /**
   * list of fields returned by the query
   * @member {Array.<module:model/QueryFieldType>} fields
   */
  exports.prototype['fields'] = undefined;
  /**
   * meta information about the query
   * @member {module:model/QueryResponseStats} stats
   */
  exports.prototype['stats'] = undefined;
  /**
   * meta information about each column in the result set
   * @member {Array.<module:model/QueryFieldType>} column_fields
   */
  exports.prototype['column_fields'] = undefined;



  return exports;
}));


