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
    root.RestApi.SourceFileUpload = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The SourceFileUpload model module.
   * @module model/SourceFileUpload
   * @version v1
   */

  /**
   * Constructs a new <code>SourceFileUpload</code>.
   * @alias module:model/SourceFileUpload
   * @class
   * @param fileName {String} name of the file
   * @param fileSize {Number} size of the file in bytes
   * @param fileUploadTime {String} time of file upload
   */
  var exports = function(fileName, fileSize, fileUploadTime) {
    var _this = this;

    _this['file_name'] = fileName;
    _this['file_size'] = fileSize;
    _this['file_upload_time'] = fileUploadTime;
  };

  /**
   * Constructs a <code>SourceFileUpload</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SourceFileUpload} obj Optional instance to populate.
   * @return {module:model/SourceFileUpload} The populated <code>SourceFileUpload</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('file_name')) {
        obj['file_name'] = ApiClient.convertToType(data['file_name'], 'String');
      }
      if (data.hasOwnProperty('file_size')) {
        obj['file_size'] = ApiClient.convertToType(data['file_size'], 'Number');
      }
      if (data.hasOwnProperty('file_upload_time')) {
        obj['file_upload_time'] = ApiClient.convertToType(data['file_upload_time'], 'String');
      }
    }
    return obj;
  }

  /**
   * name of the file
   * @member {String} file_name
   */
  exports.prototype['file_name'] = undefined;
  /**
   * size of the file in bytes
   * @member {Number} file_size
   */
  exports.prototype['file_size'] = undefined;
  /**
   * time of file upload
   * @member {String} file_upload_time
   */
  exports.prototype['file_upload_time'] = undefined;



  return exports;
}));


