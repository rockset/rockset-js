(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/FormatParams', '../model/SourceDynamoDb', '../model/SourceFileUpload', '../model/SourceGcs', '../model/SourceKinesis', '../model/SourceRedshift', '../model/SourceS3', '../model/Status'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./FormatParams'), require('./SourceDynamoDb'), require('./SourceFileUpload'), require('./SourceGcs'), require('./SourceKinesis'), require('./SourceRedshift'), require('./SourceS3'), require('./Status'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.Source = factory(root.RestApi.ApiClient, root.RestApi.FormatParams, root.RestApi.SourceDynamoDb, root.RestApi.SourceFileUpload, root.RestApi.SourceGcs, root.RestApi.SourceKinesis, root.RestApi.SourceRedshift, root.RestApi.SourceS3, root.RestApi.Status);
  }
}(this, function(ApiClient, FormatParams, SourceDynamoDb, SourceFileUpload, SourceGcs, SourceKinesis, SourceRedshift, SourceS3, Status) {
    'use strict';




  /**
   * The Source model module.
   * @module model/Source
   * @version v1
   */

  /**
   * Constructs a new <code>Source</code>.
   * Details about the data source for the given collection. Only one of the following fields are allowed to be defined. Only collections can act as data sources for views. 
   * @alias module:model/Source
   * @class
   * @param integrationName {String} name of integration to use
   */
  var exports = function(integrationName) {
    var _this = this;

    _this['integration_name'] = integrationName;








  };

  /**
   * Constructs a <code>Source</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Source} obj Optional instance to populate.
   * @return {module:model/Source} The populated <code>Source</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('integration_name')) {
        obj['integration_name'] = ApiClient.convertToType(data['integration_name'], 'String');
      }
      if (data.hasOwnProperty('s3')) {
        obj['s3'] = SourceS3.constructFromObject(data['s3']);
      }
      if (data.hasOwnProperty('kinesis')) {
        obj['kinesis'] = SourceKinesis.constructFromObject(data['kinesis']);
      }
      if (data.hasOwnProperty('gcs')) {
        obj['gcs'] = SourceGcs.constructFromObject(data['gcs']);
      }
      if (data.hasOwnProperty('redshift')) {
        obj['redshift'] = SourceRedshift.constructFromObject(data['redshift']);
      }
      if (data.hasOwnProperty('dynamodb')) {
        obj['dynamodb'] = SourceDynamoDb.constructFromObject(data['dynamodb']);
      }
      if (data.hasOwnProperty('file_upload')) {
        obj['file_upload'] = SourceFileUpload.constructFromObject(data['file_upload']);
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = Status.constructFromObject(data['status']);
      }
      if (data.hasOwnProperty('format_params')) {
        obj['format_params'] = FormatParams.constructFromObject(data['format_params']);
      }
    }
    return obj;
  }

  /**
   * name of integration to use
   * @member {String} integration_name
   */
  exports.prototype['integration_name'] = undefined;
  /**
   * configuration for ingestion from S3
   * @member {module:model/SourceS3} s3
   */
  exports.prototype['s3'] = undefined;
  /**
   * configuration for ingestion from kinesis stream
   * @member {module:model/SourceKinesis} kinesis
   */
  exports.prototype['kinesis'] = undefined;
  /**
   * configuration for ingestion from GCS
   * @member {module:model/SourceGcs} gcs
   */
  exports.prototype['gcs'] = undefined;
  /**
   * configuration for ingestion from Redshift
   * @member {module:model/SourceRedshift} redshift
   */
  exports.prototype['redshift'] = undefined;
  /**
   * configuration for ingestion from  a dynamodb table
   * @member {module:model/SourceDynamoDb} dynamodb
   */
  exports.prototype['dynamodb'] = undefined;
  /**
   * file upload details
   * @member {module:model/SourceFileUpload} file_upload
   */
  exports.prototype['file_upload'] = undefined;
  /**
   * the ingest status of this source
   * @member {module:model/Status} status
   */
  exports.prototype['status'] = undefined;
  /**
   * format parameters for data from this source
   * @member {module:model/FormatParams} format_params
   */
  exports.prototype['format_params'] = undefined;



  return exports;
}));


