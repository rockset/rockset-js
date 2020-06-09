@rockset/cli
============

Official Rockset CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@rockset/cli.svg)](https://npmjs.org/package/@rockset/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@rockset/cli.svg)](https://npmjs.org/package/@rockset/cli)
[![License](https://img.shields.io/npm/l/@rockset/cli.svg)](https://github.com/rockset/rockset-js/blob/master/package.json)

<!-- toc -->
* [Installation](#installation)
* [Getting Started](#getting-started)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Installation

Mac/Linux installation (recommended):
```
curl https://rockset-cli-artifacts.s3-us-west-2.amazonaws.com/install-standalone.sh | bash 
```

You can also install the `@rockset/cli` package directly from NPM. This isn't recommended, as the 
package will not be able to autoupdate. Make sure you are on Node 10.x or 12.x before attempting this.

```
npm install -g @rockset/cli
```

# Getting Started


The first thing you should do after installing is to set up Autocomplete. This will greatly ease the process
of navigating the Rock CLI tool.

```
// Print autocomplete instructions for bash
rock autocomplete

// Print autocomplete instructions for ZSH
rock autocomplete:zsh
```

The new Rockset CLI support 3 core workflows.

1. Authentication (`rock auth`)
1. REST API support (`rock api`)
  1. API calls have been modified to closely model the Rockset API Documentation
  1. Load test functionality has been added for select routes
  1. This section of the CLI tool is a thin wrapper around Rockset's REST API. See full documentation for the REST API at 
https://docs.rockset.com/rest-api
1. Query Lambda Project support (`rock project`)
  1. A tool that allows you to manage your Query Lambdas from your file system
  1. Download your Query Lambdas to your local project
  1. Edit your query lambdas and commit to git
  1. Deploy your query lambdas to Rockset

You can also update the Rockset CLI using `rock update`.

# Usage
```sh-session
// This will require a password
$ curl https://rockset-cli-artifacts.s3-us-west-2.amazonaws.com/install-standalone.sh | bash 

// open a new shell
$ rock -h
$ rock -v

// Set up autocomplete
$ rock autocomplete

// Update rock cli
$ rock update

$ rock COMMAND
running command...
@rockset/cli/0.0.28 darwin-x64 node-v12.16.3
$ rock --help [COMMAND]
USAGE
  $ rock COMMAND
...
```
# Commands
<!-- commands -->
* [`rock api:apikeys:createApiKey [BODY]`](#rock-apiapikeyscreateapikey-body)
* [`rock api:apikeys:createApiKeyAdmin [BODY] [USER]`](#rock-apiapikeyscreateapikeyadmin-body-user)
* [`rock api:apikeys:deleteApiKey [NAME]`](#rock-apiapikeysdeleteapikey-name)
* [`rock api:apikeys:deleteApiKeyAdmin [NAME] [USER]`](#rock-apiapikeysdeleteapikeyadmin-name-user)
* [`rock api:apikeys:listApiKeys`](#rock-apiapikeyslistapikeys)
* [`rock api:apikeys:listApiKeysAdmin [USER]`](#rock-apiapikeyslistapikeysadmin-user)
* [`rock api:collections:createCollection [WORKSPACE] [BODY]`](#rock-apicollectionscreatecollection-workspace-body)
* [`rock api:collections:deleteCollection [WORKSPACE] [COLLECTION]`](#rock-apicollectionsdeletecollection-workspace-collection)
* [`rock api:collections:getCollection [WORKSPACE] [COLLECTION]`](#rock-apicollectionsgetcollection-workspace-collection)
* [`rock api:collections:listCollections`](#rock-apicollectionslistcollections)
* [`rock api:collections:listQueryLambdasInCollection [WORKSPACE] [COLLECTION]`](#rock-apicollectionslistquerylambdasincollection-workspace-collection)
* [`rock api:collections:workspaceCollections [WORKSPACE]`](#rock-apicollectionsworkspacecollections-workspace)
* [`rock api:documents:addDocuments [WORKSPACE] [COLLECTION] [BODY]`](#rock-apidocumentsadddocuments-workspace-collection-body)
* [`rock api:documents:deleteDocuments [WORKSPACE] [COLLECTION] [BODY]`](#rock-apidocumentsdeletedocuments-workspace-collection-body)
* [`rock api:documents:patchDocuments [WORKSPACE] [COLLECTION] [BODY]`](#rock-apidocumentspatchdocuments-workspace-collection-body)
* [`rock api:integrations:createIntegration [BODY]`](#rock-apiintegrationscreateintegration-body)
* [`rock api:integrations:deleteIntegration [INTEGRATION]`](#rock-apiintegrationsdeleteintegration-integration)
* [`rock api:integrations:getIntegration [INTEGRATION]`](#rock-apiintegrationsgetintegration-integration)
* [`rock api:integrations:listIntegrations`](#rock-apiintegrationslistintegrations)
* [`rock api:orgs:getOrganization`](#rock-apiorgsgetorganization)
* [`rock api:queries:query [BODY]`](#rock-apiqueriesquery-body)
* [`rock api:queryLambdas:createQueryLambda [WORKSPACE] [BODY]`](#rock-apiquerylambdascreatequerylambda-workspace-body)
* [`rock api:queryLambdas:deleteQueryLambda [WORKSPACE] [QUERYLAMBDA]`](#rock-apiquerylambdasdeletequerylambda-workspace-querylambda)
* [`rock api:queryLambdas:executeQueryLambda [WORKSPACE] [QUERYLAMBDA] [VERSION] [BODY]`](#rock-apiquerylambdasexecutequerylambda-workspace-querylambda-version-body)
* [`rock api:queryLambdas:getQueryLambdaVersion [WORKSPACE] [QUERYLAMBDA] [VERSION]`](#rock-apiquerylambdasgetquerylambdaversion-workspace-querylambda-version)
* [`rock api:queryLambdas:listAllQueryLambdas`](#rock-apiquerylambdaslistallquerylambdas)
* [`rock api:queryLambdas:listQueryLambdaVersions [WORKSPACE] [QUERYLAMBDA]`](#rock-apiquerylambdaslistquerylambdaversions-workspace-querylambda)
* [`rock api:queryLambdas:listQueryLambdasInWorkspace [WORKSPACE]`](#rock-apiquerylambdaslistquerylambdasinworkspace-workspace)
* [`rock api:queryLambdas:updateQueryLambda [WORKSPACE] [QUERYLAMBDA] [BODY]`](#rock-apiquerylambdasupdatequerylambda-workspace-querylambda-body)
* [`rock api:users:createUser [BODY]`](#rock-apiuserscreateuser-body)
* [`rock api:users:deleteUser [USER]`](#rock-apiusersdeleteuser-user)
* [`rock api:users:getCurrentUser`](#rock-apiusersgetcurrentuser)
* [`rock api:users:listUsers`](#rock-apiuserslistusers)
* [`rock api:workspaces:childWorkspaces [WORKSPACE]`](#rock-apiworkspaceschildworkspaces-workspace)
* [`rock api:workspaces:createWorkspace [BODY]`](#rock-apiworkspacescreateworkspace-body)
* [`rock api:workspaces:deleteWorkspace [WORKSPACE]`](#rock-apiworkspacesdeleteworkspace-workspace)
* [`rock api:workspaces:getWorkspace [WORKSPACE]`](#rock-apiworkspacesgetworkspace-workspace)
* [`rock api:workspaces:listWorkspaces`](#rock-apiworkspaceslistworkspaces)
* [`rock auth:add NAME APIKEY [APISERVER]`](#rock-authadd-name-apikey-apiserver)
* [`rock auth:list`](#rock-authlist)
* [`rock auth:use NAME`](#rock-authuse-name)
* [`rock autocomplete [SHELL]`](#rock-autocomplete-shell)
* [`rock help [COMMAND]`](#rock-help-command)
* [`rock project:add NAME`](#rock-projectadd-name)
* [`rock project:delete`](#rock-projectdelete)
* [`rock project:deploy`](#rock-projectdeploy)
* [`rock project:download`](#rock-projectdownload)
* [`rock project:execute NAME`](#rock-projectexecute-name)
* [`rock project:init`](#rock-projectinit)
* [`rock project:list`](#rock-projectlist)
* [`rock project:resolve NAME`](#rock-projectresolve-name)
* [`rock project:serve`](#rock-projectserve)
* [`rock update [CHANNEL]`](#rock-update-channel)

## `rock api:apikeys:createApiKey [BODY]`

Create API Key

```
USAGE
  $ rock api:apikeys:createApiKey [BODY]

ARGUMENTS
  BODY  JSON object

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  Create API Key

  Create a new API key for the authenticated user.

  Endpoint: POST: /v1/orgs/self/users/self/apikeys

  Endpoint Documentation: https://docs.rockset.com/rest-api#createapikey

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/apikeys/createApiKey.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/apikeys/createApiKey.ts)_

## `rock api:apikeys:createApiKeyAdmin [BODY] [USER]`

Create API Key for any user (admin only)

```
USAGE
  $ rock api:apikeys:createApiKeyAdmin [BODY] [USER]

ARGUMENTS
  BODY  JSON object
  USER

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  Create API Key for any user (admin only)

  Create a new API key for any user (admin only).

  Endpoint: POST: /v1/orgs/self/users/{user}/apikeys

  Endpoint Documentation: https://docs.rockset.com/rest-api#createapikeyadmin

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/apikeys/createApiKeyAdmin.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/apikeys/createApiKeyAdmin.ts)_

## `rock api:apikeys:deleteApiKey [NAME]`

Delete API Key

```
USAGE
  $ rock api:apikeys:deleteApiKey [NAME]

ARGUMENTS
  NAME  name of the API key

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  Delete API Key

  Delete an API key for the authenticated user.

  Endpoint: DELETE: /v1/orgs/self/users/self/apikeys/{name}

  Endpoint Documentation: https://docs.rockset.com/rest-api#deleteapikey

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/apikeys/deleteApiKey.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/apikeys/deleteApiKey.ts)_

## `rock api:apikeys:deleteApiKeyAdmin [NAME] [USER]`

Delete API Key for any user (admin only)

```
USAGE
  $ rock api:apikeys:deleteApiKeyAdmin [NAME] [USER]

ARGUMENTS
  NAME  name of the API key
  USER

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  Delete API Key for any user (admin only)

  Delete an API key for any user (admin only).

  Endpoint: DELETE: /v1/orgs/self/users/{user}/apikeys/{name}

  Endpoint Documentation: https://docs.rockset.com/rest-api#deleteapikeyadmin

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/apikeys/deleteApiKeyAdmin.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/apikeys/deleteApiKeyAdmin.ts)_

## `rock api:apikeys:listApiKeys`

List API Keys

```
USAGE
  $ rock api:apikeys:listApiKeys

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  List API Keys

  List all API keys for the authenticated user.

  Endpoint: GET: /v1/orgs/self/users/self/apikeys

  Endpoint Documentation: https://docs.rockset.com/rest-api#listapikeys

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/apikeys/listApiKeys.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/apikeys/listApiKeys.ts)_

## `rock api:apikeys:listApiKeysAdmin [USER]`

List API Keys for any user (admin only)

```
USAGE
  $ rock api:apikeys:listApiKeysAdmin [USER]

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  List API Keys for any user (admin only)

  List all API keys for any user (admin only).

  Endpoint: GET: /v1/orgs/self/users/{user}/apikeys

  Endpoint Documentation: https://docs.rockset.com/rest-api#listapikeysadmin

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/apikeys/listApiKeysAdmin.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/apikeys/listApiKeysAdmin.ts)_

## `rock api:collections:createCollection [WORKSPACE] [BODY]`

Create Collection

```
USAGE
  $ rock api:collections:createCollection [WORKSPACE] [BODY]

ARGUMENTS
  WORKSPACE  name of the workspace
  BODY       JSON object

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  Create Collection

  Create new collection in a workspace.

  Endpoint: POST: /v1/orgs/self/ws/{workspace}/collections

  Endpoint Documentation: https://docs.rockset.com/rest-api#createcollection

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/collections/createCollection.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/collections/createCollection.ts)_

## `rock api:collections:deleteCollection [WORKSPACE] [COLLECTION]`

Delete Collection

```
USAGE
  $ rock api:collections:deleteCollection [WORKSPACE] [COLLECTION]

ARGUMENTS
  WORKSPACE   name of the workspace
  COLLECTION  name of the collection

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  Delete Collection

  Delete a collection and all its documents from Rockset.

  Endpoint: DELETE: /v1/orgs/self/ws/{workspace}/collections/{collection}

  Endpoint Documentation: https://docs.rockset.com/rest-api#deletecollection

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/collections/deleteCollection.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/collections/deleteCollection.ts)_

## `rock api:collections:getCollection [WORKSPACE] [COLLECTION]`

Get Collection

```
USAGE
  $ rock api:collections:getCollection [WORKSPACE] [COLLECTION]

ARGUMENTS
  WORKSPACE   name of the workspace
  COLLECTION  name of the collection

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  Get Collection

  Get details about a collection.

  Endpoint: GET: /v1/orgs/self/ws/{workspace}/collections/{collection}

  Endpoint Documentation: https://docs.rockset.com/rest-api#getcollection

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/collections/getCollection.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/collections/getCollection.ts)_

## `rock api:collections:listCollections`

List Collections

```
USAGE
  $ rock api:collections:listCollections

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  List Collections

  Retrieve all collections in an organization.

  Endpoint: GET: /v1/orgs/self/collections

  Endpoint Documentation: https://docs.rockset.com/rest-api#listcollections

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/collections/listCollections.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/collections/listCollections.ts)_

## `rock api:collections:listQueryLambdasInCollection [WORKSPACE] [COLLECTION]`

Get Query Lambdas

```
USAGE
  $ rock api:collections:listQueryLambdasInCollection [WORKSPACE] [COLLECTION]

ARGUMENTS
  WORKSPACE   name of the workspace
  COLLECTION  name of the collection

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  Get Query Lambdas

  Get all Query Lambdas that hit a specific Rockset Collection.

  Endpoint: GET: /v1/orgs/self/ws/{workspace}/collections/{collection}/lambdas

  Endpoint Documentation: https://docs.rockset.com/rest-api#listquerylambdasincollection

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/collections/listQueryLambdasInCollection.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/collections/listQueryLambdasInCollection.ts)_

## `rock api:collections:workspaceCollections [WORKSPACE]`

List Collections for Workspace

```
USAGE
  $ rock api:collections:workspaceCollections [WORKSPACE]

ARGUMENTS
  WORKSPACE  name of the workspace

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  List Collections for Workspace

  Retrieve all collections in a workspace.

  Endpoint: GET: /v1/orgs/self/ws/{workspace}/collections

  Endpoint Documentation: https://docs.rockset.com/rest-api#workspacecollections

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/collections/workspaceCollections.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/collections/workspaceCollections.ts)_

## `rock api:documents:addDocuments [WORKSPACE] [COLLECTION] [BODY]`

Add Documents

```
USAGE
  $ rock api:documents:addDocuments [WORKSPACE] [COLLECTION] [BODY]

ARGUMENTS
  WORKSPACE   name of the workspace
  COLLECTION  name of the collection
  BODY        JSON object

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be json. Keys are translated
                                 into arguments of the same name. If no BODY argument is specified, the whole object,
                                 minus keys used as other arguments, will be passed in as the BODY.

  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this apicall. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

DESCRIPTION
  Add Documents

  Add documents to a collection in Rockset.

  Endpoint: POST: /v1/orgs/self/ws/{workspace}/collections/{collection}/docs

  Endpoint Documentation: https://docs.rockset.com/rest-api#adddocuments

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/documents/addDocuments.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/documents/addDocuments.ts)_

## `rock api:documents:deleteDocuments [WORKSPACE] [COLLECTION] [BODY]`

Delete Documents

```
USAGE
  $ rock api:documents:deleteDocuments [WORKSPACE] [COLLECTION] [BODY]

ARGUMENTS
  WORKSPACE   name of the workspace
  COLLECTION  name of the collection
  BODY        JSON object

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be json. Keys are translated
                                 into arguments of the same name. If no BODY argument is specified, the whole object,
                                 minus keys used as other arguments, will be passed in as the BODY.

  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this apicall. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

DESCRIPTION
  Delete Documents

  Delete documents from a collection in Rockset.

  Endpoint: DELETE: /v1/orgs/self/ws/{workspace}/collections/{collection}/docs

  Endpoint Documentation: https://docs.rockset.com/rest-api#deletedocuments

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/documents/deleteDocuments.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/documents/deleteDocuments.ts)_

## `rock api:documents:patchDocuments [WORKSPACE] [COLLECTION] [BODY]`

Patch Documents

```
USAGE
  $ rock api:documents:patchDocuments [WORKSPACE] [COLLECTION] [BODY]

ARGUMENTS
  WORKSPACE   name of the workspace
  COLLECTION  name of the collection
  BODY        JSON Patch objects

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be json. Keys are translated
                                 into arguments of the same name. If no BODY argument is specified, the whole object,
                                 minus keys used as other arguments, will be passed in as the BODY.

  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this apicall. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

DESCRIPTION
  Patch Documents

  Patch documents in a collection

  Endpoint: PATCH: /v1/orgs/self/ws/{workspace}/collections/{collection}/docs

  Endpoint Documentation: https://docs.rockset.com/rest-api#patchdocuments

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/documents/patchDocuments.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/documents/patchDocuments.ts)_

## `rock api:integrations:createIntegration [BODY]`

Create Integration

```
USAGE
  $ rock api:integrations:createIntegration [BODY]

ARGUMENTS
  BODY  integration credentials

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  Create Integration

  Create a new integration with Rockset.

  Endpoint: POST: /v1/orgs/self/integrations

  Endpoint Documentation: https://docs.rockset.com/rest-api#createintegration

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/integrations/createIntegration.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/integrations/createIntegration.ts)_

## `rock api:integrations:deleteIntegration [INTEGRATION]`

Delete Integration

```
USAGE
  $ rock api:integrations:deleteIntegration [INTEGRATION]

ARGUMENTS
  INTEGRATION  name of the integration

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  Delete Integration

  Remove an integration.

  Endpoint: DELETE: /v1/orgs/self/integrations/{integration}

  Endpoint Documentation: https://docs.rockset.com/rest-api#deleteintegration

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/integrations/deleteIntegration.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/integrations/deleteIntegration.ts)_

## `rock api:integrations:getIntegration [INTEGRATION]`

Get Integration

```
USAGE
  $ rock api:integrations:getIntegration [INTEGRATION]

ARGUMENTS
  INTEGRATION  name of the integration

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  Get Integration

  Get information about a single integration.

  Endpoint: GET: /v1/orgs/self/integrations/{integration}

  Endpoint Documentation: https://docs.rockset.com/rest-api#getintegration

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/integrations/getIntegration.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/integrations/getIntegration.ts)_

## `rock api:integrations:listIntegrations`

List Integrations

```
USAGE
  $ rock api:integrations:listIntegrations

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  List Integrations

  List all integrations for organization.

  Endpoint: GET: /v1/orgs/self/integrations

  Endpoint Documentation: https://docs.rockset.com/rest-api#listintegrations

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/integrations/listIntegrations.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/integrations/listIntegrations.ts)_

## `rock api:orgs:getOrganization`

Get Organization

```
USAGE
  $ rock api:orgs:getOrganization

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  Get Organization

  Retrieve information about current organization.

  Endpoint: GET: /v1/orgs/self

  Endpoint Documentation: https://docs.rockset.com/rest-api#getorganization

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/orgs/getOrganization.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/orgs/getOrganization.ts)_

## `rock api:queries:query [BODY]`

Query

```
USAGE
  $ rock api:queries:query [BODY]

ARGUMENTS
  BODY  JSON object

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be json. Keys are translated
                                 into arguments of the same name. If no BODY argument is specified, the whole object,
                                 minus keys used as other arguments, will be passed in as the BODY.

  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this apicall. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

DESCRIPTION
  Query

  Make a SQL query to Rockset.

  Endpoint: POST: /v1/orgs/self/queries

  Endpoint Documentation: https://docs.rockset.com/rest-api#query

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queries/query.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/queries/query.ts)_

## `rock api:queryLambdas:createQueryLambda [WORKSPACE] [BODY]`

Create Query Lambda

```
USAGE
  $ rock api:queryLambdas:createQueryLambda [WORKSPACE] [BODY]

ARGUMENTS
  WORKSPACE  name of the workspace
  BODY       JSON object

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be json. Keys are translated
                                 into arguments of the same name. If no BODY argument is specified, the whole object,
                                 minus keys used as other arguments, will be passed in as the BODY.

  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this apicall. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

DESCRIPTION
  Create Query Lambda

  Create a Query Lambda in given workspace.

  Endpoint: POST: /v1/orgs/self/ws/{workspace}/lambdas

  Endpoint Documentation: https://docs.rockset.com/rest-api#createquerylambda

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queryLambdas/createQueryLambda.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/queryLambdas/createQueryLambda.ts)_

## `rock api:queryLambdas:deleteQueryLambda [WORKSPACE] [QUERYLAMBDA]`

Delete Query Lambda

```
USAGE
  $ rock api:queryLambdas:deleteQueryLambda [WORKSPACE] [QUERYLAMBDA]

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be json. Keys are translated
                                 into arguments of the same name. If no BODY argument is specified, the whole object,
                                 minus keys used as other arguments, will be passed in as the BODY.

  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this apicall. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

DESCRIPTION
  Delete Query Lambda

  Delete a Query Lambda.

  Endpoint: DELETE: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}

  Endpoint Documentation: https://docs.rockset.com/rest-api#deletequerylambda

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queryLambdas/deleteQueryLambda.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/queryLambdas/deleteQueryLambda.ts)_

## `rock api:queryLambdas:executeQueryLambda [WORKSPACE] [QUERYLAMBDA] [VERSION] [BODY]`

Run Query Lambda

```
USAGE
  $ rock api:queryLambdas:executeQueryLambda [WORKSPACE] [QUERYLAMBDA] [VERSION] [BODY]

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda
  VERSION      version
  BODY         JSON object

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be json. Keys are translated
                                 into arguments of the same name. If no BODY argument is specified, the whole object,
                                 minus keys used as other arguments, will be passed in as the BODY.

  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this apicall. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

DESCRIPTION
  Run Query Lambda

  Run a particular version of a Query Lambda.

  Endpoint: POST: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions/{version}

  Endpoint Documentation: https://docs.rockset.com/rest-api#executequerylambda

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queryLambdas/executeQueryLambda.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/queryLambdas/executeQueryLambda.ts)_

## `rock api:queryLambdas:getQueryLambdaVersion [WORKSPACE] [QUERYLAMBDA] [VERSION]`

Get Query Lambda Version

```
USAGE
  $ rock api:queryLambdas:getQueryLambdaVersion [WORKSPACE] [QUERYLAMBDA] [VERSION]

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda
  VERSION      version

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be json. Keys are translated
                                 into arguments of the same name. If no BODY argument is specified, the whole object,
                                 minus keys used as other arguments, will be passed in as the BODY.

  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this apicall. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

DESCRIPTION
  Get Query Lambda Version

  Get a specific version of a Query Lambda

  Endpoint: GET: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions/{version}

  Endpoint Documentation: https://docs.rockset.com/rest-api#getquerylambdaversion

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queryLambdas/getQueryLambdaVersion.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/queryLambdas/getQueryLambdaVersion.ts)_

## `rock api:queryLambdas:listAllQueryLambdas`

List Query Lambdas

```
USAGE
  $ rock api:queryLambdas:listAllQueryLambdas

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be json. Keys are translated
                                 into arguments of the same name. If no BODY argument is specified, the whole object,
                                 minus keys used as other arguments, will be passed in as the BODY.

  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this apicall. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

DESCRIPTION
  List Query Lambdas

  List all Query Lambdas.

  Endpoint: GET: /v1/orgs/self/lambdas

  Endpoint Documentation: https://docs.rockset.com/rest-api#listallquerylambdas

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queryLambdas/listAllQueryLambdas.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/queryLambdas/listAllQueryLambdas.ts)_

## `rock api:queryLambdas:listQueryLambdaVersions [WORKSPACE] [QUERYLAMBDA]`

List Query Lambda Versions

```
USAGE
  $ rock api:queryLambdas:listQueryLambdaVersions [WORKSPACE] [QUERYLAMBDA]

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be json. Keys are translated
                                 into arguments of the same name. If no BODY argument is specified, the whole object,
                                 minus keys used as other arguments, will be passed in as the BODY.

  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this apicall. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

DESCRIPTION
  List Query Lambda Versions

  List all versions of a Query Lambda.

  Endpoint: GET: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions

  Endpoint Documentation: https://docs.rockset.com/rest-api#listquerylambdaversions

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queryLambdas/listQueryLambdaVersions.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/queryLambdas/listQueryLambdaVersions.ts)_

## `rock api:queryLambdas:listQueryLambdasInWorkspace [WORKSPACE]`

List Query Lambdas

```
USAGE
  $ rock api:queryLambdas:listQueryLambdasInWorkspace [WORKSPACE]

ARGUMENTS
  WORKSPACE  name of the workspace

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be json. Keys are translated
                                 into arguments of the same name. If no BODY argument is specified, the whole object,
                                 minus keys used as other arguments, will be passed in as the BODY.

  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this apicall. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

DESCRIPTION
  List Query Lambdas

  List all Query Lambdas under given workspace.

  Endpoint: GET: /v1/orgs/self/ws/{workspace}/lambdas

  Endpoint Documentation: https://docs.rockset.com/rest-api#listquerylambdasinworkspace

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queryLambdas/listQueryLambdasInWorkspace.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/queryLambdas/listQueryLambdasInWorkspace.ts)_

## `rock api:queryLambdas:updateQueryLambda [WORKSPACE] [QUERYLAMBDA] [BODY]`

Update Query Lambda

```
USAGE
  $ rock api:queryLambdas:updateQueryLambda [WORKSPACE] [QUERYLAMBDA] [BODY]

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda
  BODY         JSON object

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be json. Keys are translated
                                 into arguments of the same name. If no BODY argument is specified, the whole object,
                                 minus keys used as other arguments, will be passed in as the BODY.

  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this apicall. The value
                                 passed to this flag determines how many requests per second will be sent

  -y, --yes                      Skip all safety prompts

DESCRIPTION
  Update Query Lambda

  Create a new version of a Query Lambda in given workspace.

  Endpoint: POST: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions

  Endpoint Documentation: https://docs.rockset.com/rest-api#updatequerylambda

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queryLambdas/updateQueryLambda.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/queryLambdas/updateQueryLambda.ts)_

## `rock api:users:createUser [BODY]`

Create User

```
USAGE
  $ rock api:users:createUser [BODY]

ARGUMENTS
  BODY  JSON object

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  Create User

  Create a new user for an organization.

  Endpoint: POST: /v1/orgs/self/users

  Endpoint Documentation: https://docs.rockset.com/rest-api#createuser

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/users/createUser.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/users/createUser.ts)_

## `rock api:users:deleteUser [USER]`

Delete User

```
USAGE
  $ rock api:users:deleteUser [USER]

ARGUMENTS
  USER  user email

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  Delete User

  Delete a user from an organization.

  Endpoint: DELETE: /v1/orgs/self/users/{user}

  Endpoint Documentation: https://docs.rockset.com/rest-api#deleteuser

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/users/deleteUser.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/users/deleteUser.ts)_

## `rock api:users:getCurrentUser`

Get Current User

```
USAGE
  $ rock api:users:getCurrentUser

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  Get Current User

  Retrieve currently active user.

  Endpoint: GET: /v1/orgs/self/users/self

  Endpoint Documentation: https://docs.rockset.com/rest-api#getcurrentuser

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/users/getCurrentUser.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/users/getCurrentUser.ts)_

## `rock api:users:listUsers`

List Users

```
USAGE
  $ rock api:users:listUsers

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  List Users

  Retrieve all users for an organization.

  Endpoint: GET: /v1/orgs/self/users

  Endpoint Documentation: https://docs.rockset.com/rest-api#listusers

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/users/listUsers.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/users/listUsers.ts)_

## `rock api:workspaces:childWorkspaces [WORKSPACE]`

List Workspaces

```
USAGE
  $ rock api:workspaces:childWorkspaces [WORKSPACE]

ARGUMENTS
  WORKSPACE  name of the workspace

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  List Workspaces

  List workspaces under given workspace.

  Endpoint: GET: /v1/orgs/self/ws/{workspace}/ws

  Endpoint Documentation: https://docs.rockset.com/rest-api#childworkspaces

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/workspaces/childWorkspaces.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/workspaces/childWorkspaces.ts)_

## `rock api:workspaces:createWorkspace [BODY]`

Create Workspace

```
USAGE
  $ rock api:workspaces:createWorkspace [BODY]

ARGUMENTS
  BODY  workspace details

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  Create Workspace

  Create a new workspace in your org.

  Endpoint: POST: /v1/orgs/self/ws

  Endpoint Documentation: https://docs.rockset.com/rest-api#createworkspace

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/workspaces/createWorkspace.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/workspaces/createWorkspace.ts)_

## `rock api:workspaces:deleteWorkspace [WORKSPACE]`

Delete Workspace

```
USAGE
  $ rock api:workspaces:deleteWorkspace [WORKSPACE]

ARGUMENTS
  WORKSPACE  name of the workspace

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  Delete Workspace

  Remove a workspace.

  Endpoint: DELETE: /v1/orgs/self/ws/{workspace}

  Endpoint Documentation: https://docs.rockset.com/rest-api#deleteworkspace

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/workspaces/deleteWorkspace.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/workspaces/deleteWorkspace.ts)_

## `rock api:workspaces:getWorkspace [WORKSPACE]`

Get Workspace

```
USAGE
  $ rock api:workspaces:getWorkspace [WORKSPACE]

ARGUMENTS
  WORKSPACE  name of the workspace

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  Get Workspace

  Get information about a single workspace.

  Endpoint: GET: /v1/orgs/self/ws/{workspace}

  Endpoint Documentation: https://docs.rockset.com/rest-api#getworkspace

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/workspaces/getWorkspace.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/workspaces/getWorkspace.ts)_

## `rock api:workspaces:listWorkspaces`

List Workspaces

```
USAGE
  $ rock api:workspaces:listWorkspaces

OPTIONS
  -f, --file=file  The config file to execute this command from. Format must be json. Keys are translated into arguments
                   of the same name. If no BODY argument is specified, the whole object, minus keys used as other
                   arguments, will be passed in as the BODY.

  -h, --help       show CLI help

DESCRIPTION
  List Workspaces

  List all workspaces.

  Endpoint: GET: /v1/orgs/self/ws

  Endpoint Documentation: https://docs.rockset.com/rest-api#listworkspaces

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/workspaces/listWorkspaces.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/api/workspaces/listWorkspaces.ts)_

## `rock auth:add NAME APIKEY [APISERVER]`

Create a new profile with the specified name and apikey.

```
USAGE
  $ rock auth:add NAME APIKEY [APISERVER]

ARGUMENTS
  NAME       The name of the profile you wish to create.
  APIKEY     The apikey for your account
  APISERVER  [default: https://api.rs2.usw2.rockset.com] The url for the apiserver to include in this profile

OPTIONS
  -a, --activate  Whether to activate the profile after creating it
  -h, --help      show CLI help

DESCRIPTION
  Create a new profile with the specified name and apikey.
```

_See code: [src/commands/auth/add.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/auth/add.ts)_

## `rock auth:list`

List all of the available profiles.

```
USAGE
  $ rock auth:list

OPTIONS
  -h, --help  show CLI help

DESCRIPTION
  List all of the available profiles.
```

_See code: [src/commands/auth/list.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/auth/list.ts)_

## `rock auth:use NAME`

Use a specific authentication profile.

```
USAGE
  $ rock auth:use NAME

ARGUMENTS
  NAME  The name of the profile you wish to use.

OPTIONS
  -h, --help  show CLI help

DESCRIPTION
  Use a specific authentication profile.
```

_See code: [src/commands/auth/use.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/auth/use.ts)_

## `rock autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ rock autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ rock autocomplete
  $ rock autocomplete bash
  $ rock autocomplete zsh
  $ rock autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.2.0/src/commands/autocomplete/index.ts)_

## `rock help [COMMAND]`

display help for rock

```
USAGE
  $ rock help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `rock project:add NAME`

Add an empty entity with the specified name to the project. The path for the entity is the same

```
USAGE
  $ rock project:add NAME

ARGUMENTS
  NAME  The fully qualified name of the entity you wish to resolve

OPTIONS
  -e, --entity=lambda  [default: lambda] the type of entity you wish to add
  -h, --help           show CLI help

DESCRIPTION
  Add an empty entity with the specified name to the project. The path for the entity is the same
     as would be created with 'rock project:resolve'
```

_See code: [src/commands/project/add.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/project/add.ts)_

## `rock project:delete`

Delete all query lambdas from the project.

```
USAGE
  $ rock project:delete

OPTIONS
  -h, --help  show CLI help
  -y, --yes   Bypass the safety checks, and automatically engage in dangerous actions.

DESCRIPTION
  Delete all query lambdas from the project.
```

_See code: [src/commands/project/delete.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/project/delete.ts)_

## `rock project:deploy`

Deploy Query Lambda entities to Rockset from your local project.

```
USAGE
  $ rock project:deploy

OPTIONS
  -h, --help                                                                show CLI help
  -t, --tag=
          Specify a tag name to be applied to these Query Lambda versions.

DESCRIPTION
  Deploy Query Lambda entities to Rockset from your local project.
```

_See code: [src/commands/project/deploy.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/project/deploy.ts)_

## `rock project:download`

Download Query Lambda entities from Rockset to your local project.

```
USAGE
  $ rock project:download

OPTIONS
  -h, --help                                                                            show CLI help
  -t, --tag=
          Specify a value to download all Query Lambda versions tagged with this tag. 
          Query Lambdas that do not have a version with this tag name will be skipped.

DESCRIPTION
  Download Query Lambda entities from Rockset to your local project.
```

_See code: [src/commands/project/download.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/project/download.ts)_

## `rock project:execute NAME`

Execute a specific version of a Query Lambda in the current project.

```
USAGE
  $ rock project:execute NAME

ARGUMENTS
  NAME  The fully qualified name of the Query Lambda you wish to execute

OPTIONS
  -h, --help  show CLI help

DESCRIPTION
  Execute a specific version of a Query Lambda in the current project.
  
     You must specify the fully qualified name of the Query Lambda: eg. 'commons.foo'.

     You must specify the specific version to execute: eg. 'b1d7c9a34b50cd'.
```

_See code: [src/commands/project/execute.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/project/execute.ts)_

## `rock project:init`

Initialize your project.

```
USAGE
  $ rock project:init

OPTIONS
  -h, --help  show CLI help

DESCRIPTION
  Initialize your project.

  This command initializes your project with a rockconfig.json file.
```

_See code: [src/commands/project/init.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/project/init.ts)_

## `rock project:list`

List all of the entities in the current project. Note: this does not list entities on remote. For that, please use

```
USAGE
  $ rock project:list

OPTIONS
  -e, --entity=lambda  [default: lambda] the type of entity you wish to list
  -h, --help           show CLI help

DESCRIPTION
  List all of the entities in the current project. Note: this does not list entities on remote. For that, please use
     the API endpoints present in 'rock api:...'
```

_See code: [src/commands/project/list.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/project/list.ts)_

## `rock project:resolve NAME`

Resolve the absolute path of an entity in the current project.

```
USAGE
  $ rock project:resolve NAME

ARGUMENTS
  NAME  The fully qualified name of the entity you wish to resolve

OPTIONS
  -e, --entity=lambda|workspace  [default: lambda] the type of entity you wish to resolve
  -h, --help                     show CLI help
  --exists                       Return with an error if file does not exist
  --sql                          Return the SQL file path. Only for Query Lambdas.

DESCRIPTION
  Resolve the absolute path of an entity in the current project.
  
     You must specify the fully qualified name of the entity: eg. 'commons.foo'.

     You must specify the type of entity that will be resolved.
```

_See code: [src/commands/project/resolve.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/project/resolve.ts)_

## `rock project:serve`

Start a development server that allows you to execute Query Lambdas from your local project from a development UI.

```
USAGE
  $ rock project:serve

OPTIONS
  -h, --help       show CLI help
  -p, --port=port  [default: 3001] The port to start the server at

DESCRIPTION
  Start a development server that allows you to execute Query Lambdas from your local project from a development UI.
```

_See code: [src/commands/project/serve.ts](https://github.com/rockset/rockset-js/blob/v0.1.2/src/commands/project/serve.ts)_

## `rock update [CHANNEL]`

update the rock CLI

```
USAGE
  $ rock update [CHANNEL]
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v1.3.10/src/commands/update.ts)_
<!-- commandsstop -->
