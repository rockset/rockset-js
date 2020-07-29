`rockset api`
=============

wrappers for Rockset's API endpoints (full documentation at https://docs.rockset.com/rest-api)

* [`rockset api:apikeys:createApiKey`](#rockset-apiapikeyscreateapikey)
* [`rockset api:apikeys:createApiKeyAdmin USER`](#rockset-apiapikeyscreateapikeyadmin-user)
* [`rockset api:apikeys:deleteApiKey NAME`](#rockset-apiapikeysdeleteapikey-name)
* [`rockset api:apikeys:deleteApiKeyAdmin NAME USER`](#rockset-apiapikeysdeleteapikeyadmin-name-user)
* [`rockset api:apikeys:listApiKeys`](#rockset-apiapikeyslistapikeys)
* [`rockset api:apikeys:listApiKeysAdmin USER`](#rockset-apiapikeyslistapikeysadmin-user)
* [`rockset api:collections:createCollection WORKSPACE`](#rockset-apicollectionscreatecollection-workspace)
* [`rockset api:collections:deleteCollection WORKSPACE COLLECTION`](#rockset-apicollectionsdeletecollection-workspace-collection)
* [`rockset api:collections:getCollection WORKSPACE COLLECTION`](#rockset-apicollectionsgetcollection-workspace-collection)
* [`rockset api:collections:listCollections`](#rockset-apicollectionslistcollections)
* [`rockset api:collections:listQueryLambdasInCollection WORKSPACE COLLECTION`](#rockset-apicollectionslistquerylambdasincollection-workspace-collection)
* [`rockset api:collections:workspaceCollections WORKSPACE`](#rockset-apicollectionsworkspacecollections-workspace)
* [`rockset api:documents:addDocuments WORKSPACE COLLECTION`](#rockset-apidocumentsadddocuments-workspace-collection)
* [`rockset api:documents:deleteDocuments WORKSPACE COLLECTION`](#rockset-apidocumentsdeletedocuments-workspace-collection)
* [`rockset api:documents:patchDocuments WORKSPACE COLLECTION`](#rockset-apidocumentspatchdocuments-workspace-collection)
* [`rockset api:integrations:createIntegration`](#rockset-apiintegrationscreateintegration)
* [`rockset api:integrations:deleteIntegration INTEGRATION`](#rockset-apiintegrationsdeleteintegration-integration)
* [`rockset api:integrations:getIntegration INTEGRATION`](#rockset-apiintegrationsgetintegration-integration)
* [`rockset api:integrations:listIntegrations`](#rockset-apiintegrationslistintegrations)
* [`rockset api:orgs:getOrganization`](#rockset-apiorgsgetorganization)
* [`rockset api:queries:query`](#rockset-apiqueriesquery)
* [`rockset api:queries:validate PARAMETERS`](#rockset-apiqueriesvalidate-parameters)
* [`rockset api:queryLambdas:createQueryLambda WORKSPACE`](#rockset-apiquerylambdascreatequerylambda-workspace)
* [`rockset api:queryLambdas:createQueryLambdaTag WORKSPACE QUERYLAMBDA`](#rockset-apiquerylambdascreatequerylambdatag-workspace-querylambda)
* [`rockset api:queryLambdas:deleteQueryLambda WORKSPACE QUERYLAMBDA`](#rockset-apiquerylambdasdeletequerylambda-workspace-querylambda)
* [`rockset api:queryLambdas:deleteQueryLambdaTag WORKSPACE QUERYLAMBDA TAG`](#rockset-apiquerylambdasdeletequerylambdatag-workspace-querylambda-tag)
* [`rockset api:queryLambdas:deleteQueryLambdaVersion WORKSPACE QUERYLAMBDA VERSION`](#rockset-apiquerylambdasdeletequerylambdaversion-workspace-querylambda-version)
* [`rockset api:queryLambdas:executeQueryLambda WORKSPACE QUERYLAMBDA VERSION`](#rockset-apiquerylambdasexecutequerylambda-workspace-querylambda-version)
* [`rockset api:queryLambdas:executeQueryLambdaByTag WORKSPACE QUERYLAMBDA TAG`](#rockset-apiquerylambdasexecutequerylambdabytag-workspace-querylambda-tag)
* [`rockset api:queryLambdas:getQueryLambdaTagVersion WORKSPACE QUERYLAMBDA TAG`](#rockset-apiquerylambdasgetquerylambdatagversion-workspace-querylambda-tag)
* [`rockset api:queryLambdas:getQueryLambdaVersion WORKSPACE QUERYLAMBDA VERSION`](#rockset-apiquerylambdasgetquerylambdaversion-workspace-querylambda-version)
* [`rockset api:queryLambdas:listAllQueryLambdas`](#rockset-apiquerylambdaslistallquerylambdas)
* [`rockset api:queryLambdas:listOrganizationTags`](#rockset-apiquerylambdaslistorganizationtags)
* [`rockset api:queryLambdas:listQueryLambdaTagVersions TAG`](#rockset-apiquerylambdaslistquerylambdatagversions-tag)
* [`rockset api:queryLambdas:listQueryLambdaTags WORKSPACE QUERYLAMBDA`](#rockset-apiquerylambdaslistquerylambdatags-workspace-querylambda)
* [`rockset api:queryLambdas:listQueryLambdaVersions WORKSPACE QUERYLAMBDA`](#rockset-apiquerylambdaslistquerylambdaversions-workspace-querylambda)
* [`rockset api:queryLambdas:listQueryLambdasInWorkspace WORKSPACE`](#rockset-apiquerylambdaslistquerylambdasinworkspace-workspace)
* [`rockset api:queryLambdas:updateQueryLambda WORKSPACE QUERYLAMBDA CREATE`](#rockset-apiquerylambdasupdatequerylambda-workspace-querylambda-create)
* [`rockset api:users:createUser`](#rockset-apiuserscreateuser)
* [`rockset api:users:deleteUser USER`](#rockset-apiusersdeleteuser-user)
* [`rockset api:users:getCurrentUser`](#rockset-apiusersgetcurrentuser)
* [`rockset api:users:listUsers`](#rockset-apiuserslistusers)
* [`rockset api:workspaces:childWorkspaces WORKSPACE`](#rockset-apiworkspaceschildworkspaces-workspace)
* [`rockset api:workspaces:createWorkspace`](#rockset-apiworkspacescreateworkspace)
* [`rockset api:workspaces:deleteWorkspace WORKSPACE`](#rockset-apiworkspacesdeleteworkspace-workspace)
* [`rockset api:workspaces:getWorkspace WORKSPACE`](#rockset-apiworkspacesgetworkspace-workspace)
* [`rockset api:workspaces:listWorkspaces`](#rockset-apiworkspaceslistworkspaces)

## `rockset api:apikeys:createApiKey`

create a new api key for the authenticated user

```
USAGE
  $ rockset api:apikeys:createApiKey

OPTIONS
  -h, --help              show CLI help

  --body=body             (required) Path to a file whose contents will be passed as the POST body of this request.
                          Format must be [json|yaml]. An example schema is shown below.

  --columns=columns       only show provided columns (comma-separated)

  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to POST: /v1/orgs/self/users/self/apikeys
  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       
  Example Body (YAML):
  name: event-logger


  Endpoint Reference
  POST: /v1/orgs/self/users/self/apikeys
  Create API Key
  Create a new API key for the authenticated user.

  More documentation at https://docs.rockset.com/rest-api#createapikey

EXAMPLE
  $ rockset api:apikeys:createApiKey  --body body.yaml
  $ cat body.yaml
  name: event-logger
```

_See code: [src/commands/api/apikeys/createApiKey.ts](../src/commands/api/apikeys/createApiKey.ts)_

## `rockset api:apikeys:createApiKeyAdmin USER`

create a new api key for any user (admin only)

```
USAGE
  $ rockset api:apikeys:createApiKeyAdmin USER

OPTIONS
  -h, --help              show CLI help

  --body=body             (required) Path to a file whose contents will be passed as the POST body of this request.
                          Format must be [json|yaml]. An example schema is shown below.

  --columns=columns       only show provided columns (comma-separated)

  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to POST: /v1/orgs/self/users/{user}/apikeys
  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       
  Example Body (YAML):
  name: event-logger


  Endpoint Reference
  POST: /v1/orgs/self/users/{user}/apikeys
  Create API Key for any user (admin only)
  Create a new API key for any user (admin only).

  More documentation at https://docs.rockset.com/rest-api#createapikeyadmin

EXAMPLE
  $ rockset api:apikeys:createApiKeyAdmin USER --body body.yaml
  $ cat body.yaml
  name: event-logger
```

_See code: [src/commands/api/apikeys/createApiKeyAdmin.ts](../src/commands/api/apikeys/createApiKeyAdmin.ts)_

## `rockset api:apikeys:deleteApiKey NAME`

delete an api key for the authenticated user

```
USAGE
  $ rockset api:apikeys:deleteApiKey NAME

ARGUMENTS
  NAME  name of the API key

OPTIONS
  -h, --help              show CLI help
  --columns=columns       only show provided columns (comma-separated)
  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to DELETE: /v1/orgs/self/users/self/apikeys/{name}


  Endpoint Reference
  DELETE: /v1/orgs/self/users/self/apikeys/{name}
  Delete API Key
  Delete an API key for the authenticated user.

  More documentation at https://docs.rockset.com/rest-api#deleteapikey

EXAMPLE
  $ rockset api:apikeys:deleteApiKey NAME
```

_See code: [src/commands/api/apikeys/deleteApiKey.ts](../src/commands/api/apikeys/deleteApiKey.ts)_

## `rockset api:apikeys:deleteApiKeyAdmin NAME USER`

delete an api key for any user (admin only)

```
USAGE
  $ rockset api:apikeys:deleteApiKeyAdmin NAME USER

ARGUMENTS
  NAME  name of the API key
  USER

OPTIONS
  -h, --help              show CLI help
  --columns=columns       only show provided columns (comma-separated)
  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to DELETE: /v1/orgs/self/users/{user}/apikeys/{name}


  Endpoint Reference
  DELETE: /v1/orgs/self/users/{user}/apikeys/{name}
  Delete API Key for any user (admin only)
  Delete an API key for any user (admin only).

  More documentation at https://docs.rockset.com/rest-api#deleteapikeyadmin

EXAMPLE
  $ rockset api:apikeys:deleteApiKeyAdmin NAME USER
```

_See code: [src/commands/api/apikeys/deleteApiKeyAdmin.ts](../src/commands/api/apikeys/deleteApiKeyAdmin.ts)_

## `rockset api:apikeys:listApiKeys`

list all api keys for the authenticated user

```
USAGE
  $ rockset api:apikeys:listApiKeys

OPTIONS
  -h, --help              show CLI help
  --columns=columns       only show provided columns (comma-separated)
  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/users/self/apikeys


  Endpoint Reference
  GET: /v1/orgs/self/users/self/apikeys
  List API Keys
  List all API keys for the authenticated user.

  More documentation at https://docs.rockset.com/rest-api#listapikeys

EXAMPLE
  $ rockset api:apikeys:listApiKeys
```

_See code: [src/commands/api/apikeys/listApiKeys.ts](../src/commands/api/apikeys/listApiKeys.ts)_

## `rockset api:apikeys:listApiKeysAdmin USER`

list all api keys for any user (admin only)

```
USAGE
  $ rockset api:apikeys:listApiKeysAdmin USER

OPTIONS
  -h, --help              show CLI help
  --columns=columns       only show provided columns (comma-separated)
  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/users/{user}/apikeys


  Endpoint Reference
  GET: /v1/orgs/self/users/{user}/apikeys
  List API Keys for any user (admin only)
  List all API keys for any user (admin only).

  More documentation at https://docs.rockset.com/rest-api#listapikeysadmin

EXAMPLE
  $ rockset api:apikeys:listApiKeysAdmin USER
```

_See code: [src/commands/api/apikeys/listApiKeysAdmin.ts](../src/commands/api/apikeys/listApiKeysAdmin.ts)_

## `rockset api:collections:createCollection WORKSPACE`

create new collection in a workspace

```
USAGE
  $ rockset api:collections:createCollection WORKSPACE

ARGUMENTS
  WORKSPACE  name of the workspace

OPTIONS
  -h, --help              show CLI help

  --body=body             (required) Path to a file whose contents will be passed as the POST body of this request.
                          Format must be [json|yaml]. An example schema is shown below.

  --columns=columns       only show provided columns (comma-separated)

  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to POST: /v1/orgs/self/ws/{workspace}/collections
  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       
  The POST body request schema has been omitted because it is too long. Please view the documentation at 
  https://docs.rockset.com/rest-api#createcollection to see the example.

  Endpoint Reference
  POST: /v1/orgs/self/ws/{workspace}/collections
  Create Collection
  Create new collection in a workspace.

  More documentation at https://docs.rockset.com/rest-api#createcollection
```

_See code: [src/commands/api/collections/createCollection.ts](../src/commands/api/collections/createCollection.ts)_

## `rockset api:collections:deleteCollection WORKSPACE COLLECTION`

delete a collection and all its documents from rockset

```
USAGE
  $ rockset api:collections:deleteCollection WORKSPACE COLLECTION

ARGUMENTS
  WORKSPACE   name of the workspace
  COLLECTION  name of the collection

OPTIONS
  -h, --help              show CLI help
  --columns=columns       only show provided columns (comma-separated)
  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to DELETE: 
  /v1/orgs/self/ws/{workspace}/collections/{collection}


  Endpoint Reference
  DELETE: /v1/orgs/self/ws/{workspace}/collections/{collection}
  Delete Collection
  Delete a collection and all its documents from Rockset.

  More documentation at https://docs.rockset.com/rest-api#deletecollection

EXAMPLE
  $ rockset api:collections:deleteCollection WORKSPACE COLLECTION
```

_See code: [src/commands/api/collections/deleteCollection.ts](../src/commands/api/collections/deleteCollection.ts)_

## `rockset api:collections:getCollection WORKSPACE COLLECTION`

get details about a collection

```
USAGE
  $ rockset api:collections:getCollection WORKSPACE COLLECTION

ARGUMENTS
  WORKSPACE   name of the workspace
  COLLECTION  name of the collection

OPTIONS
  -h, --help              show CLI help
  --columns=columns       only show provided columns (comma-separated)
  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to GET: 
  /v1/orgs/self/ws/{workspace}/collections/{collection}


  Endpoint Reference
  GET: /v1/orgs/self/ws/{workspace}/collections/{collection}
  Get Collection
  Get details about a collection.

  More documentation at https://docs.rockset.com/rest-api#getcollection

EXAMPLE
  $ rockset api:collections:getCollection WORKSPACE COLLECTION
```

_See code: [src/commands/api/collections/getCollection.ts](../src/commands/api/collections/getCollection.ts)_

## `rockset api:collections:listCollections`

retrieve all collections in an organization

```
USAGE
  $ rockset api:collections:listCollections

OPTIONS
  -h, --help              show CLI help
  --columns=columns       only show provided columns (comma-separated)
  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/collections


  Endpoint Reference
  GET: /v1/orgs/self/collections
  List Collections
  Retrieve all collections in an organization.

  More documentation at https://docs.rockset.com/rest-api#listcollections

EXAMPLE
  $ rockset api:collections:listCollections
```

_See code: [src/commands/api/collections/listCollections.ts](../src/commands/api/collections/listCollections.ts)_

## `rockset api:collections:listQueryLambdasInCollection WORKSPACE COLLECTION`

get all query lambdas that hit a specific rockset collection

```
USAGE
  $ rockset api:collections:listQueryLambdasInCollection WORKSPACE COLLECTION

ARGUMENTS
  WORKSPACE   name of the workspace
  COLLECTION  name of the collection

OPTIONS
  -h, --help              show CLI help
  --columns=columns       only show provided columns (comma-separated)
  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to GET: 
  /v1/orgs/self/ws/{workspace}/collections/{collection}/lambdas


  Endpoint Reference
  GET: /v1/orgs/self/ws/{workspace}/collections/{collection}/lambdas
  Get Query Lambdas
  Get all Query Lambdas that hit a specific Rockset Collection.

  More documentation at https://docs.rockset.com/rest-api#listquerylambdasincollection

EXAMPLE
  $ rockset api:collections:listQueryLambdasInCollection WORKSPACE COLLECTION
```

_See code: [src/commands/api/collections/listQueryLambdasInCollection.ts](../src/commands/api/collections/listQueryLambdasInCollection.ts)_

## `rockset api:collections:workspaceCollections WORKSPACE`

retrieve all collections in a workspace

```
USAGE
  $ rockset api:collections:workspaceCollections WORKSPACE

ARGUMENTS
  WORKSPACE  name of the workspace

OPTIONS
  -h, --help              show CLI help
  --columns=columns       only show provided columns (comma-separated)
  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/ws/{workspace}/collections


  Endpoint Reference
  GET: /v1/orgs/self/ws/{workspace}/collections
  List Collections for Workspace
  Retrieve all collections in a workspace.

  More documentation at https://docs.rockset.com/rest-api#workspacecollections

EXAMPLE
  $ rockset api:collections:workspaceCollections WORKSPACE
```

_See code: [src/commands/api/collections/workspaceCollections.ts](../src/commands/api/collections/workspaceCollections.ts)_

## `rockset api:documents:addDocuments WORKSPACE COLLECTION`

add documents to a collection in rockset

```
USAGE
  $ rockset api:documents:addDocuments WORKSPACE COLLECTION

ARGUMENTS
  WORKSPACE   name of the workspace
  COLLECTION  name of the collection

OPTIONS
  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this endpoint. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

  --body=body                    (required) Path to a file whose contents will be passed as the POST body of this
                                 request. Format must be [json|yaml]. An example schema is shown below.

  --columns=columns              only show provided columns (comma-separated)

  --output=csv|json|yaml         output in a more machine friendly format

  --raw                          Show the raw output from the server, instead of grabbing the results. Usually used in
                                 conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to POST: 
  /v1/orgs/self/ws/{workspace}/collections/{collection}/docs
  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       
  Example Body (YAML):
  data:
     - {}


  Endpoint Reference
  POST: /v1/orgs/self/ws/{workspace}/collections/{collection}/docs
  Add Documents
  Add documents to a collection in Rockset.

  More documentation at https://docs.rockset.com/rest-api#adddocuments

EXAMPLE
  $ rockset api:documents:addDocuments WORKSPACE COLLECTION --body body.yaml
  $ cat body.yaml
  data:
     - {}
```

_See code: [src/commands/api/documents/addDocuments.ts](../src/commands/api/documents/addDocuments.ts)_

## `rockset api:documents:deleteDocuments WORKSPACE COLLECTION`

delete documents from a collection in rockset

```
USAGE
  $ rockset api:documents:deleteDocuments WORKSPACE COLLECTION

ARGUMENTS
  WORKSPACE   name of the workspace
  COLLECTION  name of the collection

OPTIONS
  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this endpoint. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

  --body=body                    (required) Path to a file whose contents will be passed as the POST body of this
                                 request. Format must be [json|yaml]. An example schema is shown below.

  --columns=columns              only show provided columns (comma-separated)

  --output=csv|json|yaml         output in a more machine friendly format

  --raw                          Show the raw output from the server, instead of grabbing the results. Usually used in
                                 conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to DELETE: 
  /v1/orgs/self/ws/{workspace}/collections/{collection}/docs
  This endpoint REQUIRES a DELETE body. To specify a DELETE body, please pass a JSON or YAML file to the --body flag.
       
  Example Body (YAML):
  data:
     - _id: 2cd61e3b


  Endpoint Reference
  DELETE: /v1/orgs/self/ws/{workspace}/collections/{collection}/docs
  Delete Documents
  Delete documents from a collection in Rockset.

  More documentation at https://docs.rockset.com/rest-api#deletedocuments

EXAMPLE
  $ rockset api:documents:deleteDocuments WORKSPACE COLLECTION --body body.yaml
  $ cat body.yaml
  data:
     - _id: 2cd61e3b
```

_See code: [src/commands/api/documents/deleteDocuments.ts](../src/commands/api/documents/deleteDocuments.ts)_

## `rockset api:documents:patchDocuments WORKSPACE COLLECTION`

patch documents in a collection

```
USAGE
  $ rockset api:documents:patchDocuments WORKSPACE COLLECTION

ARGUMENTS
  WORKSPACE   name of the workspace
  COLLECTION  name of the collection

OPTIONS
  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this endpoint. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

  --body=body                    (required) Path to a file whose contents will be passed as the POST body of this
                                 request. Format must be [json|yaml]. An example schema is shown below.

  --columns=columns              only show provided columns (comma-separated)

  --output=csv|json|yaml         output in a more machine friendly format

  --raw                          Show the raw output from the server, instead of grabbing the results. Usually used in
                                 conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to PATCH: 
  /v1/orgs/self/ws/{workspace}/collections/{collection}/docs
  This endpoint REQUIRES a PATCH body. To specify a PATCH body, please pass a JSON or YAML file to the --body flag.
       
  Example Body (YAML):
  data:
     - _id: ca2d6832-1bfd-f88f-0620-d2aa27a5d86c
       patch:
         - op: add
           path: /foo/bar
           value: baz
           from: null


  Endpoint Reference
  PATCH: /v1/orgs/self/ws/{workspace}/collections/{collection}/docs
  Patch Documents
  Patch documents in a collection

  More documentation at https://docs.rockset.com/rest-api#patchdocuments

EXAMPLE
  $ rockset api:documents:patchDocuments WORKSPACE COLLECTION --body body.yaml
  $ cat body.yaml
  data:
     - _id: ca2d6832-1bfd-f88f-0620-d2aa27a5d86c
       patch:
         - op: add
           path: /foo/bar
           value: baz
           from: null
```

_See code: [src/commands/api/documents/patchDocuments.ts](../src/commands/api/documents/patchDocuments.ts)_

## `rockset api:integrations:createIntegration`

create a new integration with rockset

```
USAGE
  $ rockset api:integrations:createIntegration

OPTIONS
  -h, --help              show CLI help

  --body=body             (required) Path to a file whose contents will be passed as the POST body of this request.
                          Format must be [json|yaml]. An example schema is shown below.

  --columns=columns       only show provided columns (comma-separated)

  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to POST: /v1/orgs/self/integrations
  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       
  The POST body request schema has been omitted because it is too long. Please view the documentation at 
  https://docs.rockset.com/rest-api#createintegration to see the example.

  Endpoint Reference
  POST: /v1/orgs/self/integrations
  Create Integration
  Create a new integration with Rockset.

  More documentation at https://docs.rockset.com/rest-api#createintegration
```

_See code: [src/commands/api/integrations/createIntegration.ts](../src/commands/api/integrations/createIntegration.ts)_

## `rockset api:integrations:deleteIntegration INTEGRATION`

remove an integration

```
USAGE
  $ rockset api:integrations:deleteIntegration INTEGRATION

ARGUMENTS
  INTEGRATION  name of the integration

OPTIONS
  -h, --help              show CLI help
  --columns=columns       only show provided columns (comma-separated)
  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to DELETE: /v1/orgs/self/integrations/{integration}


  Endpoint Reference
  DELETE: /v1/orgs/self/integrations/{integration}
  Delete Integration
  Remove an integration.

  More documentation at https://docs.rockset.com/rest-api#deleteintegration

EXAMPLE
  $ rockset api:integrations:deleteIntegration INTEGRATION
```

_See code: [src/commands/api/integrations/deleteIntegration.ts](../src/commands/api/integrations/deleteIntegration.ts)_

## `rockset api:integrations:getIntegration INTEGRATION`

get information about a single integration

```
USAGE
  $ rockset api:integrations:getIntegration INTEGRATION

ARGUMENTS
  INTEGRATION  name of the integration

OPTIONS
  -h, --help              show CLI help
  --columns=columns       only show provided columns (comma-separated)
  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/integrations/{integration}


  Endpoint Reference
  GET: /v1/orgs/self/integrations/{integration}
  Get Integration
  Get information about a single integration.

  More documentation at https://docs.rockset.com/rest-api#getintegration

EXAMPLE
  $ rockset api:integrations:getIntegration INTEGRATION
```

_See code: [src/commands/api/integrations/getIntegration.ts](../src/commands/api/integrations/getIntegration.ts)_

## `rockset api:integrations:listIntegrations`

list all integrations for organization

```
USAGE
  $ rockset api:integrations:listIntegrations

OPTIONS
  -h, --help              show CLI help
  --columns=columns       only show provided columns (comma-separated)
  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/integrations


  Endpoint Reference
  GET: /v1/orgs/self/integrations
  List Integrations
  List all integrations for organization.

  More documentation at https://docs.rockset.com/rest-api#listintegrations

EXAMPLE
  $ rockset api:integrations:listIntegrations
```

_See code: [src/commands/api/integrations/listIntegrations.ts](../src/commands/api/integrations/listIntegrations.ts)_

## `rockset api:orgs:getOrganization`

retrieve information about current organization

```
USAGE
  $ rockset api:orgs:getOrganization

OPTIONS
  -h, --help              show CLI help
  --columns=columns       only show provided columns (comma-separated)
  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self


  Endpoint Reference
  GET: /v1/orgs/self
  Get Organization
  Retrieve information about current organization.

  More documentation at https://docs.rockset.com/rest-api#getorganization

EXAMPLE
  $ rockset api:orgs:getOrganization
```

_See code: [src/commands/api/orgs/getOrganization.ts](../src/commands/api/orgs/getOrganization.ts)_

## `rockset api:queries:query`

make a sql query to rockset

```
USAGE
  $ rockset api:queries:query

OPTIONS
  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this endpoint. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

  --body=body                    (required) Path to a file whose contents will be passed as the POST body of this
                                 request. Format must be [json|yaml]. An example schema is shown below.

  --columns=columns              only show provided columns (comma-separated)

  --output=csv|json|yaml         output in a more machine friendly format

  --raw                          Show the raw output from the server, instead of grabbing the results. Usually used in
                                 conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to POST: /v1/orgs/self/queries
  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       
  Example Body (YAML):
  sql:
     parameters:
       - name: _id
         type: string
         value: 85beb391
     query: SELECT * FROM foo where _id = :_id
     default_row_limit: null
     generate_warnings: null
     profiling_enabled: null


  Endpoint Reference
  POST: /v1/orgs/self/queries
  Query
  Make a SQL query to Rockset.

  More documentation at https://docs.rockset.com/rest-api#query

EXAMPLE
  $ rockset api:queries:query  --body body.yaml
  $ cat body.yaml
  sql:
     parameters:
       - name: _id
         type: string
         value: 85beb391
     query: SELECT * FROM foo where _id = :_id
     default_row_limit: null
     generate_warnings: null
     profiling_enabled: null
```

_See code: [src/commands/api/queries/query.ts](../src/commands/api/queries/query.ts)_

## `rockset api:queries:validate PARAMETERS`

validate a sql query with rockset's parser and planner

```
USAGE
  $ rockset api:queries:validate PARAMETERS

OPTIONS
  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this endpoint. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

  --body=body                    (required) Path to a file whose contents will be passed as the POST body of this
                                 request. Format must be [json|yaml]. An example schema is shown below.

  --columns=columns              only show provided columns (comma-separated)

  --output=csv|json|yaml         output in a more machine friendly format

  --raw                          Show the raw output from the server, instead of grabbing the results. Usually used in
                                 conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to POST: /v1/orgs/self/queries/validations
  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       
  Example Body (YAML):
  sql:
     parameters:
       - name: _id
         type: string
         value: 85beb391
     query: SELECT * FROM foo where _id = :_id
     default_row_limit: null
     generate_warnings: null
     profiling_enabled: null


  Endpoint Reference
  POST: /v1/orgs/self/queries/validations
  Validate Query
  Validate a SQL query with Rockset's parser and planner.

  More documentation at https://docs.rockset.com/rest-api#validate

EXAMPLE
  $ rockset api:queries:validate PARAMETERS --body body.yaml
  $ cat body.yaml
  sql:
     parameters:
       - name: _id
         type: string
         value: 85beb391
     query: SELECT * FROM foo where _id = :_id
     default_row_limit: null
     generate_warnings: null
     profiling_enabled: null
```

_See code: [src/commands/api/queries/validate.ts](../src/commands/api/queries/validate.ts)_

## `rockset api:queryLambdas:createQueryLambda WORKSPACE`

create a query lambda in given workspace

```
USAGE
  $ rockset api:queryLambdas:createQueryLambda WORKSPACE

ARGUMENTS
  WORKSPACE  name of the workspace

OPTIONS
  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this endpoint. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

  --body=body                    (required) Path to a file whose contents will be passed as the POST body of this
                                 request. Format must be [json|yaml]. An example schema is shown below.

  --columns=columns              only show provided columns (comma-separated)

  --output=csv|json|yaml         output in a more machine friendly format

  --raw                          Show the raw output from the server, instead of grabbing the results. Usually used in
                                 conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to POST: /v1/orgs/self/ws/{workspace}/lambdas
  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       
  Example Body (YAML):
  name: myQueryLambda
  description: production version foo
  sql:
     query: SELECT 'Foo'
     default_parameters:
       - name: _id
         type: string
         value: 85beb391


  Endpoint Reference
  POST: /v1/orgs/self/ws/{workspace}/lambdas
  Create Query Lambda
  Create a Query Lambda in given workspace.

  More documentation at https://docs.rockset.com/rest-api#createquerylambda

EXAMPLE
  $ rockset api:queryLambdas:createQueryLambda WORKSPACE --body body.yaml
  $ cat body.yaml
  name: myQueryLambda
  description: production version foo
  sql:
     query: SELECT 'Foo'
     default_parameters:
       - name: _id
         type: string
         value: 85beb391
```

_See code: [src/commands/api/queryLambdas/createQueryLambda.ts](../src/commands/api/queryLambdas/createQueryLambda.ts)_

## `rockset api:queryLambdas:createQueryLambdaTag WORKSPACE QUERYLAMBDA`

create a tag for a specific query lambda version, or update if it exists

```
USAGE
  $ rockset api:queryLambdas:createQueryLambdaTag WORKSPACE QUERYLAMBDA

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda

OPTIONS
  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this endpoint. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

  --body=body                    (required) Path to a file whose contents will be passed as the POST body of this
                                 request. Format must be [json|yaml]. An example schema is shown below.

  --columns=columns              only show provided columns (comma-separated)

  --output=csv|json|yaml         output in a more machine friendly format

  --raw                          Show the raw output from the server, instead of grabbing the results. Usually used in
                                 conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to POST: 
  /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags
  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       
  Example Body (YAML):
  tag_name: production
  version: 123ABC


  Endpoint Reference
  POST: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags
  Create Query Lambda Tag
  Create a tag for a specific Query Lambda version, or update if it exists

  More documentation at https://docs.rockset.com/rest-api#createquerylambdatag

EXAMPLE
  $ rockset api:queryLambdas:createQueryLambdaTag WORKSPACE QUERYLAMBDA --body body.yaml
  $ cat body.yaml
  tag_name: production
  version: 123ABC
```

_See code: [src/commands/api/queryLambdas/createQueryLambdaTag.ts](../src/commands/api/queryLambdas/createQueryLambdaTag.ts)_

## `rockset api:queryLambdas:deleteQueryLambda WORKSPACE QUERYLAMBDA`

delete a query lambda

```
USAGE
  $ rockset api:queryLambdas:deleteQueryLambda WORKSPACE QUERYLAMBDA

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda

OPTIONS
  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this endpoint. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

  --columns=columns              only show provided columns (comma-separated)

  --output=csv|json|yaml         output in a more machine friendly format

  --raw                          Show the raw output from the server, instead of grabbing the results. Usually used in
                                 conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to DELETE: 
  /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}


  Endpoint Reference
  DELETE: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}
  Delete Query Lambda
  Delete a Query Lambda.

  More documentation at https://docs.rockset.com/rest-api#deletequerylambda

EXAMPLE
  $ rockset api:queryLambdas:deleteQueryLambda WORKSPACE QUERYLAMBDA
```

_See code: [src/commands/api/queryLambdas/deleteQueryLambda.ts](../src/commands/api/queryLambdas/deleteQueryLambda.ts)_

## `rockset api:queryLambdas:deleteQueryLambdaTag WORKSPACE QUERYLAMBDA TAG`

delete a tag for a specific query lambda

```
USAGE
  $ rockset api:queryLambdas:deleteQueryLambdaTag WORKSPACE QUERYLAMBDA TAG

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda
  TAG          name of the tag

OPTIONS
  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this endpoint. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

  --columns=columns              only show provided columns (comma-separated)

  --output=csv|json|yaml         output in a more machine friendly format

  --raw                          Show the raw output from the server, instead of grabbing the results. Usually used in
                                 conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to DELETE: 
  /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags/{tag}


  Endpoint Reference
  DELETE: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags/{tag}
  Delete Query Lambda Tag Version
  Delete a tag for a specific Query Lambda

  More documentation at https://docs.rockset.com/rest-api#deletequerylambdatag

EXAMPLE
  $ rockset api:queryLambdas:deleteQueryLambdaTag WORKSPACE QUERYLAMBDA TAG
```

_See code: [src/commands/api/queryLambdas/deleteQueryLambdaTag.ts](../src/commands/api/queryLambdas/deleteQueryLambdaTag.ts)_

## `rockset api:queryLambdas:deleteQueryLambdaVersion WORKSPACE QUERYLAMBDA VERSION`

delete a query lambda version

```
USAGE
  $ rockset api:queryLambdas:deleteQueryLambdaVersion WORKSPACE QUERYLAMBDA VERSION

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda
  VERSION      version

OPTIONS
  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this endpoint. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

  --columns=columns              only show provided columns (comma-separated)

  --output=csv|json|yaml         output in a more machine friendly format

  --raw                          Show the raw output from the server, instead of grabbing the results. Usually used in
                                 conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to DELETE: 
  /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/version/{version}


  Endpoint Reference
  DELETE: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/version/{version}
  Delete Query Lambda Version
  Delete a Query Lambda version.

  More documentation at https://docs.rockset.com/rest-api#deletequerylambdaversion

EXAMPLE
  $ rockset api:queryLambdas:deleteQueryLambdaVersion WORKSPACE QUERYLAMBDA VERSION
```

_See code: [src/commands/api/queryLambdas/deleteQueryLambdaVersion.ts](../src/commands/api/queryLambdas/deleteQueryLambdaVersion.ts)_

## `rockset api:queryLambdas:executeQueryLambda WORKSPACE QUERYLAMBDA VERSION`

run a particular version of a query lambda

```
USAGE
  $ rockset api:queryLambdas:executeQueryLambda WORKSPACE QUERYLAMBDA VERSION

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda
  VERSION      version

OPTIONS
  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this endpoint. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

  --body=body                    Path to a file whose contents will be passed as the POST body of this request. Format
                                 must be [json|yaml]. An example schema is shown below.

  --columns=columns              only show provided columns (comma-separated)

  --output=csv|json|yaml         output in a more machine friendly format

  --raw                          Show the raw output from the server, instead of grabbing the results. Usually used in
                                 conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to POST: 
  /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions/{version}
  This endpoint optionally accepts a POST body. To specify a POST body, please pass a JSON or YAML file to the --body 
  flag.
       
  Example Body (YAML):
  parameters:
     - name: _id
       type: string
       value: 85beb391
  default_row_limit: null
  generate_warnings: null


  Endpoint Reference
  POST: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions/{version}
  Run Query Lambda
  Run a particular version of a Query Lambda.

  More documentation at https://docs.rockset.com/rest-api#executequerylambda

EXAMPLES
  $ rockset api:queryLambdas:executeQueryLambda WORKSPACE QUERYLAMBDA VERSION
  $ rockset api:queryLambdas:executeQueryLambda WORKSPACE QUERYLAMBDA VERSION --body body.yaml
  $ cat body.yaml
  parameters:
     - name: _id
       type: string
       value: 85beb391
  default_row_limit: null
  generate_warnings: null
```

_See code: [src/commands/api/queryLambdas/executeQueryLambda.ts](../src/commands/api/queryLambdas/executeQueryLambda.ts)_

## `rockset api:queryLambdas:executeQueryLambdaByTag WORKSPACE QUERYLAMBDA TAG`

run the query lambda version associated with a given tag

```
USAGE
  $ rockset api:queryLambdas:executeQueryLambdaByTag WORKSPACE QUERYLAMBDA TAG

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda
  TAG          tag

OPTIONS
  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this endpoint. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

  --body=body                    Path to a file whose contents will be passed as the POST body of this request. Format
                                 must be [json|yaml]. An example schema is shown below.

  --columns=columns              only show provided columns (comma-separated)

  --output=csv|json|yaml         output in a more machine friendly format

  --raw                          Show the raw output from the server, instead of grabbing the results. Usually used in
                                 conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to POST: 
  /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags/{tag}
  This endpoint optionally accepts a POST body. To specify a POST body, please pass a JSON or YAML file to the --body 
  flag.
       
  Example Body (YAML):
  parameters:
     - name: _id
       type: string
       value: 85beb391
  default_row_limit: null
  generate_warnings: null


  Endpoint Reference
  POST: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags/{tag}
  Run Query Lambda By Tag
  Run the Query Lambda version associated with a given tag.

  More documentation at https://docs.rockset.com/rest-api#executequerylambdabytag

EXAMPLES
  $ rockset api:queryLambdas:executeQueryLambdaByTag WORKSPACE QUERYLAMBDA TAG
  $ rockset api:queryLambdas:executeQueryLambdaByTag WORKSPACE QUERYLAMBDA TAG --body body.yaml
  $ cat body.yaml
  parameters:
     - name: _id
       type: string
       value: 85beb391
  default_row_limit: null
  generate_warnings: null
```

_See code: [src/commands/api/queryLambdas/executeQueryLambdaByTag.ts](../src/commands/api/queryLambdas/executeQueryLambdaByTag.ts)_

## `rockset api:queryLambdas:getQueryLambdaTagVersion WORKSPACE QUERYLAMBDA TAG`

get the specific query lambda version associated with a given tag

```
USAGE
  $ rockset api:queryLambdas:getQueryLambdaTagVersion WORKSPACE QUERYLAMBDA TAG

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda
  TAG          name of the tag

OPTIONS
  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this endpoint. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

  --columns=columns              only show provided columns (comma-separated)

  --output=csv|json|yaml         output in a more machine friendly format

  --raw                          Show the raw output from the server, instead of grabbing the results. Usually used in
                                 conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to GET: 
  /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags/{tag}


  Endpoint Reference
  GET: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags/{tag}
  Get Query Lambda Tag
  Get the specific Query Lambda version associated with a given tag

  More documentation at https://docs.rockset.com/rest-api#getquerylambdatagversion

EXAMPLE
  $ rockset api:queryLambdas:getQueryLambdaTagVersion WORKSPACE QUERYLAMBDA TAG
```

_See code: [src/commands/api/queryLambdas/getQueryLambdaTagVersion.ts](../src/commands/api/queryLambdas/getQueryLambdaTagVersion.ts)_

## `rockset api:queryLambdas:getQueryLambdaVersion WORKSPACE QUERYLAMBDA VERSION`

get a specific version of a query lambda

```
USAGE
  $ rockset api:queryLambdas:getQueryLambdaVersion WORKSPACE QUERYLAMBDA VERSION

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda
  VERSION      version

OPTIONS
  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this endpoint. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

  --columns=columns              only show provided columns (comma-separated)

  --output=csv|json|yaml         output in a more machine friendly format

  --raw                          Show the raw output from the server, instead of grabbing the results. Usually used in
                                 conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to GET: 
  /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions/{version}


  Endpoint Reference
  GET: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions/{version}
  Get Query Lambda Version
  Get a specific version of a Query Lambda

  More documentation at https://docs.rockset.com/rest-api#getquerylambdaversion

EXAMPLE
  $ rockset api:queryLambdas:getQueryLambdaVersion WORKSPACE QUERYLAMBDA VERSION
```

_See code: [src/commands/api/queryLambdas/getQueryLambdaVersion.ts](../src/commands/api/queryLambdas/getQueryLambdaVersion.ts)_

## `rockset api:queryLambdas:listAllQueryLambdas`

list all query lambdas

```
USAGE
  $ rockset api:queryLambdas:listAllQueryLambdas

OPTIONS
  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this endpoint. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

  --columns=columns              only show provided columns (comma-separated)

  --output=csv|json|yaml         output in a more machine friendly format

  --raw                          Show the raw output from the server, instead of grabbing the results. Usually used in
                                 conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/lambdas


  Endpoint Reference
  GET: /v1/orgs/self/lambdas
  List Query Lambdas
  List all Query Lambdas.

  More documentation at https://docs.rockset.com/rest-api#listallquerylambdas

EXAMPLE
  $ rockset api:queryLambdas:listAllQueryLambdas
```

_See code: [src/commands/api/queryLambdas/listAllQueryLambdas.ts](../src/commands/api/queryLambdas/listAllQueryLambdas.ts)_

## `rockset api:queryLambdas:listOrganizationTags`

list all tags in an organization

```
USAGE
  $ rockset api:queryLambdas:listOrganizationTags

OPTIONS
  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this endpoint. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

  --columns=columns              only show provided columns (comma-separated)

  --output=csv|json|yaml         output in a more machine friendly format

  --raw                          Show the raw output from the server, instead of grabbing the results. Usually used in
                                 conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/lambdas/tags


  Endpoint Reference
  GET: /v1/orgs/self/lambdas/tags
  List Query Lambda Tags
  List all tags in an organization

  More documentation at https://docs.rockset.com/rest-api#listorganizationtags

EXAMPLE
  $ rockset api:queryLambdas:listOrganizationTags
```

_See code: [src/commands/api/queryLambdas/listOrganizationTags.ts](../src/commands/api/queryLambdas/listOrganizationTags.ts)_

## `rockset api:queryLambdas:listQueryLambdaTagVersions TAG`

list all query lambda versions associated with a tag

```
USAGE
  $ rockset api:queryLambdas:listQueryLambdaTagVersions TAG

ARGUMENTS
  TAG  name of the tag

OPTIONS
  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this endpoint. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

  --columns=columns              only show provided columns (comma-separated)

  --output=csv|json|yaml         output in a more machine friendly format

  --raw                          Show the raw output from the server, instead of grabbing the results. Usually used in
                                 conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/lambdas/tags/{tag}


  Endpoint Reference
  GET: /v1/orgs/self/lambdas/tags/{tag}
  List Query Lambda Tag Versions
  List all Query Lambda versions associated with a tag

  More documentation at https://docs.rockset.com/rest-api#listquerylambdatagversions

EXAMPLE
  $ rockset api:queryLambdas:listQueryLambdaTagVersions TAG
```

_See code: [src/commands/api/queryLambdas/listQueryLambdaTagVersions.ts](../src/commands/api/queryLambdas/listQueryLambdaTagVersions.ts)_

## `rockset api:queryLambdas:listQueryLambdaTags WORKSPACE QUERYLAMBDA`

list all tags associated with a query lambda

```
USAGE
  $ rockset api:queryLambdas:listQueryLambdaTags WORKSPACE QUERYLAMBDA

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda

OPTIONS
  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this endpoint. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

  --columns=columns              only show provided columns (comma-separated)

  --output=csv|json|yaml         output in a more machine friendly format

  --raw                          Show the raw output from the server, instead of grabbing the results. Usually used in
                                 conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to GET: 
  /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags


  Endpoint Reference
  GET: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags
  List Query Lambda Tags
  List all tags associated with a Query Lambda

  More documentation at https://docs.rockset.com/rest-api#listquerylambdatags

EXAMPLE
  $ rockset api:queryLambdas:listQueryLambdaTags WORKSPACE QUERYLAMBDA
```

_See code: [src/commands/api/queryLambdas/listQueryLambdaTags.ts](../src/commands/api/queryLambdas/listQueryLambdaTags.ts)_

## `rockset api:queryLambdas:listQueryLambdaVersions WORKSPACE QUERYLAMBDA`

list all versions of a query lambda

```
USAGE
  $ rockset api:queryLambdas:listQueryLambdaVersions WORKSPACE QUERYLAMBDA

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda

OPTIONS
  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this endpoint. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

  --columns=columns              only show provided columns (comma-separated)

  --output=csv|json|yaml         output in a more machine friendly format

  --raw                          Show the raw output from the server, instead of grabbing the results. Usually used in
                                 conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to GET: 
  /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions


  Endpoint Reference
  GET: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions
  List Query Lambda Versions
  List all versions of a Query Lambda.

  More documentation at https://docs.rockset.com/rest-api#listquerylambdaversions

EXAMPLE
  $ rockset api:queryLambdas:listQueryLambdaVersions WORKSPACE QUERYLAMBDA
```

_See code: [src/commands/api/queryLambdas/listQueryLambdaVersions.ts](../src/commands/api/queryLambdas/listQueryLambdaVersions.ts)_

## `rockset api:queryLambdas:listQueryLambdasInWorkspace WORKSPACE`

list all query lambdas under given workspace

```
USAGE
  $ rockset api:queryLambdas:listQueryLambdasInWorkspace WORKSPACE

ARGUMENTS
  WORKSPACE  name of the workspace

OPTIONS
  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this endpoint. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

  --columns=columns              only show provided columns (comma-separated)

  --output=csv|json|yaml         output in a more machine friendly format

  --raw                          Show the raw output from the server, instead of grabbing the results. Usually used in
                                 conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/ws/{workspace}/lambdas


  Endpoint Reference
  GET: /v1/orgs/self/ws/{workspace}/lambdas
  List Query Lambdas
  List all Query Lambdas under given workspace.

  More documentation at https://docs.rockset.com/rest-api#listquerylambdasinworkspace

EXAMPLE
  $ rockset api:queryLambdas:listQueryLambdasInWorkspace WORKSPACE
```

_See code: [src/commands/api/queryLambdas/listQueryLambdasInWorkspace.ts](../src/commands/api/queryLambdas/listQueryLambdasInWorkspace.ts)_

## `rockset api:queryLambdas:updateQueryLambda WORKSPACE QUERYLAMBDA CREATE`

create a new version of a query lambda in given workspace

```
USAGE
  $ rockset api:queryLambdas:updateQueryLambda WORKSPACE QUERYLAMBDA CREATE

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda
  CREATE

OPTIONS
  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this endpoint. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

  --body=body                    (required) Path to a file whose contents will be passed as the POST body of this
                                 request. Format must be [json|yaml]. An example schema is shown below.

  --columns=columns              only show provided columns (comma-separated)

  --output=csv|json|yaml         output in a more machine friendly format

  --raw                          Show the raw output from the server, instead of grabbing the results. Usually used in
                                 conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to POST: 
  /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions
  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       
  Example Body (YAML):
  description: production version foo
  sql:
     query: SELECT 'Foo'
     default_parameters:
       - name: _id
         type: string
         value: 85beb391


  Endpoint Reference
  POST: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions
  Update Query Lambda
  Create a new version of a Query Lambda in given workspace.

  More documentation at https://docs.rockset.com/rest-api#updatequerylambda

EXAMPLE
  $ rockset api:queryLambdas:updateQueryLambda WORKSPACE QUERYLAMBDA CREATE --body body.yaml
  $ cat body.yaml
  description: production version foo
  sql:
     query: SELECT 'Foo'
     default_parameters:
       - name: _id
         type: string
         value: 85beb391
```

_See code: [src/commands/api/queryLambdas/updateQueryLambda.ts](../src/commands/api/queryLambdas/updateQueryLambda.ts)_

## `rockset api:users:createUser`

create a new user for an organization

```
USAGE
  $ rockset api:users:createUser

OPTIONS
  -h, --help              show CLI help

  --body=body             (required) Path to a file whose contents will be passed as the POST body of this request.
                          Format must be [json|yaml]. An example schema is shown below.

  --columns=columns       only show provided columns (comma-separated)

  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to POST: /v1/orgs/self/users
  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       
  Example Body (YAML):
  email: hello@rockset.com
  roles:
     - admin
     - member
     - read-only


  Endpoint Reference
  POST: /v1/orgs/self/users
  Create User
  Create a new user for an organization.

  More documentation at https://docs.rockset.com/rest-api#createuser

EXAMPLE
  $ rockset api:users:createUser  --body body.yaml
  $ cat body.yaml
  email: hello@rockset.com
  roles:
     - admin
     - member
     - read-only
```

_See code: [src/commands/api/users/createUser.ts](../src/commands/api/users/createUser.ts)_

## `rockset api:users:deleteUser USER`

delete a user from an organization

```
USAGE
  $ rockset api:users:deleteUser USER

ARGUMENTS
  USER  user email

OPTIONS
  -h, --help              show CLI help
  --columns=columns       only show provided columns (comma-separated)
  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to DELETE: /v1/orgs/self/users/{user}


  Endpoint Reference
  DELETE: /v1/orgs/self/users/{user}
  Delete User
  Delete a user from an organization.

  More documentation at https://docs.rockset.com/rest-api#deleteuser

EXAMPLE
  $ rockset api:users:deleteUser USER
```

_See code: [src/commands/api/users/deleteUser.ts](../src/commands/api/users/deleteUser.ts)_

## `rockset api:users:getCurrentUser`

retrieve currently active user

```
USAGE
  $ rockset api:users:getCurrentUser

OPTIONS
  -h, --help              show CLI help
  --columns=columns       only show provided columns (comma-separated)
  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/users/self


  Endpoint Reference
  GET: /v1/orgs/self/users/self
  Get Current User
  Retrieve currently active user.

  More documentation at https://docs.rockset.com/rest-api#getcurrentuser

EXAMPLE
  $ rockset api:users:getCurrentUser
```

_See code: [src/commands/api/users/getCurrentUser.ts](../src/commands/api/users/getCurrentUser.ts)_

## `rockset api:users:listUsers`

retrieve all users for an organization

```
USAGE
  $ rockset api:users:listUsers

OPTIONS
  -h, --help              show CLI help
  --columns=columns       only show provided columns (comma-separated)
  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/users


  Endpoint Reference
  GET: /v1/orgs/self/users
  List Users
  Retrieve all users for an organization.

  More documentation at https://docs.rockset.com/rest-api#listusers

EXAMPLE
  $ rockset api:users:listUsers
```

_See code: [src/commands/api/users/listUsers.ts](../src/commands/api/users/listUsers.ts)_

## `rockset api:workspaces:childWorkspaces WORKSPACE`

list workspaces under given workspace

```
USAGE
  $ rockset api:workspaces:childWorkspaces WORKSPACE

ARGUMENTS
  WORKSPACE  name of the workspace

OPTIONS
  -h, --help              show CLI help
  --columns=columns       only show provided columns (comma-separated)
  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/ws/{workspace}/ws


  Endpoint Reference
  GET: /v1/orgs/self/ws/{workspace}/ws
  List Workspaces
  List workspaces under given workspace.

  More documentation at https://docs.rockset.com/rest-api#childworkspaces

EXAMPLE
  $ rockset api:workspaces:childWorkspaces WORKSPACE
```

_See code: [src/commands/api/workspaces/childWorkspaces.ts](../src/commands/api/workspaces/childWorkspaces.ts)_

## `rockset api:workspaces:createWorkspace`

create a new workspace in your org

```
USAGE
  $ rockset api:workspaces:createWorkspace

OPTIONS
  -h, --help              show CLI help

  --body=body             (required) Path to a file whose contents will be passed as the POST body of this request.
                          Format must be [json|yaml]. An example schema is shown below.

  --columns=columns       only show provided columns (comma-separated)

  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to POST: /v1/orgs/self/ws
  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.
       
  Example Body (YAML):
  name: event_logs
  description: Datasets of system logs for the ops team.


  Endpoint Reference
  POST: /v1/orgs/self/ws
  Create Workspace
  Create a new workspace in your org.

  More documentation at https://docs.rockset.com/rest-api#createworkspace

EXAMPLE
  $ rockset api:workspaces:createWorkspace  --body body.yaml
  $ cat body.yaml
  name: event_logs
  description: Datasets of system logs for the ops team.
```

_See code: [src/commands/api/workspaces/createWorkspace.ts](../src/commands/api/workspaces/createWorkspace.ts)_

## `rockset api:workspaces:deleteWorkspace WORKSPACE`

remove a workspace

```
USAGE
  $ rockset api:workspaces:deleteWorkspace WORKSPACE

ARGUMENTS
  WORKSPACE  name of the workspace

OPTIONS
  -h, --help              show CLI help
  --columns=columns       only show provided columns (comma-separated)
  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to DELETE: /v1/orgs/self/ws/{workspace}


  Endpoint Reference
  DELETE: /v1/orgs/self/ws/{workspace}
  Delete Workspace
  Remove a workspace.

  More documentation at https://docs.rockset.com/rest-api#deleteworkspace

EXAMPLE
  $ rockset api:workspaces:deleteWorkspace WORKSPACE
```

_See code: [src/commands/api/workspaces/deleteWorkspace.ts](../src/commands/api/workspaces/deleteWorkspace.ts)_

## `rockset api:workspaces:getWorkspace WORKSPACE`

get information about a single workspace

```
USAGE
  $ rockset api:workspaces:getWorkspace WORKSPACE

ARGUMENTS
  WORKSPACE  name of the workspace

OPTIONS
  -h, --help              show CLI help
  --columns=columns       only show provided columns (comma-separated)
  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/ws/{workspace}


  Endpoint Reference
  GET: /v1/orgs/self/ws/{workspace}
  Get Workspace
  Get information about a single workspace.

  More documentation at https://docs.rockset.com/rest-api#getworkspace

EXAMPLE
  $ rockset api:workspaces:getWorkspace WORKSPACE
```

_See code: [src/commands/api/workspaces/getWorkspace.ts](../src/commands/api/workspaces/getWorkspace.ts)_

## `rockset api:workspaces:listWorkspaces`

list all workspaces

```
USAGE
  $ rockset api:workspaces:listWorkspaces

OPTIONS
  -h, --help              show CLI help
  --columns=columns       only show provided columns (comma-separated)
  --output=csv|json|yaml  output in a more machine friendly format

  --raw                   Show the raw output from the server, instead of grabbing the results. Usually used in
                          conjunction with --output=json

DESCRIPTION
  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/ws


  Endpoint Reference
  GET: /v1/orgs/self/ws
  List Workspaces
  List all workspaces.

  More documentation at https://docs.rockset.com/rest-api#listworkspaces

EXAMPLE
  $ rockset api:workspaces:listWorkspaces
```

_See code: [src/commands/api/workspaces/listWorkspaces.ts](../src/commands/api/workspaces/listWorkspaces.ts)_
