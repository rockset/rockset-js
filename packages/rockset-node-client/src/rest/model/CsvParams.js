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
    root.RestApi.CsvParams = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The CsvParams model module.
   * @module model/CsvParams
   * @version v1
   */

  /**
   * Constructs a new <code>CsvParams</code>.
   * @alias module:model/CsvParams
   * @class
   */
  var exports = function() {
    var _this = this;







  };

  /**
   * Constructs a <code>CsvParams</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CsvParams} obj Optional instance to populate.
   * @return {module:model/CsvParams} The populated <code>CsvParams</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('firstLineAsColumnNames')) {
        obj['firstLineAsColumnNames'] = ApiClient.convertToType(data['firstLineAsColumnNames'], 'Boolean');
      }
      if (data.hasOwnProperty('separator')) {
        obj['separator'] = ApiClient.convertToType(data['separator'], 'String');
      }
      if (data.hasOwnProperty('encoding')) {
        obj['encoding'] = ApiClient.convertToType(data['encoding'], 'String');
      }
      if (data.hasOwnProperty('columnNames')) {
        obj['columnNames'] = ApiClient.convertToType(data['columnNames'], ['String']);
      }
      if (data.hasOwnProperty('columnTypes')) {
        obj['columnTypes'] = ApiClient.convertToType(data['columnTypes'], ['String']);
      }
      if (data.hasOwnProperty('quoteChar')) {
        obj['quoteChar'] = ApiClient.convertToType(data['quoteChar'], 'String');
      }
    }
    return obj;
  }

  /**
   * If the first line in every object specifies the column names
   * @member {Boolean} firstLineAsColumnNames
   */
  exports.prototype['firstLineAsColumnNames'] = undefined;
  /**
   * a single character that is the column seperator
   * @member {String} separator
   */
  exports.prototype['separator'] = undefined;
  /**
   * can be one of: UTF-8, ISO_8859_1, UTF-16
   * @member {String} encoding
   */
  exports.prototype['encoding'] = undefined;
  /**
   * names of columns
   * @member {Array.<String>} columnNames
   */
  exports.prototype['columnNames'] = undefined;
  /**
   * names of columns
   * @member {Array.<module:model/CsvParams.ColumnTypesEnum>} columnTypes
   */
  exports.prototype['columnTypes'] = undefined;
  /**
   * character within which a cell value is enclosed,null character if no such character, default is '\"'
   * @member {String} quoteChar
   */
  exports.prototype['quoteChar'] = undefined;


  /**
   * Allowed values for the <code>columnTypes</code> property.
   * @enum {String}
   * @readonly
   */
  exports.ColumnTypesEnum = {
    /**
     * value: "UNKNOWN"
     * @const
     */
    "UNKNOWN": "UNKNOWN",
    /**
     * value: "BOOLEAN"
     * @const
     */
    "BOOLEAN": "BOOLEAN",
    /**
     * value: "BOOL"
     * @const
     */
    "BOOL": "BOOL",
    /**
     * value: "INTEGER"
     * @const
     */
    "INTEGER": "INTEGER",
    /**
     * value: "INT"
     * @const
     */
    "INT": "INT",
    /**
     * value: "FLOAT"
     * @const
     */
    "FLOAT": "FLOAT",
    /**
     * value: "TIME"
     * @const
     */
    "TIME": "TIME",
    /**
     * value: "DATE"
     * @const
     */
    "DATE": "DATE",
    /**
     * value: "DATETIME"
     * @const
     */
    "DATETIME": "DATETIME",
    /**
     * value: "TIMESTAMP"
     * @const
     */
    "TIMESTAMP": "TIMESTAMP",
    /**
     * value: "STRING"
     * @const
     */
    "STRING": "STRING"  };


  return exports;
}));


