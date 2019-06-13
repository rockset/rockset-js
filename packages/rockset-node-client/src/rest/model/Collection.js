(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CollectionStats', 'model/FieldMappingV2', 'model/Source'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./CollectionStats'), require('./FieldMappingV2'), require('./Source'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.Collection = factory(root.RestApi.ApiClient, root.RestApi.CollectionStats, root.RestApi.FieldMappingV2, root.RestApi.Source);
  }
}(this, function(ApiClient, CollectionStats, FieldMappingV2, Source) {
    'use strict';




  /**
   * The Collection model module.
   * @module model/Collection
   * @version v1
   */

  /**
   * Constructs a new <code>Collection</code>.
   * @alias module:model/Collection
   * @class
   */
  var exports = function() {
    var _this = this;











  };

  /**
   * Constructs a <code>Collection</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Collection} obj Optional instance to populate.
   * @return {module:model/Collection} The populated <code>Collection</code> instance.
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
      if (data.hasOwnProperty('workspace')) {
        obj['workspace'] = ApiClient.convertToType(data['workspace'], 'String');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'String');
      }
      if (data.hasOwnProperty('sources')) {
        obj['sources'] = ApiClient.convertToType(data['sources'], [Source]);
      }
      if (data.hasOwnProperty('stats')) {
        obj['stats'] = CollectionStats.constructFromObject(data['stats']);
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
   * name of the workspace that the collection is in
   * @member {String} workspace
   */
  exports.prototype['workspace'] = undefined;
  /**
   * current status of collection, one of: CREATED, READY, DELETED
   * @member {module:model/Collection.StatusEnum} status
   */
  exports.prototype['status'] = undefined;
  /**
   * list of sources from which collection ingests
   * @member {Array.<module:model/Source>} sources
   */
  exports.prototype['sources'] = undefined;
  /**
   * metrics about the collection
   * @member {module:model/CollectionStats} stats
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
     * value: "PAUSED"
     * @const
     */
    "PAUSED": "PAUSED",
    /**
     * value: "DELETED"
     * @const
     */
    "DELETED": "DELETED",
    /**
     * value: "PAUSING"
     * @const
     */
    "PAUSING": "PAUSING",
    /**
     * value: "RESUMING"
     * @const
     */
    "RESUMING": "RESUMING",
    /**
     * value: "CATCHINGUP"
     * @const
     */
    "CATCHINGUP": "CATCHINGUP",
    /**
     * value: "UNKNOWN"
     * @const
     */
    "UNKNOWN": "UNKNOWN"  };


  return exports;
}));


