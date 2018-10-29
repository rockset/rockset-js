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
    root.RestApi.EventTimeInfo = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The EventTimeInfo model module.
   * @module model/EventTimeInfo
   * @version v1
   */

  /**
   * Constructs a new <code>EventTimeInfo</code>.
   * @alias module:model/EventTimeInfo
   * @class
   * @param field {String} name of the field containing event time
   */
  var exports = function(field) {
    var _this = this;

    _this['field'] = field;


  };

  /**
   * Constructs a <code>EventTimeInfo</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/EventTimeInfo} obj Optional instance to populate.
   * @return {module:model/EventTimeInfo} The populated <code>EventTimeInfo</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('field')) {
        obj['field'] = ApiClient.convertToType(data['field'], 'String');
      }
      if (data.hasOwnProperty('format')) {
        obj['format'] = ApiClient.convertToType(data['format'], 'String');
      }
      if (data.hasOwnProperty('time_zone')) {
        obj['time_zone'] = ApiClient.convertToType(data['time_zone'], 'String');
      }
    }
    return obj;
  }

  /**
   * name of the field containing event time
   * @member {String} field
   */
  exports.prototype['field'] = undefined;
  /**
   * format of time field, can be one of: milliseconds_since_epoch, seconds_since_epoch
   * @member {String} format
   */
  exports.prototype['format'] = undefined;
  /**
   * default time zone, in standard IANA format
   * @member {String} time_zone
   */
  exports.prototype['time_zone'] = undefined;



  return exports;
}));


