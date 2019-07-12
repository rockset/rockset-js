(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', '../model/DynamodbIntegration', '../model/GcsIntegration', '../model/KinesisIntegration', '../model/RedshiftIntegration', '../model/S3Integration'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./DynamodbIntegration'), require('./GcsIntegration'), require('./KinesisIntegration'), require('./RedshiftIntegration'), require('./S3Integration'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.CreateIntegrationRequest = factory(root.RestApi.ApiClient, root.RestApi.DynamodbIntegration, root.RestApi.GcsIntegration, root.RestApi.KinesisIntegration, root.RestApi.RedshiftIntegration, root.RestApi.S3Integration);
  }
}(this, function(ApiClient, DynamodbIntegration, GcsIntegration, KinesisIntegration, RedshiftIntegration, S3Integration) {
    'use strict';




  /**
   * The CreateIntegrationRequest model module.
   * @module model/CreateIntegrationRequest
   * @version v1
   */

  /**
   * Constructs a new <code>CreateIntegrationRequest</code>.
   * @alias module:model/CreateIntegrationRequest
   * @class
   * @param name {String} descriptive label
   */
  var exports = function(name) {
    var _this = this;

    _this['name'] = name;






  };

  /**
   * Constructs a <code>CreateIntegrationRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CreateIntegrationRequest} obj Optional instance to populate.
   * @return {module:model/CreateIntegrationRequest} The populated <code>CreateIntegrationRequest</code> instance.
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
      if (data.hasOwnProperty('s3')) {
        obj['s3'] = S3Integration.constructFromObject(data['s3']);
      }
      if (data.hasOwnProperty('kinesis')) {
        obj['kinesis'] = KinesisIntegration.constructFromObject(data['kinesis']);
      }
      if (data.hasOwnProperty('dynamodb')) {
        obj['dynamodb'] = DynamodbIntegration.constructFromObject(data['dynamodb']);
      }
      if (data.hasOwnProperty('redshift')) {
        obj['redshift'] = RedshiftIntegration.constructFromObject(data['redshift']);
      }
      if (data.hasOwnProperty('gcs')) {
        obj['gcs'] = GcsIntegration.constructFromObject(data['gcs']);
      }
    }
    return obj;
  }

  /**
   * descriptive label
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * longer explanation for the integration
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * Amazon S3 details, must have one of aws_access_key or aws_role
   * @member {module:model/S3Integration} s3
   */
  exports.prototype['s3'] = undefined;
  /**
   * Amazon Kinesis details, must have one of aws_access_key or aws_role
   * @member {module:model/KinesisIntegration} kinesis
   */
  exports.prototype['kinesis'] = undefined;
  /**
   * Amazon DynamoDB details, must have one of aws_access_key or aws_role
   * @member {module:model/DynamodbIntegration} dynamodb
   */
  exports.prototype['dynamodb'] = undefined;
  /**
   * Amazon Redshift details
   * @member {module:model/RedshiftIntegration} redshift
   */
  exports.prototype['redshift'] = undefined;
  /**
   * GCS details
   * @member {module:model/GcsIntegration} gcs
   */
  exports.prototype['gcs'] = undefined;



  return exports;
}));


