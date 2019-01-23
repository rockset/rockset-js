(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/AwsExternalIdIntegration', 'model/AwsKeyIntegration', 'model/GcpServiceAccount'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./AwsExternalIdIntegration'), require('./AwsKeyIntegration'), require('./GcpServiceAccount'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.CreateIntegrationRequest = factory(root.RestApi.ApiClient, root.RestApi.AwsExternalIdIntegration, root.RestApi.AwsKeyIntegration, root.RestApi.GcpServiceAccount);
  }
}(this, function(ApiClient, AwsExternalIdIntegration, AwsKeyIntegration, GcpServiceAccount) {
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
      if (data.hasOwnProperty('aws')) {
        obj['aws'] = AwsKeyIntegration.constructFromObject(data['aws']);
      }
      if (data.hasOwnProperty('aws_external_id')) {
        obj['aws_external_id'] = AwsExternalIdIntegration.constructFromObject(data['aws_external_id']);
      }
      if (data.hasOwnProperty('gcp_service_account')) {
        obj['gcp_service_account'] = GcpServiceAccount.constructFromObject(data['gcp_service_account']);
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
   * credentials for an AWS key integration
   * @member {module:model/AwsKeyIntegration} aws
   */
  exports.prototype['aws'] = undefined;
  /**
   * details for an AWS External Id integration
   * @member {module:model/AwsExternalIdIntegration} aws_external_id
   */
  exports.prototype['aws_external_id'] = undefined;
  /**
   * details of a GCP Service Account integration
   * @member {module:model/GcpServiceAccount} gcp_service_account
   */
  exports.prototype['gcp_service_account'] = undefined;



  return exports;
}));


