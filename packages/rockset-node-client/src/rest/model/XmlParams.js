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
    root.RestApi.XmlParams = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The XmlParams model module.
   * @module model/XmlParams
   * @version v1
   */

  /**
   * Constructs a new <code>XmlParams</code>.
   * @alias module:model/XmlParams
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>XmlParams</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/XmlParams} obj Optional instance to populate.
   * @return {module:model/XmlParams} The populated <code>XmlParams</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('root_tag')) {
        obj['root_tag'] = ApiClient.convertToType(data['root_tag'], 'String');
      }
      if (data.hasOwnProperty('encoding')) {
        obj['encoding'] = ApiClient.convertToType(data['encoding'], 'String');
      }
      if (data.hasOwnProperty('doc_tag')) {
        obj['doc_tag'] = ApiClient.convertToType(data['doc_tag'], 'String');
      }
      if (data.hasOwnProperty('value_tag')) {
        obj['value_tag'] = ApiClient.convertToType(data['value_tag'], 'String');
      }
      if (data.hasOwnProperty('attribute_prefix')) {
        obj['attribute_prefix'] = ApiClient.convertToType(data['attribute_prefix'], 'String');
      }
    }
    return obj;
  }

  /**
   * tag until which xml is ignored
   * @member {String} root_tag
   */
  exports.prototype['root_tag'] = undefined;
  /**
   * encoding in which data source is encoded
   * @member {String} encoding
   */
  exports.prototype['encoding'] = undefined;
  /**
   * tags with which documents are identified
   * @member {String} doc_tag
   */
  exports.prototype['doc_tag'] = undefined;
  /**
   * tag used for the value when there are attributes in the element having no child
   * @member {String} value_tag
   */
  exports.prototype['value_tag'] = undefined;
  /**
   * tag to differentiate between attributes and elements
   * @member {String} attribute_prefix
   */
  exports.prototype['attribute_prefix'] = undefined;



  return exports;
}));


