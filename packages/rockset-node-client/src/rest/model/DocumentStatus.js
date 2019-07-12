(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/ErrorModel'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ErrorModel'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.DocumentStatus = factory(root.RestApi.ApiClient, root.RestApi.ErrorModel);
  }
}(this, function(ApiClient, ErrorModel) {
    'use strict';




  /**
   * The DocumentStatus model module.
   * @module model/DocumentStatus
   * @version v1
   */

  /**
   * Constructs a new <code>DocumentStatus</code>.
   * @alias module:model/DocumentStatus
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>DocumentStatus</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/DocumentStatus} obj Optional instance to populate.
   * @return {module:model/DocumentStatus} The populated <code>DocumentStatus</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('_collection')) {
        obj['_collection'] = ApiClient.convertToType(data['_collection'], 'String');
      }
      if (data.hasOwnProperty('error')) {
        obj['error'] = ErrorModel.constructFromObject(data['error']);
      }
      if (data.hasOwnProperty('_id')) {
        obj['_id'] = ApiClient.convertToType(data['_id'], 'String');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'String');
      }
    }
    return obj;
  }

  /**
   * collection name
   * @member {String} _collection
   */
  exports.prototype['_collection'] = undefined;
  /**
   * error message, if any
   * @member {module:model/ErrorModel} error
   */
  exports.prototype['error'] = undefined;
  /**
   * unique document ID
   * @member {String} _id
   */
  exports.prototype['_id'] = undefined;
  /**
   * status, one of ADDED, REPLACED, DELETED, ERROR
   * @member {module:model/DocumentStatus.StatusEnum} status
   */
  exports.prototype['status'] = undefined;


  /**
   * Allowed values for the <code>status</code> property.
   * @enum {String}
   * @readonly
   */
  exports.StatusEnum = {
    /**
     * value: "ADDED"
     * @const
     */
    "ADDED": "ADDED",
    /**
     * value: "REPLACED"
     * @const
     */
    "REPLACED": "REPLACED",
    /**
     * value: "DELETED"
     * @const
     */
    "DELETED": "DELETED",
    /**
     * value: "ERROR"
     * @const
     */
    "ERROR": "ERROR"  };


  return exports;
}));


