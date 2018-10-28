(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/FieldMappingV2', 'model/ResourceStats', 'model/Source'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./FieldMappingV2'), require('./ResourceStats'), require('./Source'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.Resource = factory(root.RestApi.ApiClient, root.RestApi.FieldMappingV2, root.RestApi.ResourceStats, root.RestApi.Source);
  }
}(this, function(ApiClient, FieldMappingV2, ResourceStats, Source) {
    'use strict';




  /**
   * The Resource model module.
   * @module model/Resource
   * @version v1
   */

  /**
   * Constructs a new <code>Resource</code>.
   * @alias module:model/Resource
   * @class
   */
  var exports = function() {
    var _this = this;










  };

  /**
   * Constructs a <code>Resource</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Resource} obj Optional instance to populate.
   * @return {module:model/Resource} The populated <code>Resource</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('created_at')) {
        obj['created_at'] = ApiClient.convertToType(data['created_at'], 'String');
      }
      if (data.hasOwnProperty('created_by')) {
        obj['created_by'] = ApiClient.convertToType(data['created_by'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'String');
      }
      if (data.hasOwnProperty('sources')) {
        obj['sources'] = ApiClient.convertToType(data['sources'], [Source]);
      }
      if (data.hasOwnProperty('stats')) {
        obj['stats'] = ResourceStats.constructFromObject(data['stats']);
      }
      if (data.hasOwnProperty('retention_secs')) {
        obj['retention_secs'] = ApiClient.convertToType(data['retention_secs'], 'Number');
      }
      if (data.hasOwnProperty('field_mappings')) {
        obj['field_mappings'] = ApiClient.convertToType(data['field_mappings'], [FieldMappingV2]);
      }
    }
    return obj;
  }

  /**
   * ISO-8601 date
   * @member {String} created_at
   */
  exports.prototype['created_at'] = undefined;
  /**
   * email of user who created the collection
   * @member {String} created_by
   */
  exports.prototype['created_by'] = undefined;
  /**
   * unique identifer for collection, can contain alphanumeric or dash characters
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * text describing the collection
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * current status of collection, one of: CREATED, READY, DELETED, PAUSED, RESUMING
   * @member {module:model/Resource.StatusEnum} status
   */
  exports.prototype['status'] = undefined;
  /**
   * list of sources from which collection ingests
   * @member {Array.<module:model/Source>} sources
   */
  exports.prototype['sources'] = undefined;
  /**
   * metrics about the collection
   * @member {module:model/ResourceStats} stats
   */
  exports.prototype['stats'] = undefined;
  /**
   * number of seconds after which data is purged based on event time
   * @member {Number} retention_secs
   */
  exports.prototype['retention_secs'] = undefined;
  /**
   * list of mappings applied on all documents in a collection
   * @member {Array.<module:model/FieldMappingV2>} field_mappings
   */
  exports.prototype['field_mappings'] = undefined;


  /**
   * Allowed values for the <code>status</code> property.
   * @enum {String}
   * @readonly
   */
  exports.StatusEnum = {
    /**
     * value: "CREATED"
     * @const
     */
    "CREATED": "CREATED",
    /**
     * value: "READY"
     * @const
     */
    "READY": "READY",
    /**
     * value: "DELETED"
     * @const
     */
    "DELETED": "DELETED",
    /**
     * value: "PAUSED"
     * @const
     */
    "PAUSED": "PAUSED",
    /**
     * value: "RESUMING"
     * @const
     */
    "RESUMING": "RESUMING",
    /**
     * value: "UNKNOWN"
     * @const
     */
    "UNKNOWN": "UNKNOWN"  };


  return exports;
}));


