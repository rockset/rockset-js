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
    root.RestApi.SourceRedshift = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The SourceRedshift model module.
   * @module model/SourceRedshift
   * @version v1
   */

  /**
   * Constructs a new <code>SourceRedshift</code>.
   * @alias module:model/SourceRedshift
   * @class
   * @param database {String} name of the database in Redshift Cluster
   * @param schema {String} schema which contains the Redshift table
   * @param tableName {String} name of Redshift table containing data
   */
  var exports = function(database, schema, tableName) {
    var _this = this;

    _this['database'] = database;
    _this['schema'] = schema;
    _this['table_name'] = tableName;

  };

  /**
   * Constructs a <code>SourceRedshift</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SourceRedshift} obj Optional instance to populate.
   * @return {module:model/SourceRedshift} The populated <code>SourceRedshift</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('database')) {
        obj['database'] = ApiClient.convertToType(data['database'], 'String');
      }
      if (data.hasOwnProperty('schema')) {
        obj['schema'] = ApiClient.convertToType(data['schema'], 'String');
      }
      if (data.hasOwnProperty('table_name')) {
        obj['table_name'] = ApiClient.convertToType(data['table_name'], 'String');
      }
      if (data.hasOwnProperty('incremental_field')) {
        obj['incremental_field'] = ApiClient.convertToType(data['incremental_field'], 'String');
      }
    }
    return obj;
  }

  /**
   * name of the database in Redshift Cluster
   * @member {String} database
   */
  exports.prototype['database'] = undefined;
  /**
   * schema which contains the Redshift table
   * @member {String} schema
   */
  exports.prototype['schema'] = undefined;
  /**
   * name of Redshift table containing data
   * @member {String} table_name
   */
  exports.prototype['table_name'] = undefined;
  /**
   * field in Redshift source table to monitor for updates
   * @member {String} incremental_field
   */
  exports.prototype['incremental_field'] = undefined;



  return exports;
}));


