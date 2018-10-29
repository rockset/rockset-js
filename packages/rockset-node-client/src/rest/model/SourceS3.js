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
    root.RestApi.SourceS3 = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The SourceS3 model module.
   * @module model/SourceS3
   * @version v1
   */

  /**
   * Constructs a new <code>SourceS3</code>.
   * @alias module:model/SourceS3
   * @class
   * @param bucket {String} address of S3 bucket containing data
   * @param prefixes {Array.<String>} list of prefixes to paths from which data should be ingested
   */
  var exports = function(bucket, prefixes) {
    var _this = this;

    _this['bucket'] = bucket;
    _this['prefixes'] = prefixes;
  };

  /**
   * Constructs a <code>SourceS3</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SourceS3} obj Optional instance to populate.
   * @return {module:model/SourceS3} The populated <code>SourceS3</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('bucket')) {
        obj['bucket'] = ApiClient.convertToType(data['bucket'], 'String');
      }
      if (data.hasOwnProperty('prefixes')) {
        obj['prefixes'] = ApiClient.convertToType(data['prefixes'], ['String']);
      }
    }
    return obj;
  }

  /**
   * address of S3 bucket containing data
   * @member {String} bucket
   */
  exports.prototype['bucket'] = undefined;
  /**
   * list of prefixes to paths from which data should be ingested
   * @member {Array.<String>} prefixes
   */
  exports.prototype['prefixes'] = undefined;



  return exports;
}));


