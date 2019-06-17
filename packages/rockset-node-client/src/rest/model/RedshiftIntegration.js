(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/AwsAccessKey'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./AwsAccessKey'));
  } else {
    // Browser globals (root is window)
    if (!root.RestApi) {
      root.RestApi = {};
    }
    root.RestApi.RedshiftIntegration = factory(root.RestApi.ApiClient, root.RestApi.AwsAccessKey);
  }
}(this, function(ApiClient, AwsAccessKey) {
    'use strict';




  /**
   * The RedshiftIntegration model module.
   * @module model/RedshiftIntegration
   * @version v1
   */

  /**
   * Constructs a new <code>RedshiftIntegration</code>.
   * @alias module:model/RedshiftIntegration
   * @class
   * @param username {String} Username associated with Redshift cluster
   * @param password {String} Password associated with Redshift cluster
   * @param host {String} Redshift Cluster host
   * @param port {Number} Redshift Cluster port
   * @param s3BucketPath {String} unload S3 bucket path
   */
  var exports = function(username, password, host, port, s3BucketPath) {
    var _this = this;


    _this['username'] = username;
    _this['password'] = password;
    _this['host'] = host;
    _this['port'] = port;
    _this['s3_bucket_path'] = s3BucketPath;
  };

  /**
   * Constructs a <code>RedshiftIntegration</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/RedshiftIntegration} obj Optional instance to populate.
   * @return {module:model/RedshiftIntegration} The populated <code>RedshiftIntegration</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('aws_access_key')) {
        obj['aws_access_key'] = AwsAccessKey.constructFromObject(data['aws_access_key']);
      }
      if (data.hasOwnProperty('username')) {
        obj['username'] = ApiClient.convertToType(data['username'], 'String');
      }
      if (data.hasOwnProperty('password')) {
        obj['password'] = ApiClient.convertToType(data['password'], 'String');
      }
      if (data.hasOwnProperty('host')) {
        obj['host'] = ApiClient.convertToType(data['host'], 'String');
      }
      if (data.hasOwnProperty('port')) {
        obj['port'] = ApiClient.convertToType(data['port'], 'Number');
      }
      if (data.hasOwnProperty('s3_bucket_path')) {
        obj['s3_bucket_path'] = ApiClient.convertToType(data['s3_bucket_path'], 'String');
      }
    }
    return obj;
  }

  /**
   * AWS access key credentials
   * @member {module:model/AwsAccessKey} aws_access_key
   */
  exports.prototype['aws_access_key'] = undefined;
  /**
   * Username associated with Redshift cluster
   * @member {String} username
   */
  exports.prototype['username'] = undefined;
  /**
   * Password associated with Redshift cluster
   * @member {String} password
   */
  exports.prototype['password'] = undefined;
  /**
   * Redshift Cluster host
   * @member {String} host
   */
  exports.prototype['host'] = undefined;
  /**
   * Redshift Cluster port
   * @member {Number} port
   */
  exports.prototype['port'] = undefined;
  /**
   * unload S3 bucket path
   * @member {String} s3_bucket_path
   */
  exports.prototype['s3_bucket_path'] = undefined;



  return exports;
}));


