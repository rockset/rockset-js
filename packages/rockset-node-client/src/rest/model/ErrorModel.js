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
    root.RestApi.ErrorModel = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The ErrorModel model module.
   * @module model/ErrorModel
   * @version v1
   */

  /**
   * Constructs a new <code>ErrorModel</code>.
   * Describes details about an error
   * @alias module:model/ErrorModel
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>ErrorModel</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ErrorModel} obj Optional instance to populate.
   * @return {module:model/ErrorModel} The populated <code>ErrorModel</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
      if (data.hasOwnProperty('line')) {
        obj['line'] = ApiClient.convertToType(data['line'], 'Number');
      }
      if (data.hasOwnProperty('column')) {
        obj['column'] = ApiClient.convertToType(data['column'], 'Number');
      }
      if (data.hasOwnProperty('trace_id')) {
        obj['trace_id'] = ApiClient.convertToType(data['trace_id'], 'String');
      }
    }
    return obj;
  }

  /**
   * descriptive message about the error
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * category of the error
   * @member {module:model/ErrorModel.TypeEnum} type
   */
  exports.prototype['type'] = undefined;
  /**
   * Line where the error happened (if applicable)
   * @member {Number} line
   */
  exports.prototype['line'] = undefined;
  /**
   * Column where the error happened (if applicable)
   * @member {Number} column
   */
  exports.prototype['column'] = undefined;
  /**
   * Internal trace ID to help with debugging
   * @member {String} trace_id
   */
  exports.prototype['trace_id'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "AUTHEXCEPTION"
     * @const
     */
    "AUTHEXCEPTION": "AUTHEXCEPTION",
    /**
     * value: "VERSIONEXCEPTION"
     * @const
     */
    "VERSIONEXCEPTION": "VERSIONEXCEPTION",
    /**
     * value: "INTERNALERROR"
     * @const
     */
    "INTERNALERROR": "INTERNALERROR",
    /**
     * value: "INVALIDINPUT"
     * @const
     */
    "INVALIDINPUT": "INVALIDINPUT",
    /**
     * value: "NOTIMPLEMENTEDYET"
     * @const
     */
    "NOTIMPLEMENTEDYET": "NOTIMPLEMENTEDYET",
    /**
     * value: "RESOURCEEXCEEDED"
     * @const
     */
    "RESOURCEEXCEEDED": "RESOURCEEXCEEDED",
    /**
     * value: "ALREADYEXISTS"
     * @const
     */
    "ALREADYEXISTS": "ALREADYEXISTS",
    /**
     * value: "NOTFOUND"
     * @const
     */
    "NOTFOUND": "NOTFOUND",
    /**
     * value: "DEPENDENTRESOURCES"
     * @const
     */
    "DEPENDENTRESOURCES": "DEPENDENTRESOURCES",
    /**
     * value: "QUERY_ERROR"
     * @const
     */
    "QUERY_ERROR": "QUERY_ERROR",
    /**
     * value: "NOT_READY"
     * @const
     */
    "NOT_READY": "NOT_READY",
    /**
     * value: "FORBIDDEN"
     * @const
     */
    "FORBIDDEN": "FORBIDDEN",
    /**
     * value: "QUERY_TIMEOUT"
     * @const
     */
    "QUERY_TIMEOUT": "QUERY_TIMEOUT",
    /**
     * value: "INTEGRATION_NOT_FOUND"
     * @const
     */
    "INTEGRATION_NOT_FOUND": "INTEGRATION_NOT_FOUND",
    /**
     * value: "ROLE_NOT_FOUND"
     * @const
     */
    "ROLE_NOT_FOUND": "ROLE_NOT_FOUND"  };


  return exports;
}));


