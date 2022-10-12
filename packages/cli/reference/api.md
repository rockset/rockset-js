`rockset api`
=============

wrappers for Rockset's API endpoints (full documentation at https://docs.rockset.com/rest-api)

* [`rockset api aliases createAlias WORKSPACE`](#rockset-api-aliases-createalias-workspace)
* [`rockset api aliases deleteAlias WORKSPACE ALIAS`](#rockset-api-aliases-deletealias-workspace-alias)
* [`rockset api aliases getAlias WORKSPACE ALIAS`](#rockset-api-aliases-getalias-workspace-alias)
* [`rockset api aliases listAliases`](#rockset-api-aliases-listaliases)
* [`rockset api aliases updateAlias WORKSPACE ALIAS`](#rockset-api-aliases-updatealias-workspace-alias)
* [`rockset api aliases workspaceAliases WORKSPACE`](#rockset-api-aliases-workspacealiases-workspace)
* [`rockset api apikeys createApiKey`](#rockset-api-apikeys-createapikey)
* [`rockset api apikeys deleteApiKey NAME USER`](#rockset-api-apikeys-deleteapikey-name-user)
* [`rockset api apikeys getApiKey USER NAME`](#rockset-api-apikeys-getapikey-user-name)
* [`rockset api apikeys listApiKeys USER`](#rockset-api-apikeys-listapikeys-user)
* [`rockset api apikeys updateApiKey NAME USER`](#rockset-api-apikeys-updateapikey-name-user)
* [`rockset api collections createCollection WORKSPACE`](#rockset-api-collections-createcollection-workspace)
* [`rockset api collections deleteCollection WORKSPACE COLLECTION`](#rockset-api-collections-deletecollection-workspace-collection)
* [`rockset api collections getCollection WORKSPACE COLLECTION`](#rockset-api-collections-getcollection-workspace-collection)
* [`rockset api collections listCollections`](#rockset-api-collections-listcollections)
* [`rockset api collections workspaceCollections WORKSPACE`](#rockset-api-collections-workspacecollections-workspace)
* [`rockset api customRolesBeta createRole`](#rockset-api-customrolesbeta-createrole)
* [`rockset api customRolesBeta deleteRole ROLENAME`](#rockset-api-customrolesbeta-deleterole-rolename)
* [`rockset api customRolesBeta listRoles`](#rockset-api-customrolesbeta-listroles)
* [`rockset api customRolesBeta updateRole ROLENAME`](#rockset-api-customrolesbeta-updaterole-rolename)
* [`rockset api documents addDocuments WORKSPACE COLLECTION`](#rockset-api-documents-adddocuments-workspace-collection)
* [`rockset api documents deleteDocuments WORKSPACE COLLECTION`](#rockset-api-documents-deletedocuments-workspace-collection)
* [`rockset api documents patchDocuments WORKSPACE COLLECTION`](#rockset-api-documents-patchdocuments-workspace-collection)
* [`rockset api integrations createIntegration`](#rockset-api-integrations-createintegration)
* [`rockset api integrations deleteIntegration INTEGRATION`](#rockset-api-integrations-deleteintegration-integration)
* [`rockset api integrations getIntegration INTEGRATION`](#rockset-api-integrations-getintegration-integration)
* [`rockset api integrations listIntegrations`](#rockset-api-integrations-listintegrations)
* [`rockset api orgs getOrganization`](#rockset-api-orgs-getorganization)
* [`rockset api queries query`](#rockset-api-queries-query)
* [`rockset api queries validate`](#rockset-api-queries-validate)
* [`rockset api queryLambdas createQueryLambda WORKSPACE`](#rockset-api-querylambdas-createquerylambda-workspace)
* [`rockset api queryLambdas createQueryLambdaTag WORKSPACE QUERYLAMBDA`](#rockset-api-querylambdas-createquerylambdatag-workspace-querylambda)
* [`rockset api queryLambdas deleteQueryLambda WORKSPACE QUERYLAMBDA`](#rockset-api-querylambdas-deletequerylambda-workspace-querylambda)
* [`rockset api queryLambdas deleteQueryLambdaVersion WORKSPACE QUERYLAMBDA VERSION`](#rockset-api-querylambdas-deletequerylambdaversion-workspace-querylambda-version)
* [`rockset api queryLambdas executeQueryLambda WORKSPACE QUERYLAMBDA VERSION`](#rockset-api-querylambdas-executequerylambda-workspace-querylambda-version)
* [`rockset api queryLambdas executeQueryLambdaByTag WORKSPACE QUERYLAMBDA TAG`](#rockset-api-querylambdas-executequerylambdabytag-workspace-querylambda-tag)
* [`rockset api queryLambdas getQueryLambdaTagVersion WORKSPACE QUERYLAMBDA TAG`](#rockset-api-querylambdas-getquerylambdatagversion-workspace-querylambda-tag)
* [`rockset api queryLambdas getQueryLambdaVersion WORKSPACE QUERYLAMBDA VERSION`](#rockset-api-querylambdas-getquerylambdaversion-workspace-querylambda-version)
* [`rockset api queryLambdas listAllQueryLambdas`](#rockset-api-querylambdas-listallquerylambdas)
* [`rockset api queryLambdas listQueryLambdaTags WORKSPACE QUERYLAMBDA`](#rockset-api-querylambdas-listquerylambdatags-workspace-querylambda)
* [`rockset api queryLambdas listQueryLambdaVersions WORKSPACE QUERYLAMBDA`](#rockset-api-querylambdas-listquerylambdaversions-workspace-querylambda)
* [`rockset api queryLambdas listQueryLambdasInWorkspace WORKSPACE`](#rockset-api-querylambdas-listquerylambdasinworkspace-workspace)
* [`rockset api queryLambdas updateQueryLambda WORKSPACE QUERYLAMBDA CREATE`](#rockset-api-querylambdas-updatequerylambda-workspace-querylambda-create)
* [`rockset api users createUser`](#rockset-api-users-createuser)
* [`rockset api users deleteUser USER`](#rockset-api-users-deleteuser-user)
* [`rockset api users getCurrentUser`](#rockset-api-users-getcurrentuser)
* [`rockset api users getUser USER`](#rockset-api-users-getuser-user)
* [`rockset api users listUnsubscribePreferences`](#rockset-api-users-listunsubscribepreferences)
* [`rockset api users listUsers`](#rockset-api-users-listusers)
* [`rockset api users updateUnsubscribePreferences`](#rockset-api-users-updateunsubscribepreferences)
* [`rockset api views createView WORKSPACE`](#rockset-api-views-createview-workspace)
* [`rockset api views deleteView WORKSPACE VIEW`](#rockset-api-views-deleteview-workspace-view)
* [`rockset api views getView WORKSPACE VIEW`](#rockset-api-views-getview-workspace-view)
* [`rockset api views listViews`](#rockset-api-views-listviews)
* [`rockset api views updateView WORKSPACE VIEW`](#rockset-api-views-updateview-workspace-view)
* [`rockset api views workspaceViews WORKSPACE`](#rockset-api-views-workspaceviews-workspace)
* [`rockset api virtualInstances getVirtualInstance VIRTUALINSTANCEID`](#rockset-api-virtualinstances-getvirtualinstance-virtualinstanceid)
* [`rockset api virtualInstances listVirtualInstances`](#rockset-api-virtualinstances-listvirtualinstances)
* [`rockset api virtualInstances setVirtualInstance VIRTUALINSTANCEID`](#rockset-api-virtualinstances-setvirtualinstance-virtualinstanceid)
* [`rockset api workspaces childWorkspaces WORKSPACE`](#rockset-api-workspaces-childworkspaces-workspace)
* [`rockset api workspaces createWorkspace`](#rockset-api-workspaces-createworkspace)
* [`rockset api workspaces deleteWorkspace WORKSPACE`](#rockset-api-workspaces-deleteworkspace-workspace)
* [`rockset api workspaces getWorkspace WORKSPACE`](#rockset-api-workspaces-getworkspace-workspace)
* [`rockset api workspaces listWorkspaces FETCH_ACROSS_REGIONS`](#rockset-api-workspaces-listworkspaces-fetch_across_regions)

## `rockset api aliases createAlias WORKSPACE`

create new alias in a workspace

```
USAGE
  $ rockset api aliases createAlias [WORKSPACE] --body <value> [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml | 
    | ]

ARGUMENTS
  WORKSPACE  name of the workspace

FLAGS
  -h, --help         Show CLI help.
  --body=<value>     (required) Path to a file whose contents will be passed as the POST body of this request. Format
                     must be [json|yaml]. An example schema is shown below.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  create new alias in a workspace

  Arguments to this command will be passed as URL parameters to POST: /v1/orgs/self/ws/{workspace}/aliases

  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.



  Example Body (YAML):

  name: aliasName

  description: version alias

  collections:

  - commons.foo

  - prod.demo

  Endpoint Reference

  POST: /v1/orgs/self/ws/{workspace}/aliases

  Create Alias

  Create new alias in a workspace.

  More documentation at https://docs.rockset.com/rest-api#createalias

EXAMPLES
  $ rockset api:aliases:createAlias WORKSPACE --body body.yaml
  $ cat body.yaml
  name: aliasName
  description: version alias
  collections:
    - commons.foo
    - prod.demo
```

## `rockset api aliases deleteAlias WORKSPACE ALIAS`

delete an alias

```
USAGE
  $ rockset api aliases deleteAlias [WORKSPACE] [ALIAS] [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  |
  ]

ARGUMENTS
  WORKSPACE  name of the workspace
  ALIAS      name of the alias

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  delete an alias

  Arguments to this command will be passed as URL parameters to DELETE: /v1/orgs/self/ws/{workspace}/aliases/{alias}

  Endpoint Reference

  DELETE: /v1/orgs/self/ws/{workspace}/aliases/{alias}

  Delete Alias

  Delete an alias.

  More documentation at https://docs.rockset.com/rest-api#deletealias

EXAMPLES
  $ rockset api:aliases:deleteAlias WORKSPACE ALIAS
```

## `rockset api aliases getAlias WORKSPACE ALIAS`

get details about an alias

```
USAGE
  $ rockset api aliases getAlias [WORKSPACE] [ALIAS] [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ]

ARGUMENTS
  WORKSPACE  name of the workspace
  ALIAS      name of the alias

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  get details about an alias

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/ws/{workspace}/aliases/{alias}

  Endpoint Reference

  GET: /v1/orgs/self/ws/{workspace}/aliases/{alias}

  Retrieve Alias

  Get details about an alias

  More documentation at https://docs.rockset.com/rest-api#getalias

EXAMPLES
  $ rockset api:aliases:getAlias WORKSPACE ALIAS
```

## `rockset api aliases listAliases`

retrieve all aliases in an organization

```
USAGE
  $ rockset api aliases listAliases [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ]

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  retrieve all aliases in an organization

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/aliases

  Endpoint Reference

  GET: /v1/orgs/self/aliases

  List Aliases

  Retrieve all aliases in an organization

  More documentation at https://docs.rockset.com/rest-api#listaliases

EXAMPLES
  $ rockset api:aliases:listAliases
```

## `rockset api aliases updateAlias WORKSPACE ALIAS`

update alias in a workspace

```
USAGE
  $ rockset api aliases updateAlias [WORKSPACE] [ALIAS] --body <value> [-h] [--raw] [--columns <value> | ] [--output
    csv|json|yaml |  | ]

ARGUMENTS
  WORKSPACE  name of the workspace
  ALIAS      name of the alias

FLAGS
  -h, --help         Show CLI help.
  --body=<value>     (required) Path to a file whose contents will be passed as the POST body of this request. Format
                     must be [json|yaml]. An example schema is shown below.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  update alias in a workspace

  Arguments to this command will be passed as URL parameters to POST: /v1/orgs/self/ws/{workspace}/aliases/{alias}

  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.



  Example Body (YAML):

  description: version alias

  collections:

  - commons.foo

  - prod.demo

  Endpoint Reference

  POST: /v1/orgs/self/ws/{workspace}/aliases/{alias}

  Update Alias

  Update alias in a workspace.

  More documentation at https://docs.rockset.com/rest-api#updatealias

EXAMPLES
  $ rockset api:aliases:updateAlias WORKSPACE ALIAS --body body.yaml
  $ cat body.yaml
  description: version alias
  collections:
    - commons.foo
    - prod.demo
```

## `rockset api aliases workspaceAliases WORKSPACE`

retrieve all aliases in a workspace

```
USAGE
  $ rockset api aliases workspaceAliases [WORKSPACE] [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ]

ARGUMENTS
  WORKSPACE  name of the workspace

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  retrieve all aliases in a workspace

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/ws/{workspace}/aliases

  Endpoint Reference

  GET: /v1/orgs/self/ws/{workspace}/aliases

  List Aliases in Workspace

  Retrieve all aliases in a workspace.

  More documentation at https://docs.rockset.com/rest-api#workspacealiases

EXAMPLES
  $ rockset api:aliases:workspaceAliases WORKSPACE
```

## `rockset api apikeys createApiKey`

create a new api key for the authenticated user

```
USAGE
  $ rockset api apikeys createApiKey --body <value> [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ]

FLAGS
  -h, --help         Show CLI help.
  --body=<value>     (required) Path to a file whose contents will be passed as the POST body of this request. Format
                     must be [json|yaml]. An example schema is shown below.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  create a new api key for the authenticated user

  Arguments to this command will be passed as URL parameters to POST: /v1/orgs/self/users/self/apikeys

  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.



  Example Body (YAML):

  name: my-app

  role: null

  Endpoint Reference

  POST: /v1/orgs/self/users/self/apikeys

  Create API Key

  Create a new API key for the authenticated user.

  More documentation at https://docs.rockset.com/rest-api#createapikey

EXAMPLES
  $ rockset api:apikeys:createApiKey  --body body.yaml
  $ cat body.yaml
  name: my-app
  role: null
```

## `rockset api apikeys deleteApiKey NAME USER`

delete an api key for any user in your organization

```
USAGE
  $ rockset api apikeys deleteApiKey [NAME] [USER] [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ]

ARGUMENTS
  NAME  Name of the API key.
  USER  Email of the API key owner. Use `self` to specify the currently authenticated user.

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  delete an api key for any user in your organization

  Arguments to this command will be passed as URL parameters to DELETE: /v1/orgs/self/users/{user}/apikeys/{name}

  Endpoint Reference

  DELETE: /v1/orgs/self/users/{user}/apikeys/{name}

  Delete API Key

  Delete an API key for any user in your organization.

  More documentation at https://docs.rockset.com/rest-api#deleteapikey

EXAMPLES
  $ rockset api:apikeys:deleteApiKey NAME USER
```

## `rockset api apikeys getApiKey USER NAME`

retrieve a particular api key for any user in your organization

```
USAGE
  $ rockset api apikeys getApiKey [USER] [NAME] [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ]

ARGUMENTS
  USER  Email of the API key owner. Use `self` to specify the currently authenticated user.
  NAME  Name of the API key.

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  retrieve a particular api key for any user in your organization

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/users/{user}/apikeys/{name}

  Endpoint Reference

  GET: /v1/orgs/self/users/{user}/apikeys/{name}

  Retrieve API Key

  Retrieve a particular API key for any user in your organization.

  More documentation at https://docs.rockset.com/rest-api#getapikey

EXAMPLES
  $ rockset api:apikeys:getApiKey USER NAME
```

## `rockset api apikeys listApiKeys USER`

list api key metadata for any user in your organization

```
USAGE
  $ rockset api apikeys listApiKeys [USER] [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ]

ARGUMENTS
  USER  Email of the API key owner. Use `self` to specify the currently authenticated user.

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  list api key metadata for any user in your organization

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/users/{user}/apikeys

  Endpoint Reference

  GET: /v1/orgs/self/users/{user}/apikeys

  List API Keys.

  List API key metadata for any user in your organization.

  More documentation at https://docs.rockset.com/rest-api#listapikeys

EXAMPLES
  $ rockset api:apikeys:listApiKeys USER
```

## `rockset api apikeys updateApiKey NAME USER`

update the state of an api key for any user in your organization

```
USAGE
  $ rockset api apikeys updateApiKey [NAME] [USER] --body <value> [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml
    |  | ]

ARGUMENTS
  NAME  Name of the API key.
  USER  Email of the API key owner. Use `self` to specify the currently authenticated user.

FLAGS
  -h, --help         Show CLI help.
  --body=<value>     (required) Path to a file whose contents will be passed as the POST body of this request. Format
                     must be [json|yaml]. An example schema is shown below.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  update the state of an api key for any user in your organization

  Arguments to this command will be passed as URL parameters to POST: /v1/orgs/self/users/{user}/apikeys/{name}

  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.



  Example Body (YAML):

  state: ACTIVE

  Endpoint Reference

  POST: /v1/orgs/self/users/{user}/apikeys/{name}

  Update an API key's state

  Update the state of an API key for any user in your organization.

  More documentation at https://docs.rockset.com/rest-api#updateapikey

EXAMPLES
  $ rockset api:apikeys:updateApiKey NAME USER --body body.yaml
  $ cat body.yaml
  state: ACTIVE
```

## `rockset api collections createCollection WORKSPACE`

create new collection in a workspace

```
USAGE
  $ rockset api collections createCollection [WORKSPACE] --body <value> [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml | 
    | ]

ARGUMENTS
  WORKSPACE  name of the workspace

FLAGS
  -h, --help         Show CLI help.
  --body=<value>     (required) Path to a file whose contents will be passed as the POST body of this request. Format
                     must be [json|yaml]. An example schema is shown below.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  create new collection in a workspace

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

## `rockset api collections deleteCollection WORKSPACE COLLECTION`

delete a collection and all its documents from rockset

```
USAGE
  $ rockset api collections deleteCollection [WORKSPACE] [COLLECTION] [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  |
    ]

ARGUMENTS
  WORKSPACE   name of the workspace
  COLLECTION  name of the collection

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  delete a collection and all its documents from rockset

  Arguments to this command will be passed as URL parameters to DELETE:
  /v1/orgs/self/ws/{workspace}/collections/{collection}

  Endpoint Reference

  DELETE: /v1/orgs/self/ws/{workspace}/collections/{collection}

  Delete Collection

  Delete a collection and all its documents from Rockset.

  More documentation at https://docs.rockset.com/rest-api#deletecollection

EXAMPLES
  $ rockset api:collections:deleteCollection WORKSPACE COLLECTION
```

## `rockset api collections getCollection WORKSPACE COLLECTION`

get details about a collection

```
USAGE
  $ rockset api collections getCollection [WORKSPACE] [COLLECTION] [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  |
    ]

ARGUMENTS
  WORKSPACE   name of the workspace
  COLLECTION  name of the collection

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  get details about a collection

  Arguments to this command will be passed as URL parameters to GET:
  /v1/orgs/self/ws/{workspace}/collections/{collection}

  Endpoint Reference

  GET: /v1/orgs/self/ws/{workspace}/collections/{collection}

  Retrieve Collection

  Get details about a collection.

  More documentation at https://docs.rockset.com/rest-api#getcollection

EXAMPLES
  $ rockset api:collections:getCollection WORKSPACE COLLECTION
```

## `rockset api collections listCollections`

retrieve all collections in an organization

```
USAGE
  $ rockset api collections listCollections [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ]

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  retrieve all collections in an organization

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/collections

  Endpoint Reference

  GET: /v1/orgs/self/collections

  List Collections

  Retrieve all collections in an organization.

  More documentation at https://docs.rockset.com/rest-api#listcollections

EXAMPLES
  $ rockset api:collections:listCollections
```

## `rockset api collections workspaceCollections WORKSPACE`

retrieve all collections in a workspace

```
USAGE
  $ rockset api collections workspaceCollections [WORKSPACE] [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml
  |  | ]

ARGUMENTS
  WORKSPACE  name of the workspace

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  retrieve all collections in a workspace

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/ws/{workspace}/collections

  Endpoint Reference

  GET: /v1/orgs/self/ws/{workspace}/collections

  List Collections in Workspace

  Retrieve all collections in a workspace.

  More documentation at https://docs.rockset.com/rest-api#workspacecollections

EXAMPLES
  $ rockset api:collections:workspaceCollections WORKSPACE
```

## `rockset api customRolesBeta createRole`

create a role for your organization

```
USAGE
  $ rockset api customRolesBeta createRole --body <value> [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |
  | ]

FLAGS
  -h, --help         Show CLI help.
  --body=<value>     (required) Path to a file whose contents will be passed as the POST body of this request. Format
                     must be [json|yaml]. An example schema is shown below.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  create a role for your organization

  Arguments to this command will be passed as URL parameters to POST: /v1/orgs/self/roles

  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.



  Example Body (YAML):

  role_name: read_write

  description: Role with read and write privileges to all collections.

  privileges:

  - action: Create collection

  resource_name: commons

  cluster: "*ALL*"

  Endpoint Reference

  POST: /v1/orgs/self/roles

  Create a Role

  Create a role for your organization.

  More documentation at https://docs.rockset.com/rest-api#createrole

EXAMPLES
  $ rockset api:customRolesBeta:createRole  --body body.yaml
  $ cat body.yaml
  role_name: read_write
  description: Role with read and write privileges to all collections.
  privileges:
    - action: Create collection
      resource_name: commons
      cluster: "*ALL*"
```

## `rockset api customRolesBeta deleteRole ROLENAME`

delete a role for your organization

```
USAGE
  $ rockset api customRolesBeta deleteRole [ROLENAME] [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ]

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  delete a role for your organization

  Arguments to this command will be passed as URL parameters to DELETE: /v1/orgs/self/roles/{roleName}

  Endpoint Reference

  DELETE: /v1/orgs/self/roles/{roleName}

  Delete a Role

  Delete a role for your organization.

  More documentation at https://docs.rockset.com/rest-api#deleterole

EXAMPLES
  $ rockset api:customRolesBeta:deleteRole ROLENAME
```

## `rockset api customRolesBeta listRoles`

list all roles for your organization

```
USAGE
  $ rockset api customRolesBeta listRoles [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ]

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  list all roles for your organization

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/roles

  Endpoint Reference

  GET: /v1/orgs/self/roles

  List Roles

  List all roles for your organization.

  More documentation at https://docs.rockset.com/rest-api#listroles

EXAMPLES
  $ rockset api:customRolesBeta:listRoles
```

## `rockset api customRolesBeta updateRole ROLENAME`

update a role for your organization

```
USAGE
  $ rockset api customRolesBeta updateRole [ROLENAME] --body <value> [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml | 
    | ]

FLAGS
  -h, --help         Show CLI help.
  --body=<value>     (required) Path to a file whose contents will be passed as the POST body of this request. Format
                     must be [json|yaml]. An example schema is shown below.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  update a role for your organization

  Arguments to this command will be passed as URL parameters to POST: /v1/orgs/self/roles/{roleName}

  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.



  Example Body (YAML):

  description: Role with read and write privileges to all collections.

  privileges:

  - action: Create collection

  resource_name: commons

  cluster: "*ALL*"

  Endpoint Reference

  POST: /v1/orgs/self/roles/{roleName}

  Update a Role

  Update a role for your organization.

  More documentation at https://docs.rockset.com/rest-api#updaterole

EXAMPLES
  $ rockset api:customRolesBeta:updateRole ROLENAME --body body.yaml
  $ cat body.yaml
  description: Role with read and write privileges to all collections.
  privileges:
    - action: Create collection
      resource_name: commons
      cluster: "*ALL*"
```

## `rockset api documents addDocuments WORKSPACE COLLECTION`

add documents to a collection

```
USAGE
  $ rockset api documents addDocuments [WORKSPACE] [COLLECTION] --body <value> [-h] [--raw] [--columns <value> | ] [--output
    csv|json|yaml |  | ] [-l <value>] [-y]

ARGUMENTS
  WORKSPACE   Name of the workspace.
  COLLECTION  Name of the collection.

FLAGS
  -h, --help                 Show CLI help.
  -l, --loadTestRps=<value>  If this flag is active, a load test will be conducted using this endpoint. The value passed
                             to this flag determines how many requests per second will be sent
  -y, --yes                  Skip all safety prompts
  --body=<value>             (required) Path to a file whose contents will be passed as the POST body of this request.
                             Format must be [json|yaml]. An example schema is shown below.
  --columns=<value>          only show provided columns (comma-separated)
  --output=<option>          output in a more machine friendly format
                             <options: csv|json|yaml>
  --raw                      Show the raw output from the server, instead of grabbing the results. Usually used in
                             conjunction with --output=json

DESCRIPTION
  add documents to a collection

  Arguments to this command will be passed as URL parameters to POST:
  /v1/orgs/self/ws/{workspace}/collections/{collection}/docs

  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.



  Example Body (YAML):

  data:

  - field: value

  Endpoint Reference

  POST: /v1/orgs/self/ws/{workspace}/collections/{collection}/docs

  Add Documents

  Add documents to a collection.

  More documentation at https://docs.rockset.com/rest-api#adddocuments

EXAMPLES
  $ rockset api:documents:addDocuments WORKSPACE COLLECTION --body body.yaml
  $ cat body.yaml
  data:
    - field: value
```

## `rockset api documents deleteDocuments WORKSPACE COLLECTION`

delete documents from a collection

```
USAGE
  $ rockset api documents deleteDocuments [WORKSPACE] [COLLECTION] --body <value> [-h] [--raw] [--columns <value> | ] [--output
    csv|json|yaml |  | ] [-l <value>] [-y]

ARGUMENTS
  WORKSPACE   Name of the workspace.
  COLLECTION  Name of the collection.

FLAGS
  -h, --help                 Show CLI help.
  -l, --loadTestRps=<value>  If this flag is active, a load test will be conducted using this endpoint. The value passed
                             to this flag determines how many requests per second will be sent
  -y, --yes                  Skip all safety prompts
  --body=<value>             (required) Path to a file whose contents will be passed as the POST body of this request.
                             Format must be [json|yaml]. An example schema is shown below.
  --columns=<value>          only show provided columns (comma-separated)
  --output=<option>          output in a more machine friendly format
                             <options: csv|json|yaml>
  --raw                      Show the raw output from the server, instead of grabbing the results. Usually used in
                             conjunction with --output=json

DESCRIPTION
  delete documents from a collection

  Arguments to this command will be passed as URL parameters to DELETE:
  /v1/orgs/self/ws/{workspace}/collections/{collection}/docs

  This endpoint REQUIRES a DELETE body. To specify a DELETE body, please pass a JSON or YAML file to the --body flag.



  Example Body (YAML):

  data:

  - _id: 2cd61e3b

  Endpoint Reference

  DELETE: /v1/orgs/self/ws/{workspace}/collections/{collection}/docs

  Delete Documents

  Delete documents from a collection.

  More documentation at https://docs.rockset.com/rest-api#deletedocuments

EXAMPLES
  $ rockset api:documents:deleteDocuments WORKSPACE COLLECTION --body body.yaml
  $ cat body.yaml
  data:
    - _id: 2cd61e3b
```

## `rockset api documents patchDocuments WORKSPACE COLLECTION`

update existing documents in a collection

```
USAGE
  $ rockset api documents patchDocuments [WORKSPACE] [COLLECTION] --body <value> [-h] [--raw] [--columns <value> | ] [--output
    csv|json|yaml |  | ] [-l <value>] [-y]

ARGUMENTS
  WORKSPACE   Name of the workspace.
  COLLECTION  Name of the collection.

FLAGS
  -h, --help                 Show CLI help.
  -l, --loadTestRps=<value>  If this flag is active, a load test will be conducted using this endpoint. The value passed
                             to this flag determines how many requests per second will be sent
  -y, --yes                  Skip all safety prompts
  --body=<value>             (required) Path to a file whose contents will be passed as the POST body of this request.
                             Format must be [json|yaml]. An example schema is shown below.
  --columns=<value>          only show provided columns (comma-separated)
  --output=<option>          output in a more machine friendly format
                             <options: csv|json|yaml>
  --raw                      Show the raw output from the server, instead of grabbing the results. Usually used in
                             conjunction with --output=json

DESCRIPTION
  update existing documents in a collection

  Arguments to this command will be passed as URL parameters to PATCH:
  /v1/orgs/self/ws/{workspace}/collections/{collection}/docs

  This endpoint REQUIRES a PATCH body. To specify a PATCH body, please pass a JSON or YAML file to the --body flag.



  Example Body (YAML):

  data:

  - _id: ca2d6832-1bfd-f88f-0620-d2aa27a5d86c

  patch:

  - op: ADD

  path: /foo/bar

  value: baz

  from: null

  Endpoint Reference

  PATCH: /v1/orgs/self/ws/{workspace}/collections/{collection}/docs

  Patch Documents

  Update existing documents in a collection.

  More documentation at https://docs.rockset.com/rest-api#patchdocuments

EXAMPLES
  $ rockset api:documents:patchDocuments WORKSPACE COLLECTION --body body.yaml
  $ cat body.yaml
  data:
    - _id: ca2d6832-1bfd-f88f-0620-d2aa27a5d86c
      patch:
        - op: ADD
          path: /foo/bar
          value: baz
          from: null
```

## `rockset api integrations createIntegration`

create a new integration

```
USAGE
  $ rockset api integrations createIntegration --body <value> [-h] [--raw] [--columns <value> | ] [--output
  csv|json|yaml |  | ]

FLAGS
  -h, --help         Show CLI help.
  --body=<value>     (required) Path to a file whose contents will be passed as the POST body of this request. Format
                     must be [json|yaml]. An example schema is shown below.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  create a new integration

  Arguments to this command will be passed as URL parameters to POST: /v1/orgs/self/integrations

  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.



  The POST body request schema has been omitted because it is too long. Please view the documentation at
  https://docs.rockset.com/rest-api#createintegration to see the example.

  Endpoint Reference

  POST: /v1/orgs/self/integrations

  Create Integration

  Create a new integration.

  More documentation at https://docs.rockset.com/rest-api#createintegration
```

## `rockset api integrations deleteIntegration INTEGRATION`

remove an integration

```
USAGE
  $ rockset api integrations deleteIntegration [INTEGRATION] [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml
  |  | ]

ARGUMENTS
  INTEGRATION  name of the integration

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  remove an integration

  Arguments to this command will be passed as URL parameters to DELETE: /v1/orgs/self/integrations/{integration}

  Endpoint Reference

  DELETE: /v1/orgs/self/integrations/{integration}

  Delete Integration

  Remove an integration.

  More documentation at https://docs.rockset.com/rest-api#deleteintegration

EXAMPLES
  $ rockset api:integrations:deleteIntegration INTEGRATION
```

## `rockset api integrations getIntegration INTEGRATION`

retrieve information about a single integration

```
USAGE
  $ rockset api integrations getIntegration [INTEGRATION] [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |
  | ]

ARGUMENTS
  INTEGRATION  name of the integration

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  retrieve information about a single integration

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/integrations/{integration}

  Endpoint Reference

  GET: /v1/orgs/self/integrations/{integration}

  Retrieve Integration

  Retrieve information about a single integration.

  More documentation at https://docs.rockset.com/rest-api#getintegration

EXAMPLES
  $ rockset api:integrations:getIntegration INTEGRATION
```

## `rockset api integrations listIntegrations`

list all integrations in an organization

```
USAGE
  $ rockset api integrations listIntegrations [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ]

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  list all integrations in an organization

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/integrations

  Endpoint Reference

  GET: /v1/orgs/self/integrations

  List Integrations

  List all integrations in an organization.

  More documentation at https://docs.rockset.com/rest-api#listintegrations

EXAMPLES
  $ rockset api:integrations:listIntegrations
```

## `rockset api orgs getOrganization`

retrieve information about current organization

```
USAGE
  $ rockset api orgs getOrganization [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ]

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  retrieve information about current organization

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self

  Endpoint Reference

  GET: /v1/orgs/self

  Get Organization

  Retrieve information about current organization.

  More documentation at https://docs.rockset.com/rest-api#getorganization

EXAMPLES
  $ rockset api:orgs:getOrganization
```

## `rockset api queries query`

make a sql query to rockset

```
USAGE
  $ rockset api queries query --body <value> [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ] [-l
    <value>] [-y]

FLAGS
  -h, --help                 Show CLI help.
  -l, --loadTestRps=<value>  If this flag is active, a load test will be conducted using this endpoint. The value passed
                             to this flag determines how many requests per second will be sent
  -y, --yes                  Skip all safety prompts
  --body=<value>             (required) Path to a file whose contents will be passed as the POST body of this request.
                             Format must be [json|yaml]. An example schema is shown below.
  --columns=<value>          only show provided columns (comma-separated)
  --output=<option>          output in a more machine friendly format
                             <options: csv|json|yaml>
  --raw                      Show the raw output from the server, instead of grabbing the results. Usually used in
                             conjunction with --output=json

DESCRIPTION
  make a sql query to rockset

  Arguments to this command will be passed as URL parameters to POST: /v1/orgs/self/queries

  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.



  The POST body request schema has been omitted because it is too long. Please view the documentation at
  https://docs.rockset.com/rest-api#query to see the example.

  Endpoint Reference

  POST: /v1/orgs/self/queries

  Query

  Make a SQL query to Rockset.

  More documentation at https://docs.rockset.com/rest-api#query
```

## `rockset api queries validate`

validate a sql query with rockset's parser and planner

```
USAGE
  $ rockset api queries validate --body <value> [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ] [-l
    <value>] [-y]

FLAGS
  -h, --help                 Show CLI help.
  -l, --loadTestRps=<value>  If this flag is active, a load test will be conducted using this endpoint. The value passed
                             to this flag determines how many requests per second will be sent
  -y, --yes                  Skip all safety prompts
  --body=<value>             (required) Path to a file whose contents will be passed as the POST body of this request.
                             Format must be [json|yaml]. An example schema is shown below.
  --columns=<value>          only show provided columns (comma-separated)
  --output=<option>          output in a more machine friendly format
                             <options: csv|json|yaml>
  --raw                      Show the raw output from the server, instead of grabbing the results. Usually used in
                             conjunction with --output=json

DESCRIPTION
  validate a sql query with rockset's parser and planner

  Arguments to this command will be passed as URL parameters to POST: /v1/orgs/self/queries/validations

  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.



  The POST body request schema has been omitted because it is too long. Please view the documentation at
  https://docs.rockset.com/rest-api#validate to see the example.

  Endpoint Reference

  POST: /v1/orgs/self/queries/validations

  Validate Query

  Validate a SQL query with Rockset's parser and planner.

  More documentation at https://docs.rockset.com/rest-api#validate
```

## `rockset api queryLambdas createQueryLambda WORKSPACE`

create a query lambda in given workspace

```
USAGE
  $ rockset api queryLambdas createQueryLambda [WORKSPACE] --body <value> [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml | 
    | ] [-l <value>] [-y]

ARGUMENTS
  WORKSPACE  name of the workspace

FLAGS
  -h, --help                 Show CLI help.
  -l, --loadTestRps=<value>  If this flag is active, a load test will be conducted using this endpoint. The value passed
                             to this flag determines how many requests per second will be sent
  -y, --yes                  Skip all safety prompts
  --body=<value>             (required) Path to a file whose contents will be passed as the POST body of this request.
                             Format must be [json|yaml]. An example schema is shown below.
  --columns=<value>          only show provided columns (comma-separated)
  --output=<option>          output in a more machine friendly format
                             <options: csv|json|yaml>
  --raw                      Show the raw output from the server, instead of grabbing the results. Usually used in
                             conjunction with --output=json

DESCRIPTION
  create a query lambda in given workspace

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

EXAMPLES
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

## `rockset api queryLambdas createQueryLambdaTag WORKSPACE QUERYLAMBDA`

create a tag for a specific query lambda version, or update that tag if it already exists

```
USAGE
  $ rockset api queryLambdas createQueryLambdaTag [WORKSPACE] [QUERYLAMBDA] --body <value> [-h] [--raw] [--columns <value> | ] [--output
    csv|json|yaml |  | ] [-l <value>] [-y]

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda

FLAGS
  -h, --help                 Show CLI help.
  -l, --loadTestRps=<value>  If this flag is active, a load test will be conducted using this endpoint. The value passed
                             to this flag determines how many requests per second will be sent
  -y, --yes                  Skip all safety prompts
  --body=<value>             (required) Path to a file whose contents will be passed as the POST body of this request.
                             Format must be [json|yaml]. An example schema is shown below.
  --columns=<value>          only show provided columns (comma-separated)
  --output=<option>          output in a more machine friendly format
                             <options: csv|json|yaml>
  --raw                      Show the raw output from the server, instead of grabbing the results. Usually used in
                             conjunction with --output=json

DESCRIPTION
  create a tag for a specific query lambda version, or update that tag if it already exists

  Arguments to this command will be passed as URL parameters to POST:
  /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags

  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.



  Example Body (YAML):

  tag_name: production

  version: 123ABC

  Endpoint Reference

  POST: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags

  Create Query Lambda Tag

  Create a tag for a specific Query Lambda version, or update that tag if it already exists.

  More documentation at https://docs.rockset.com/rest-api#createquerylambdatag

EXAMPLES
  $ rockset api:queryLambdas:createQueryLambdaTag WORKSPACE QUERYLAMBDA --body body.yaml
  $ cat body.yaml
  tag_name: production
  version: 123ABC
```

## `rockset api queryLambdas deleteQueryLambda WORKSPACE QUERYLAMBDA`

delete a query lambda

```
USAGE
  $ rockset api queryLambdas deleteQueryLambda [WORKSPACE] [QUERYLAMBDA] [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml | 
    | ] [-l <value>] [-y]

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda

FLAGS
  -h, --help                 Show CLI help.
  -l, --loadTestRps=<value>  If this flag is active, a load test will be conducted using this endpoint. The value passed
                             to this flag determines how many requests per second will be sent
  -y, --yes                  Skip all safety prompts
  --columns=<value>          only show provided columns (comma-separated)
  --output=<option>          output in a more machine friendly format
                             <options: csv|json|yaml>
  --raw                      Show the raw output from the server, instead of grabbing the results. Usually used in
                             conjunction with --output=json

DESCRIPTION
  delete a query lambda

  Arguments to this command will be passed as URL parameters to DELETE:
  /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}

  Endpoint Reference

  DELETE: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}

  Delete Query Lambda

  Delete a Query Lambda.

  More documentation at https://docs.rockset.com/rest-api#deletequerylambda

EXAMPLES
  $ rockset api:queryLambdas:deleteQueryLambda WORKSPACE QUERYLAMBDA
```

## `rockset api queryLambdas deleteQueryLambdaVersion WORKSPACE QUERYLAMBDA VERSION`

delete a query lambda version

```
USAGE
  $ rockset api queryLambdas deleteQueryLambdaVersion [WORKSPACE] [QUERYLAMBDA] [VERSION] [-h] [--raw] [--columns <value> | ] [--output
    csv|json|yaml |  | ] [-l <value>] [-y]

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda
  VERSION      version

FLAGS
  -h, --help                 Show CLI help.
  -l, --loadTestRps=<value>  If this flag is active, a load test will be conducted using this endpoint. The value passed
                             to this flag determines how many requests per second will be sent
  -y, --yes                  Skip all safety prompts
  --columns=<value>          only show provided columns (comma-separated)
  --output=<option>          output in a more machine friendly format
                             <options: csv|json|yaml>
  --raw                      Show the raw output from the server, instead of grabbing the results. Usually used in
                             conjunction with --output=json

DESCRIPTION
  delete a query lambda version

  Arguments to this command will be passed as URL parameters to DELETE:
  /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/version/{version}

  Endpoint Reference

  DELETE: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/version/{version}

  Delete Query Lambda Version

  Delete a Query Lambda version.

  More documentation at https://docs.rockset.com/rest-api#deletequerylambdaversion

EXAMPLES
  $ rockset api:queryLambdas:deleteQueryLambdaVersion WORKSPACE QUERYLAMBDA VERSION
```

## `rockset api queryLambdas executeQueryLambda WORKSPACE QUERYLAMBDA VERSION`

execute a particular version of a query lambda

```
USAGE
  $ rockset api queryLambdas executeQueryLambda [WORKSPACE] [QUERYLAMBDA] [VERSION] [-h] [--body <value>] [--raw] [--columns <value> | ]
    [--output csv|json|yaml |  | ] [-l <value>] [-y]

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda
  VERSION      version

FLAGS
  -h, --help                 Show CLI help.
  -l, --loadTestRps=<value>  If this flag is active, a load test will be conducted using this endpoint. The value passed
                             to this flag determines how many requests per second will be sent
  -y, --yes                  Skip all safety prompts
  --body=<value>             Path to a file whose contents will be passed as the POST body of this request. Format must
                             be [json|yaml]. An example schema is shown below.
  --columns=<value>          only show provided columns (comma-separated)
  --output=<option>          output in a more machine friendly format
                             <options: csv|json|yaml>
  --raw                      Show the raw output from the server, instead of grabbing the results. Usually used in
                             conjunction with --output=json

DESCRIPTION
  execute a particular version of a query lambda

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

  paginate: null

  initial_paginate_response_doc_count: null

  Endpoint Reference

  POST: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions/{version}

  Execute Query Lambda By Version

  Execute a particular version of a Query Lambda.

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
  paginate: null
  initial_paginate_response_doc_count: null
```

## `rockset api queryLambdas executeQueryLambdaByTag WORKSPACE QUERYLAMBDA TAG`

execute the query lambda version associated with a given tag

```
USAGE
  $ rockset api queryLambdas executeQueryLambdaByTag [WORKSPACE] [QUERYLAMBDA] [TAG] [-h] [--body <value>] [--raw] [--columns <value> | ]
    [--output csv|json|yaml |  | ] [-l <value>] [-y]

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda
  TAG          tag

FLAGS
  -h, --help                 Show CLI help.
  -l, --loadTestRps=<value>  If this flag is active, a load test will be conducted using this endpoint. The value passed
                             to this flag determines how many requests per second will be sent
  -y, --yes                  Skip all safety prompts
  --body=<value>             Path to a file whose contents will be passed as the POST body of this request. Format must
                             be [json|yaml]. An example schema is shown below.
  --columns=<value>          only show provided columns (comma-separated)
  --output=<option>          output in a more machine friendly format
                             <options: csv|json|yaml>
  --raw                      Show the raw output from the server, instead of grabbing the results. Usually used in
                             conjunction with --output=json

DESCRIPTION
  execute the query lambda version associated with a given tag

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

  paginate: null

  initial_paginate_response_doc_count: null

  Endpoint Reference

  POST: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags/{tag}

  Execute Query Lambda By Tag

  Execute the Query Lambda version associated with a given tag.

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
  paginate: null
  initial_paginate_response_doc_count: null
```

## `rockset api queryLambdas getQueryLambdaTagVersion WORKSPACE QUERYLAMBDA TAG`

retrieve the query lambda version associated with a given tag

```
USAGE
  $ rockset api queryLambdas getQueryLambdaTagVersion [WORKSPACE] [QUERYLAMBDA] [TAG] [-h] [--raw] [--columns <value> | ] [--output
    csv|json|yaml |  | ] [-l <value>] [-y]

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda
  TAG          name of the tag

FLAGS
  -h, --help                 Show CLI help.
  -l, --loadTestRps=<value>  If this flag is active, a load test will be conducted using this endpoint. The value passed
                             to this flag determines how many requests per second will be sent
  -y, --yes                  Skip all safety prompts
  --columns=<value>          only show provided columns (comma-separated)
  --output=<option>          output in a more machine friendly format
                             <options: csv|json|yaml>
  --raw                      Show the raw output from the server, instead of grabbing the results. Usually used in
                             conjunction with --output=json

DESCRIPTION
  retrieve the query lambda version associated with a given tag

  Arguments to this command will be passed as URL parameters to GET:
  /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags/{tag}

  Endpoint Reference

  GET: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags/{tag}

  Retrieve Query Lambda Tag

  Retrieve the Query Lambda version associated with a given tag.

  More documentation at https://docs.rockset.com/rest-api#getquerylambdatagversion

EXAMPLES
  $ rockset api:queryLambdas:getQueryLambdaTagVersion WORKSPACE QUERYLAMBDA TAG
```

## `rockset api queryLambdas getQueryLambdaVersion WORKSPACE QUERYLAMBDA VERSION`

retrieve details for a specified version of a query lambda

```
USAGE
  $ rockset api queryLambdas getQueryLambdaVersion [WORKSPACE] [QUERYLAMBDA] [VERSION] [-h] [--raw] [--columns <value> | ] [--output
    csv|json|yaml |  | ] [-l <value>] [-y]

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda
  VERSION      version

FLAGS
  -h, --help                 Show CLI help.
  -l, --loadTestRps=<value>  If this flag is active, a load test will be conducted using this endpoint. The value passed
                             to this flag determines how many requests per second will be sent
  -y, --yes                  Skip all safety prompts
  --columns=<value>          only show provided columns (comma-separated)
  --output=<option>          output in a more machine friendly format
                             <options: csv|json|yaml>
  --raw                      Show the raw output from the server, instead of grabbing the results. Usually used in
                             conjunction with --output=json

DESCRIPTION
  retrieve details for a specified version of a query lambda

  Arguments to this command will be passed as URL parameters to GET:
  /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions/{version}

  Endpoint Reference

  GET: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions/{version}

  Retrieve Query Lambda Version

  Retrieve details for a specified version of a Query Lambda.

  More documentation at https://docs.rockset.com/rest-api#getquerylambdaversion

EXAMPLES
  $ rockset api:queryLambdas:getQueryLambdaVersion WORKSPACE QUERYLAMBDA VERSION
```

## `rockset api queryLambdas listAllQueryLambdas`

list all query lambdas in an organization

```
USAGE
  $ rockset api queryLambdas listAllQueryLambdas [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ] [-l
  <value>] [-y]

FLAGS
  -h, --help                 Show CLI help.
  -l, --loadTestRps=<value>  If this flag is active, a load test will be conducted using this endpoint. The value passed
                             to this flag determines how many requests per second will be sent
  -y, --yes                  Skip all safety prompts
  --columns=<value>          only show provided columns (comma-separated)
  --output=<option>          output in a more machine friendly format
                             <options: csv|json|yaml>
  --raw                      Show the raw output from the server, instead of grabbing the results. Usually used in
                             conjunction with --output=json

DESCRIPTION
  list all query lambdas in an organization

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/lambdas

  Endpoint Reference

  GET: /v1/orgs/self/lambdas

  List Query Lambdas

  List all Query Lambdas in an organization.

  More documentation at https://docs.rockset.com/rest-api#listallquerylambdas

EXAMPLES
  $ rockset api:queryLambdas:listAllQueryLambdas
```

## `rockset api queryLambdas listQueryLambdaTags WORKSPACE QUERYLAMBDA`

list all tags associated with a query lambda

```
USAGE
  $ rockset api queryLambdas listQueryLambdaTags [WORKSPACE] [QUERYLAMBDA] [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml | 
    | ] [-l <value>] [-y]

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda

FLAGS
  -h, --help                 Show CLI help.
  -l, --loadTestRps=<value>  If this flag is active, a load test will be conducted using this endpoint. The value passed
                             to this flag determines how many requests per second will be sent
  -y, --yes                  Skip all safety prompts
  --columns=<value>          only show provided columns (comma-separated)
  --output=<option>          output in a more machine friendly format
                             <options: csv|json|yaml>
  --raw                      Show the raw output from the server, instead of grabbing the results. Usually used in
                             conjunction with --output=json

DESCRIPTION
  list all tags associated with a query lambda

  Arguments to this command will be passed as URL parameters to GET:
  /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags

  Endpoint Reference

  GET: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags

  List Query Lambda Tags

  List all tags associated with a Query Lambda

  More documentation at https://docs.rockset.com/rest-api#listquerylambdatags

EXAMPLES
  $ rockset api:queryLambdas:listQueryLambdaTags WORKSPACE QUERYLAMBDA
```

## `rockset api queryLambdas listQueryLambdaVersions WORKSPACE QUERYLAMBDA`

list all versions of a query lambda

```
USAGE
  $ rockset api queryLambdas listQueryLambdaVersions [WORKSPACE] [QUERYLAMBDA] [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml | 
    | ] [-l <value>] [-y]

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda

FLAGS
  -h, --help                 Show CLI help.
  -l, --loadTestRps=<value>  If this flag is active, a load test will be conducted using this endpoint. The value passed
                             to this flag determines how many requests per second will be sent
  -y, --yes                  Skip all safety prompts
  --columns=<value>          only show provided columns (comma-separated)
  --output=<option>          output in a more machine friendly format
                             <options: csv|json|yaml>
  --raw                      Show the raw output from the server, instead of grabbing the results. Usually used in
                             conjunction with --output=json

DESCRIPTION
  list all versions of a query lambda

  Arguments to this command will be passed as URL parameters to GET:
  /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions

  Endpoint Reference

  GET: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions

  List Query Lambda Versions

  List all versions of a Query Lambda.

  More documentation at https://docs.rockset.com/rest-api#listquerylambdaversions

EXAMPLES
  $ rockset api:queryLambdas:listQueryLambdaVersions WORKSPACE QUERYLAMBDA
```

## `rockset api queryLambdas listQueryLambdasInWorkspace WORKSPACE`

list all query lambdas under given workspace

```
USAGE
  $ rockset api queryLambdas listQueryLambdasInWorkspace [WORKSPACE] [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ] [-l
    <value>] [-y]

ARGUMENTS
  WORKSPACE  name of the workspace

FLAGS
  -h, --help                 Show CLI help.
  -l, --loadTestRps=<value>  If this flag is active, a load test will be conducted using this endpoint. The value passed
                             to this flag determines how many requests per second will be sent
  -y, --yes                  Skip all safety prompts
  --columns=<value>          only show provided columns (comma-separated)
  --output=<option>          output in a more machine friendly format
                             <options: csv|json|yaml>
  --raw                      Show the raw output from the server, instead of grabbing the results. Usually used in
                             conjunction with --output=json

DESCRIPTION
  list all query lambdas under given workspace

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/ws/{workspace}/lambdas

  Endpoint Reference

  GET: /v1/orgs/self/ws/{workspace}/lambdas

  List Query Lambdas in Workspace

  List all Query Lambdas under given workspace.

  More documentation at https://docs.rockset.com/rest-api#listquerylambdasinworkspace

EXAMPLES
  $ rockset api:queryLambdas:listQueryLambdasInWorkspace WORKSPACE
```

## `rockset api queryLambdas updateQueryLambda WORKSPACE QUERYLAMBDA CREATE`

create a new version of a query lambda in given workspace

```
USAGE
  $ rockset api queryLambdas updateQueryLambda [WORKSPACE] [QUERYLAMBDA] [CREATE] --body <value> [-h] [--raw] [--columns <value> | ]
    [--output csv|json|yaml |  | ] [-l <value>] [-y]

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda
  CREATE

FLAGS
  -h, --help                 Show CLI help.
  -l, --loadTestRps=<value>  If this flag is active, a load test will be conducted using this endpoint. The value passed
                             to this flag determines how many requests per second will be sent
  -y, --yes                  Skip all safety prompts
  --body=<value>             (required) Path to a file whose contents will be passed as the POST body of this request.
                             Format must be [json|yaml]. An example schema is shown below.
  --columns=<value>          only show provided columns (comma-separated)
  --output=<option>          output in a more machine friendly format
                             <options: csv|json|yaml>
  --raw                      Show the raw output from the server, instead of grabbing the results. Usually used in
                             conjunction with --output=json

DESCRIPTION
  create a new version of a query lambda in given workspace

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

EXAMPLES
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

## `rockset api users createUser`

create a new user for an organization

```
USAGE
  $ rockset api users createUser --body <value> [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ]

FLAGS
  -h, --help         Show CLI help.
  --body=<value>     (required) Path to a file whose contents will be passed as the POST body of this request. Format
                     must be [json|yaml]. An example schema is shown below.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  create a new user for an organization

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

EXAMPLES
  $ rockset api:users:createUser  --body body.yaml
  $ cat body.yaml
  email: hello@rockset.com
  roles:
    - admin
    - member
    - read-only
```

## `rockset api users deleteUser USER`

delete a user from an organization

```
USAGE
  $ rockset api users deleteUser [USER] [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ]

ARGUMENTS
  USER  user email

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  delete a user from an organization

  Arguments to this command will be passed as URL parameters to DELETE: /v1/orgs/self/users/{user}

  Endpoint Reference

  DELETE: /v1/orgs/self/users/{user}

  Delete User

  Delete a user from an organization.

  More documentation at https://docs.rockset.com/rest-api#deleteuser

EXAMPLES
  $ rockset api:users:deleteUser USER
```

## `rockset api users getCurrentUser`

retrieve currently authenticated user

```
USAGE
  $ rockset api users getCurrentUser [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ]

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  retrieve currently authenticated user

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/users/self

  Endpoint Reference

  GET: /v1/orgs/self/users/self

  Retrieve Current User

  Retrieve currently authenticated user.

  More documentation at https://docs.rockset.com/rest-api#getcurrentuser

EXAMPLES
  $ rockset api:users:getCurrentUser
```

## `rockset api users getUser USER`

retrieve user by email

```
USAGE
  $ rockset api users getUser [USER] [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ]

ARGUMENTS
  USER  user email

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  retrieve user by email

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/users/{user}

  Endpoint Reference

  GET: /v1/orgs/self/users/{user}

  Retrieve User

  Retrieve user by email.

  More documentation at https://docs.rockset.com/rest-api#getuser

EXAMPLES
  $ rockset api:users:getUser USER
```

## `rockset api users listUnsubscribePreferences`

get all notification preferences

```
USAGE
  $ rockset api users listUnsubscribePreferences [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ]

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  get all notification preferences

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/users/self/preferences

  Endpoint Reference

  GET: /v1/orgs/self/users/self/preferences

  Get all notification preferences

  Get all notification preferences.

  More documentation at https://docs.rockset.com/rest-api#listunsubscribepreferences

EXAMPLES
  $ rockset api:users:listUnsubscribePreferences
```

## `rockset api users listUsers`

retrieve all users for an organization

```
USAGE
  $ rockset api users listUsers [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ]

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  retrieve all users for an organization

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/users

  Endpoint Reference

  GET: /v1/orgs/self/users

  List Users

  Retrieve all users for an organization.

  More documentation at https://docs.rockset.com/rest-api#listusers

EXAMPLES
  $ rockset api:users:listUsers
```

## `rockset api users updateUnsubscribePreferences`

update notification preference

```
USAGE
  $ rockset api users updateUnsubscribePreferences --body <value> [-h] [--raw] [--columns <value> | ] [--output
  csv|json|yaml |  | ]

FLAGS
  -h, --help         Show CLI help.
  --body=<value>     (required) Path to a file whose contents will be passed as the POST body of this request. Format
                     must be [json|yaml]. An example schema is shown below.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  update notification preference

  Arguments to this command will be passed as URL parameters to POST: /v1/orgs/self/users/self/preferences

  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.



  Example Body (YAML):

  data:

  - notificationType: create_apikey

  Endpoint Reference

  POST: /v1/orgs/self/users/self/preferences

  Update notification preferences

  Update notification preference.

  More documentation at https://docs.rockset.com/rest-api#updateunsubscribepreferences

EXAMPLES
  $ rockset api:users:updateUnsubscribePreferences  --body body.yaml
  $ cat body.yaml
  data:
    - notificationType: create_apikey
```

## `rockset api views createView WORKSPACE`

create a view

```
USAGE
  $ rockset api views createView [WORKSPACE] --body <value> [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml | 
    | ]

ARGUMENTS
  WORKSPACE  name of the workspace

FLAGS
  -h, --help         Show CLI help.
  --body=<value>     (required) Path to a file whose contents will be passed as the POST body of this request. Format
                     must be [json|yaml]. An example schema is shown below.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  create a view

  Arguments to this command will be passed as URL parameters to POST: /v1/orgs/self/ws/{workspace}/views

  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.



  Example Body (YAML):

  name: myAwesomeView

  description: view of awesome collection

  query: SELECT * FROM foo

  Endpoint Reference

  POST: /v1/orgs/self/ws/{workspace}/views

  Create View

  Create a view

  More documentation at https://docs.rockset.com/rest-api#createview

EXAMPLES
  $ rockset api:views:createView WORKSPACE --body body.yaml
  $ cat body.yaml
  name: myAwesomeView
  description: view of awesome collection
  query: SELECT * FROM foo
```

## `rockset api views deleteView WORKSPACE VIEW`

delete a view

```
USAGE
  $ rockset api views deleteView [WORKSPACE] [VIEW] [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ]

ARGUMENTS
  WORKSPACE  name of the workspace
  VIEW       name of the view

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  delete a view

  Arguments to this command will be passed as URL parameters to DELETE: /v1/orgs/self/ws/{workspace}/views/{view}

  Endpoint Reference

  DELETE: /v1/orgs/self/ws/{workspace}/views/{view}

  Delete View

  Delete a view

  More documentation at https://docs.rockset.com/rest-api#deleteview

EXAMPLES
  $ rockset api:views:deleteView WORKSPACE VIEW
```

## `rockset api views getView WORKSPACE VIEW`

get details about a view

```
USAGE
  $ rockset api views getView [WORKSPACE] [VIEW] [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ]

ARGUMENTS
  WORKSPACE  name of the workspace
  VIEW       name of the view

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  get details about a view

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/ws/{workspace}/views/{view}

  Endpoint Reference

  GET: /v1/orgs/self/ws/{workspace}/views/{view}

  Retrieve View

  Get details about a view

  More documentation at https://docs.rockset.com/rest-api#getview

EXAMPLES
  $ rockset api:views:getView WORKSPACE VIEW
```

## `rockset api views listViews`

retrieve all views in an organization

```
USAGE
  $ rockset api views listViews [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ]

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  retrieve all views in an organization

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/views

  Endpoint Reference

  GET: /v1/orgs/self/views

  List Views

  Retrieve all views in an organization

  More documentation at https://docs.rockset.com/rest-api#listviews

EXAMPLES
  $ rockset api:views:listViews
```

## `rockset api views updateView WORKSPACE VIEW`

update a view

```
USAGE
  $ rockset api views updateView [WORKSPACE] [VIEW] --body <value> [-h] [--raw] [--columns <value> | ] [--output
    csv|json|yaml |  | ]

ARGUMENTS
  WORKSPACE  name of the workspace
  VIEW       name of the view

FLAGS
  -h, --help         Show CLI help.
  --body=<value>     (required) Path to a file whose contents will be passed as the POST body of this request. Format
                     must be [json|yaml]. An example schema is shown below.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  update a view

  Arguments to this command will be passed as URL parameters to POST: /v1/orgs/self/ws/{workspace}/views/{view}

  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.



  Example Body (YAML):

  description: view of awesome collection

  query: SELECT * FROM foo

  Endpoint Reference

  POST: /v1/orgs/self/ws/{workspace}/views/{view}

  Update View

  Update a view

  More documentation at https://docs.rockset.com/rest-api#updateview

EXAMPLES
  $ rockset api:views:updateView WORKSPACE VIEW --body body.yaml
  $ cat body.yaml
  description: view of awesome collection
  query: SELECT * FROM foo
```

## `rockset api views workspaceViews WORKSPACE`

retrieve all views in a workspace

```
USAGE
  $ rockset api views workspaceViews [WORKSPACE] [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ]

ARGUMENTS
  WORKSPACE  name of the workspace

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  retrieve all views in a workspace

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/ws/{workspace}/views

  Endpoint Reference

  GET: /v1/orgs/self/ws/{workspace}/views

  List Views in Workspace

  Retrieve all views in a workspace.

  More documentation at https://docs.rockset.com/rest-api#workspaceviews

EXAMPLES
  $ rockset api:views:workspaceViews WORKSPACE
```

## `rockset api virtualInstances getVirtualInstance VIRTUALINSTANCEID`

get details about a virtual instance

```
USAGE
  $ rockset api virtualInstances getVirtualInstance [VIRTUALINSTANCEID] [-h] [--raw] [--columns <value> | ] [--output
  csv|json|yaml |  | ]

ARGUMENTS
  VIRTUALINSTANCEID  uuid of the virtual instance

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  get details about a virtual instance

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/virtualinstances/{virtualInstanceId}

  Endpoint Reference

  GET: /v1/orgs/self/virtualinstances/{virtualInstanceId}

  Retrieve Virtual Instance

  Get details about a virtual instance.

  More documentation at https://docs.rockset.com/rest-api#getvirtualinstance

EXAMPLES
  $ rockset api:virtualInstances:getVirtualInstance VIRTUALINSTANCEID
```

## `rockset api virtualInstances listVirtualInstances`

retrieve all virtual instances in an organization

```
USAGE
  $ rockset api virtualInstances listVirtualInstances [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ]

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  retrieve all virtual instances in an organization

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/virtualinstances

  Endpoint Reference

  GET: /v1/orgs/self/virtualinstances

  List Virtual Instances

  Retrieve all virtual instances in an organization.

  More documentation at https://docs.rockset.com/rest-api#listvirtualinstances

EXAMPLES
  $ rockset api:virtualInstances:listVirtualInstances
```

## `rockset api virtualInstances setVirtualInstance VIRTUALINSTANCEID`

update the properties of a virtual instance

```
USAGE
  $ rockset api virtualInstances setVirtualInstance [VIRTUALINSTANCEID] --body <value> [-h] [--raw] [--columns <value> | ] [--output
    csv|json|yaml |  | ]

ARGUMENTS
  VIRTUALINSTANCEID  uuid of the virtual instance

FLAGS
  -h, --help         Show CLI help.
  --body=<value>     (required) Path to a file whose contents will be passed as the POST body of this request. Format
                     must be [json|yaml]. An example schema is shown below.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  update the properties of a virtual instance

  Arguments to this command will be passed as URL parameters to POST: /v1/orgs/self/virtualinstances/{virtualInstanceId}

  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.



  Example Body (YAML):

  new_size: LARGE

  new_type: null

  monitoring_enabled: null

  Endpoint Reference

  POST: /v1/orgs/self/virtualinstances/{virtualInstanceId}

  Update Virtual Instance

  Update the properties of a virtual instance.

  More documentation at https://docs.rockset.com/rest-api#setvirtualinstance

EXAMPLES
  $ rockset api:virtualInstances:setVirtualInstance VIRTUALINSTANCEID --body body.yaml
  $ cat body.yaml
  new_size: LARGE
  new_type: null
  monitoring_enabled: null
```

## `rockset api workspaces childWorkspaces WORKSPACE`

list workspaces under given workspace

```
USAGE
  $ rockset api workspaces childWorkspaces [WORKSPACE] [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  |
  ]

ARGUMENTS
  WORKSPACE  name of the workspace

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  list workspaces under given workspace

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/ws/{workspace}/ws

  Endpoint Reference

  GET: /v1/orgs/self/ws/{workspace}/ws

  List Workspaces in Workspace

  List workspaces under given workspace.

  More documentation at https://docs.rockset.com/rest-api#childworkspaces

EXAMPLES
  $ rockset api:workspaces:childWorkspaces WORKSPACE
```

## `rockset api workspaces createWorkspace`

create a new workspace

```
USAGE
  $ rockset api workspaces createWorkspace --body <value> [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |
  | ]

FLAGS
  -h, --help         Show CLI help.
  --body=<value>     (required) Path to a file whose contents will be passed as the POST body of this request. Format
                     must be [json|yaml]. An example schema is shown below.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  create a new workspace

  Arguments to this command will be passed as URL parameters to POST: /v1/orgs/self/ws

  This endpoint REQUIRES a POST body. To specify a POST body, please pass a JSON or YAML file to the --body flag.



  Example Body (YAML):

  name: event_logs

  description: Datasets of system logs for the ops team.

  Endpoint Reference

  POST: /v1/orgs/self/ws

  Create Workspace

  Create a new workspace.

  More documentation at https://docs.rockset.com/rest-api#createworkspace

EXAMPLES
  $ rockset api:workspaces:createWorkspace  --body body.yaml
  $ cat body.yaml
  name: event_logs
  description: Datasets of system logs for the ops team.
```

## `rockset api workspaces deleteWorkspace WORKSPACE`

remove a workspace

```
USAGE
  $ rockset api workspaces deleteWorkspace [WORKSPACE] [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  |
  ]

ARGUMENTS
  WORKSPACE  name of the workspace

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  remove a workspace

  Arguments to this command will be passed as URL parameters to DELETE: /v1/orgs/self/ws/{workspace}

  Endpoint Reference

  DELETE: /v1/orgs/self/ws/{workspace}

  Delete Workspace

  Remove a workspace.

  More documentation at https://docs.rockset.com/rest-api#deleteworkspace

EXAMPLES
  $ rockset api:workspaces:deleteWorkspace WORKSPACE
```

## `rockset api workspaces getWorkspace WORKSPACE`

get information about a single workspace

```
USAGE
  $ rockset api workspaces getWorkspace [WORKSPACE] [-h] [--raw] [--columns <value> | ] [--output csv|json|yaml |  | ]

ARGUMENTS
  WORKSPACE  name of the workspace

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  get information about a single workspace

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/ws/{workspace}

  Endpoint Reference

  GET: /v1/orgs/self/ws/{workspace}

  Retrieve Workspace

  Get information about a single workspace.

  More documentation at https://docs.rockset.com/rest-api#getworkspace

EXAMPLES
  $ rockset api:workspaces:getWorkspace WORKSPACE
```

## `rockset api workspaces listWorkspaces FETCH_ACROSS_REGIONS`

list all workspaces in an organization

```
USAGE
  $ rockset api workspaces listWorkspaces [FETCH_ACROSS_REGIONS] [-h] [--raw] [--columns <value> | ] [--output
  csv|json|yaml |  | ]

FLAGS
  -h, --help         Show CLI help.
  --columns=<value>  only show provided columns (comma-separated)
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --raw              Show the raw output from the server, instead of grabbing the results. Usually used in conjunction
                     with --output=json

DESCRIPTION
  list all workspaces in an organization

  Arguments to this command will be passed as URL parameters to GET: /v1/orgs/self/ws

  Endpoint Reference

  GET: /v1/orgs/self/ws

  List Workspaces

  List all workspaces in an organization.

  More documentation at https://docs.rockset.com/rest-api#listworkspaces

EXAMPLES
  $ rockset api:workspaces:listWorkspaces FETCH_ACROSS_REGIONS
```
