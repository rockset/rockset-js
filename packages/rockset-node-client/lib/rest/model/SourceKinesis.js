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
    root.RestApi.SourceKinesis = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The SourceKinesis model module.
   * @module model/SourceKinesis
   * @version v1
   */

  /**
   * Constructs a new <code>SourceKinesis</code>.
   * @alias module:model/SourceKinesis
   * @class
   * @param streamName {String} name of kinesis stream
   */
  var exports = function(streamName) {
    var _this = this;

    _this['stream_name'] = streamName;
  };

  /**
   * Constructs a <code>SourceKinesis</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SourceKinesis} obj Optional instance to populate.
   * @return {module:model/SourceKinesis} The populated <code>SourceKinesis</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('stream_name')) {
        obj['stream_name'] = ApiClient.convertToType(data['stream_name'], 'String');
      }
    }
    return obj;
  }

  /**
   * name of kinesis stream
   * @member {String} stream_name
   */
  exports.prototype['stream_name'] = undefined;



  return exports;
}));


