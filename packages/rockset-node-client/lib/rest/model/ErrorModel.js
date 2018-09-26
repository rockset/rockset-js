(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ErrorModelContext'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ErrorModelContext'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.ErrorModel = factory(root.RestApi.ApiClient, root.RestApi.ErrorModelContext);
  }
}(this, function(ApiClient, ErrorModelContext) {
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

      if (data.hasOwnProperty('code')) {
        obj['code'] = ApiClient.convertToType(data['code'], 'Number');
      }
      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
      if (data.hasOwnProperty('context')) {
        obj['context'] = ErrorModelContext.constructFromObject(data['context']);
      }
    }
    return obj;
  }

  /**
   * HTTP status code
   * @member {Number} code
   */
  exports.prototype['code'] = undefined;
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
   * additional error information
   * @member {module:model/ErrorModelContext} context
   */
  exports.prototype['context'] = undefined;


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
     * value: "PROTOCOLERROR"
     * @const
     */
    "PROTOCOLERROR": "PROTOCOLERROR",
    /**
     * value: "RESOURCEEXCEEDED"
     * @const
     */
    "RESOURCEEXCEEDED": "RESOURCEEXCEEDED",
    /**
     * value: "RESOURCENAMETOOLONG"
     * @const
     */
    "RESOURCENAMETOOLONG": "RESOURCENAMETOOLONG",
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
     * value: "PAUSED"
     * @const
     */
    "PAUSED": "PAUSED",
    /**
     * value: "QUERY_ERROR"
     * @const
     */
    "QUERY_ERROR": "QUERY_ERROR",
    /**
     * value: "QUERY_PARSE_ERROR"
     * @const
     */
    "QUERY_PARSE_ERROR": "QUERY_PARSE_ERROR",
    /**
     * value: "NOT_READY"
     * @const
     */
    "NOT_READY": "NOT_READY"  };


  return exports;
}));


