(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/AwsExternalIdIntegration', 'model/AwsKeyIntegration', 'model/GcpServiceAccount', 'model/RedshiftIntegration'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./AwsExternalIdIntegration'), require('./AwsKeyIntegration'), require('./GcpServiceAccount'), require('./RedshiftIntegration'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.Integration = factory(root.RestApi.ApiClient, root.RestApi.AwsExternalIdIntegration, root.RestApi.AwsKeyIntegration, root.RestApi.GcpServiceAccount, root.RestApi.RedshiftIntegration);
  }
}(this, function(ApiClient, AwsExternalIdIntegration, AwsKeyIntegration, GcpServiceAccount, RedshiftIntegration) {
    'use strict';




  /**
   * The Integration model module.
   * @module model/Integration
   * @version v1
   */

  /**
   * Constructs a new <code>Integration</code>.
   * Integrations that can be associated with data sources to create collections. Only one type of integration may be specified.
   * @alias module:model/Integration
   * @class
   * @param createdBy {String} email of user who created the integration
   * @param name {String} descriptive label and unique identifier
   */
  var exports = function(createdBy, name) {
    var _this = this;


    _this['created_by'] = createdBy;
    _this['name'] = name;





  };

  /**
   * Constructs a <code>Integration</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Integration} obj Optional instance to populate.
   * @return {module:model/Integration} The populated <code>Integration</code> instance.
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
      if (data.hasOwnProperty('aws')) {
        obj['aws'] = AwsKeyIntegration.constructFromObject(data['aws']);
      }
      if (data.hasOwnProperty('aws_external_id')) {
        obj['aws_external_id'] = AwsExternalIdIntegration.constructFromObject(data['aws_external_id']);
      }
      if (data.hasOwnProperty('gcp_service_account')) {
        obj['gcp_service_account'] = GcpServiceAccount.constructFromObject(data['gcp_service_account']);
      }
      if (data.hasOwnProperty('redshift')) {
        obj['redshift'] = RedshiftIntegration.constructFromObject(data['redshift']);
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
   * email of user who created the integration
   * @member {String} created_by
   */
  exports.prototype['created_by'] = undefined;
  /**
   * descriptive label and unique identifier
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * longer explanation for the integration
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * credentials for an AWS key integration
   * @member {module:model/AwsKeyIntegration} aws
   */
  exports.prototype['aws'] = undefined;
  /**
   * details of an AWS External Id integration
   * @member {module:model/AwsExternalIdIntegration} aws_external_id
   */
  exports.prototype['aws_external_id'] = undefined;
  /**
   * details of a GCP Service Account integration
   * @member {module:model/GcpServiceAccount} gcp_service_account
   */
  exports.prototype['gcp_service_account'] = undefined;
  /**
   * details of an AWS Redshift integration
   * @member {module:model/RedshiftIntegration} redshift
   */
  exports.prototype['redshift'] = undefined;



  return exports;
}));


