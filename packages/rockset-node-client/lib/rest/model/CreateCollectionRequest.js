(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/EventTimeInfo', 'model/FieldMappingV2', 'model/Source'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./EventTimeInfo'), require('./FieldMappingV2'), require('./Source'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.CreateCollectionRequest = factory(root.RestApi.ApiClient, root.RestApi.EventTimeInfo, root.RestApi.FieldMappingV2, root.RestApi.Source);
  }
}(this, function(ApiClient, EventTimeInfo, FieldMappingV2, Source) {
    'use strict';




  /**
   * The CreateCollectionRequest model module.
   * @module model/CreateCollectionRequest
   * @version v1
   */

  /**
   * Constructs a new <code>CreateCollectionRequest</code>.
   * @alias module:model/CreateCollectionRequest
   * @class
   * @param name {String} unique identifer for collection, can contain alphanumeric or dash characters
   */
  var exports = function(name) {
    var _this = this;

    _this['name'] = name;





  };

  /**
   * Constructs a <code>CreateCollectionRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CreateCollectionRequest} obj Optional instance to populate.
   * @return {module:model/CreateCollectionRequest} The populated <code>CreateCollectionRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('sources')) {
        obj['sources'] = ApiClient.convertToType(data['sources'], [Source]);
      }
      if (data.hasOwnProperty('retention_secs')) {
        obj['retention_secs'] = ApiClient.convertToType(data['retention_secs'], 'Number');
      }
      if (data.hasOwnProperty('event_time_info')) {
        obj['event_time_info'] = EventTimeInfo.constructFromObject(data['event_time_info']);
      }
      if (data.hasOwnProperty('field_mappings')) {
        obj['field_mappings'] = ApiClient.convertToType(data['field_mappings'], [FieldMappingV2]);
      }
    }
    return obj;
  }

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
   * list of sources from which to ingest data
   * @member {Array.<module:model/Source>} sources
   */
  exports.prototype['sources'] = undefined;
  /**
   * number of seconds after which data is purged, based on event time
   * @member {Number} retention_secs
   */
  exports.prototype['retention_secs'] = undefined;
  /**
   * configuration for event data
   * @member {module:model/EventTimeInfo} event_time_info
   */
  exports.prototype['event_time_info'] = undefined;
  /**
   * list of mappings
   * @member {Array.<module:model/FieldMappingV2>} field_mappings
   */
  exports.prototype['field_mappings'] = undefined;



  return exports;
}));


