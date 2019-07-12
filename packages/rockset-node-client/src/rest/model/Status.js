(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.Status = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The Status model module.
   * @module model/Status
   * @version v1
   */

  /**
   * Constructs a new <code>Status</code>.
   * @alias module:model/Status
   * @class
   */
  var exports = function() {
    var _this = this;











  };

  /**
   * Constructs a <code>Status</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Status} obj Optional instance to populate.
   * @return {module:model/Status} The populated <code>Status</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('state')) {
        obj['state'] = ApiClient.convertToType(data['state'], 'String');
      }
      if (data.hasOwnProperty('since')) {
        obj['since'] = ApiClient.convertToType(data['since'], 'String');
      }
      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('last_processed_at')) {
        obj['last_processed_at'] = ApiClient.convertToType(data['last_processed_at'], 'String');
      }
      if (data.hasOwnProperty('last_processed_item')) {
        obj['last_processed_item'] = ApiClient.convertToType(data['last_processed_item'], 'String');
      }
      if (data.hasOwnProperty('total_processed_items')) {
        obj['total_processed_items'] = ApiClient.convertToType(data['total_processed_items'], 'Number');
      }
      if (data.hasOwnProperty('last_error_at')) {
        obj['last_error_at'] = ApiClient.convertToType(data['last_error_at'], 'String');
      }
      if (data.hasOwnProperty('last_error_item')) {
        obj['last_error_item'] = ApiClient.convertToType(data['last_error_item'], 'String');
      }
      if (data.hasOwnProperty('last_error_reason')) {
        obj['last_error_reason'] = ApiClient.convertToType(data['last_error_reason'], 'String');
      }
      if (data.hasOwnProperty('total_error_items')) {
        obj['total_error_items'] = ApiClient.convertToType(data['total_error_items'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Status of the Source's ingestion, one of: INITIALIZING, WATCHING, PROCESSING, COMPLETED, ERROR
   * @member {module:model/Status.StateEnum} state
   */
  exports.prototype['state'] = undefined;
  /**
   * ISO-8601 date when state was triggered
   * @member {String} since
   */
  exports.prototype['since'] = undefined;
  /**
   * state message
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * ISO-8601 date when source was last processed
   * @member {String} last_processed_at
   */
  exports.prototype['last_processed_at'] = undefined;
  /**
   * last source item processed by ingester
   * @member {String} last_processed_item
   */
  exports.prototype['last_processed_item'] = undefined;
  /**
   * Total items processed of source
   * @member {Number} total_processed_items
   */
  exports.prototype['total_processed_items'] = undefined;
  /**
   * ISO-8601 date when last error occurred
   * @member {String} last_error_at
   */
  exports.prototype['last_error_at'] = undefined;
  /**
   * last source item that errored
   * @member {String} last_error_item
   */
  exports.prototype['last_error_item'] = undefined;
  /**
   * reason for the last error
   * @member {String} last_error_reason
   */
  exports.prototype['last_error_reason'] = undefined;
  /**
   * Total items that errored
   * @member {Number} total_error_items
   */
  exports.prototype['total_error_items'] = undefined;


  /**
   * Allowed values for the <code>state</code> property.
   * @enum {String}
   * @readonly
   */
  exports.StateEnum = {
    /**
     * value: "INITIALIZING"
     * @const
     */
    "INITIALIZING": "INITIALIZING",
    /**
     * value: "WATCHING"
     * @const
     */
    "WATCHING": "WATCHING",
    /**
     * value: "PROCESSING"
     * @const
     */
    "PROCESSING": "PROCESSING",
    /**
     * value: "COMPLETED"
     * @const
     */
    "COMPLETED": "COMPLETED",
    /**
     * value: "ERROR"
     * @const
     */
    "ERROR": "ERROR"  };


  return exports;
}));


