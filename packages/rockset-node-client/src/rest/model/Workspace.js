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
    root.RestApi.Workspace = factory(root.RestApi.ApiClient);
  }
}(this, function(ApiClient) {
    'use strict';




  /**
   * The Workspace model module.
   * @module model/Workspace
   * @version v1
   */

  /**
   * Constructs a new <code>Workspace</code>.
   * Workspaces are organizational containers for collections.
   * @alias module:model/Workspace
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>Workspace</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Workspace} obj Optional instance to populate.
   * @return {module:model/Workspace} The populated <code>Workspace</code> instance.
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
      if (data.hasOwnProperty('collection_count')) {
        obj['collection_count'] = ApiClient.convertToType(data['collection_count'], 'Number');
      }
    }
    return obj;
  }

  /**
   * ISO-8601 date of when workspace was created
   * @member {String} created_at
   */
  exports.prototype['created_at'] = undefined;
  /**
   * email of user who created the workspace
   * @member {String} created_by
   */
  exports.prototype['created_by'] = undefined;
  /**
   * descriptive label and unique identifier
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * longer explanation for the workspace
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * number of collections that are immediate children of workspace
   * @member {Number} collection_count
   */
  exports.prototype['collection_count'] = undefined;



  return exports;
}));


