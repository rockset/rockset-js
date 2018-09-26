(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/AddDocumentsRequest', 'model/AddDocumentsResponse', 'model/ApiKey', 'model/AwsKeyIntegration', 'model/CommitMark', 'model/CommitMarkPositions', 'model/CreateApiKeyRequest', 'model/CreateApiKeyResponse', 'model/CreateCollectionRequest', 'model/CreateCollectionResponse', 'model/CreateIntegrationRequest', 'model/CreateIntegrationResponse', 'model/CreateUserRequest', 'model/CreateUserResponse', 'model/CsvParams', 'model/DeleteApiKeyResponse', 'model/DeleteCollectionResponse', 'model/DeleteDocumentsRequest', 'model/DeleteDocumentsRequestData', 'model/DeleteDocumentsResponse', 'model/DeleteIntegrationResponse', 'model/DeleteUserResponse', 'model/DocumentStatus', 'model/ErrorModel', 'model/ErrorModelContext', 'model/EventTimeInfo', 'model/FieldMapping', 'model/FieldMask', 'model/FieldMaskMask', 'model/GetCollectionResponse', 'model/GetIntegrationResponse', 'model/Integration', 'model/ListApiKeysResponse', 'model/ListCollectionsResponse', 'model/ListIntegrationsResponse', 'model/ListUsersResponse', 'model/QueryFieldType', 'model/QueryParameter', 'model/QueryRequest', 'model/QueryRequestSql', 'model/QueryResponse', 'model/QueryResponseStats', 'model/Resource', 'model/ResourceStats', 'model/Source', 'model/SourceS3', 'model/User', 'api/ApiKeysApi', 'api/CollectionsApi', 'api/DocumentsApi', 'api/IntegrationsApi', 'api/QueriesApi', 'api/UsersApi'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('./ApiClient'), require('./model/AddDocumentsRequest'), require('./model/AddDocumentsResponse'), require('./model/ApiKey'), require('./model/AwsKeyIntegration'), require('./model/CommitMark'), require('./model/CommitMarkPositions'), require('./model/CreateApiKeyRequest'), require('./model/CreateApiKeyResponse'), require('./model/CreateCollectionRequest'), require('./model/CreateCollectionResponse'), require('./model/CreateIntegrationRequest'), require('./model/CreateIntegrationResponse'), require('./model/CreateUserRequest'), require('./model/CreateUserResponse'), require('./model/CsvParams'), require('./model/DeleteApiKeyResponse'), require('./model/DeleteCollectionResponse'), require('./model/DeleteDocumentsRequest'), require('./model/DeleteDocumentsRequestData'), require('./model/DeleteDocumentsResponse'), require('./model/DeleteIntegrationResponse'), require('./model/DeleteUserResponse'), require('./model/DocumentStatus'), require('./model/ErrorModel'), require('./model/ErrorModelContext'), require('./model/EventTimeInfo'), require('./model/FieldMapping'), require('./model/FieldMask'), require('./model/FieldMaskMask'), require('./model/GetCollectionResponse'), require('./model/GetIntegrationResponse'), require('./model/Integration'), require('./model/ListApiKeysResponse'), require('./model/ListCollectionsResponse'), require('./model/ListIntegrationsResponse'), require('./model/ListUsersResponse'), require('./model/QueryFieldType'), require('./model/QueryParameter'), require('./model/QueryRequest'), require('./model/QueryRequestSql'), require('./model/QueryResponse'), require('./model/QueryResponseStats'), require('./model/Resource'), require('./model/ResourceStats'), require('./model/Source'), require('./model/SourceS3'), require('./model/User'), require('./api/ApiKeysApi'), require('./api/CollectionsApi'), require('./api/DocumentsApi'), require('./api/IntegrationsApi'), require('./api/QueriesApi'), require('./api/UsersApi'));
  }
}(function(ApiClient, AddDocumentsRequest, AddDocumentsResponse, ApiKey, AwsKeyIntegration, CommitMark, CommitMarkPositions, CreateApiKeyRequest, CreateApiKeyResponse, CreateCollectionRequest, CreateCollectionResponse, CreateIntegrationRequest, CreateIntegrationResponse, CreateUserRequest, CreateUserResponse, CsvParams, DeleteApiKeyResponse, DeleteCollectionResponse, DeleteDocumentsRequest, DeleteDocumentsRequestData, DeleteDocumentsResponse, DeleteIntegrationResponse, DeleteUserResponse, DocumentStatus, ErrorModel, ErrorModelContext, EventTimeInfo, FieldMapping, FieldMask, FieldMaskMask, GetCollectionResponse, GetIntegrationResponse, Integration, ListApiKeysResponse, ListCollectionsResponse, ListIntegrationsResponse, ListUsersResponse, QueryFieldType, QueryParameter, QueryRequest, QueryRequestSql, QueryResponse, QueryResponseStats, Resource, ResourceStats, Source, SourceS3, User, ApiKeysApi, CollectionsApi, DocumentsApi, IntegrationsApi, QueriesApi, UsersApi) {
    'use strict';
  var exports = function(apiKey, apiServer){
    if (apiKey === undefined || apiKey === null) {
      throw new Error("Missing required argument 'apiKey'");
    }
    var apiClient = new ApiClient(apiKey, apiServer);

    return {
      version: "v1",
      apiKeys: new ApiKeysApi(apiClient),
      collections: new CollectionsApi(apiClient),
      documents: new DocumentsApi(apiClient),
      integrations: new IntegrationsApi(apiClient),
      queries: new QueriesApi(apiClient),
      users: new UsersApi(apiClient)
    };
  };

  return exports;
}));
