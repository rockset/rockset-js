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
rockset autocomplete

// Print autocomplete instructions for ZSH
rockset autocomplete:zsh
```

The new Rockset CLI support 3 core workflows.

1. Authentication (`rockset auth`)
1. REST API support (`rockset api`)
    1. API calls have been modified to closely model the Rockset API Documentation
    1. Load test functionality has been added for select routes
    1. This section of the CLI tool is a thin wrapper around Rockset's REST API. See full documentation for the REST API at 
https://docs.rockset.com/rest-api
1. Query Lambda Project support (`rockset project`)
    1. A tool that allows you to manage your Query Lambdas from your file system
    1. Download your Query Lambdas to your local project
    1. Edit your query lambdas and commit to git
    1. Deploy your query lambdas to Rockset

You can also update the Rockset CLI using `rockset update`.

# Usage
```sh-session
// This will require a password
$ curl https://rockset-cli-artifacts.s3-us-west-2.amazonaws.com/install-standalone.sh | bash 

// open a new shell
$ rockset -h
$ rockset -v

// Set up autocomplete
$ rockset autocomplete

// Add authentication information
$ rockset auth:add apikey [apiserver]

// Update rockset cli
$ rockset update

$ rockset COMMAND
running command...
@rockset/cli/0.0.28 darwin-x64 node-v12.16.3
$ rockset --help [COMMAND]
USAGE
  $ rockset COMMAND
...
```
# Commands
<!-- commands -->
* [`rockset api:apikeys:createApiKey [BODY]`](#rockset-apiapikeyscreateapikey-body)
* [`rockset api:apikeys:createApiKeyAdmin [BODY] [USER]`](#rockset-apiapikeyscreateapikeyadmin-body-user)
* [`rockset api:apikeys:deleteApiKey [NAME]`](#rockset-apiapikeysdeleteapikey-name)
* [`rockset api:apikeys:deleteApiKeyAdmin [NAME] [USER]`](#rockset-apiapikeysdeleteapikeyadmin-name-user)
* [`rockset api:apikeys:listApiKeys`](#rockset-apiapikeyslistapikeys)
* [`rockset api:apikeys:listApiKeysAdmin [USER]`](#rockset-apiapikeyslistapikeysadmin-user)
* [`rockset api:collections:createCollection [WORKSPACE] [BODY]`](#rockset-apicollectionscreatecollection-workspace-body)
* [`rockset api:collections:deleteCollection [WORKSPACE] [COLLECTION]`](#rockset-apicollectionsdeletecollection-workspace-collection)
* [`rockset api:collections:getCollection [WORKSPACE] [COLLECTION]`](#rockset-apicollectionsgetcollection-workspace-collection)
* [`rockset api:collections:listCollections`](#rockset-apicollectionslistcollections)
* [`rockset api:collections:listQueryLambdasInCollection [WORKSPACE] [COLLECTION]`](#rockset-apicollectionslistquerylambdasincollection-workspace-collection)
* [`rockset api:collections:workspaceCollections [WORKSPACE]`](#rockset-apicollectionsworkspacecollections-workspace)
* [`rockset api:documents:addDocuments [WORKSPACE] [COLLECTION] [BODY]`](#rockset-apidocumentsadddocuments-workspace-collection-body)
* [`rockset api:documents:deleteDocuments [WORKSPACE] [COLLECTION] [BODY]`](#rockset-apidocumentsdeletedocuments-workspace-collection-body)
* [`rockset api:documents:patchDocuments [WORKSPACE] [COLLECTION] [BODY]`](#rockset-apidocumentspatchdocuments-workspace-collection-body)
* [`rockset api:integrations:createIntegration [BODY]`](#rockset-apiintegrationscreateintegration-body)
* [`rockset api:integrations:deleteIntegration [INTEGRATION]`](#rockset-apiintegrationsdeleteintegration-integration)
* [`rockset api:integrations:getIntegration [INTEGRATION]`](#rockset-apiintegrationsgetintegration-integration)
* [`rockset api:integrations:listIntegrations`](#rockset-apiintegrationslistintegrations)
* [`rockset api:orgs:getOrganization`](#rockset-apiorgsgetorganization)
* [`rockset api:queries:query [BODY]`](#rockset-apiqueriesquery-body)
* [`rockset api:queryLambdas:createQueryLambda [WORKSPACE] [BODY]`](#rockset-apiquerylambdascreatequerylambda-workspace-body)
* [`rockset api:queryLambdas:deleteQueryLambda [WORKSPACE] [QUERYLAMBDA]`](#rockset-apiquerylambdasdeletequerylambda-workspace-querylambda)
* [`rockset api:queryLambdas:executeQueryLambda [WORKSPACE] [QUERYLAMBDA] [VERSION] [BODY]`](#rockset-apiquerylambdasexecutequerylambda-workspace-querylambda-version-body)
* [`rockset api:queryLambdas:getQueryLambdaVersion [WORKSPACE] [QUERYLAMBDA] [VERSION]`](#rockset-apiquerylambdasgetquerylambdaversion-workspace-querylambda-version)
* [`rockset api:queryLambdas:listAllQueryLambdas`](#rockset-apiquerylambdaslistallquerylambdas)
* [`rockset api:queryLambdas:listQueryLambdaVersions [WORKSPACE] [QUERYLAMBDA]`](#rockset-apiquerylambdaslistquerylambdaversions-workspace-querylambda)
* [`rockset api:queryLambdas:listQueryLambdasInWorkspace [WORKSPACE]`](#rockset-apiquerylambdaslistquerylambdasinworkspace-workspace)
* [`rockset api:queryLambdas:updateQueryLambda [WORKSPACE] [QUERYLAMBDA] [BODY]`](#rockset-apiquerylambdasupdatequerylambda-workspace-querylambda-body)
* [`rockset api:users:createUser [BODY]`](#rockset-apiuserscreateuser-body)
* [`rockset api:users:deleteUser [USER]`](#rockset-apiusersdeleteuser-user)
* [`rockset api:users:getCurrentUser`](#rockset-apiusersgetcurrentuser)
* [`rockset api:users:listUsers`](#rockset-apiuserslistusers)
* [`rockset api:workspaces:childWorkspaces [WORKSPACE]`](#rockset-apiworkspaceschildworkspaces-workspace)
* [`rockset api:workspaces:createWorkspace [BODY]`](#rockset-apiworkspacescreateworkspace-body)
* [`rockset api:workspaces:deleteWorkspace [WORKSPACE]`](#rockset-apiworkspacesdeleteworkspace-workspace)
* [`rockset api:workspaces:getWorkspace [WORKSPACE]`](#rockset-apiworkspacesgetworkspace-workspace)
* [`rockset api:workspaces:listWorkspaces`](#rockset-apiworkspaceslistworkspaces)
* [`rockset auth:add NAME APIKEY [APISERVER]`](#rockset-authadd-name-apikey-apiserver)
* [`rockset auth:list`](#rockset-authlist)
* [`rockset auth:use NAME`](#rockset-authuse-name)
* [`rockset autocomplete [SHELL]`](#rockset-autocomplete-shell)
* [`rockset help [COMMAND]`](#rockset-help-command)
* [`rockset project:add NAME`](#rockset-projectadd-name)
* [`rockset project:delete`](#rockset-projectdelete)
* [`rockset project:deploy`](#rockset-projectdeploy)
* [`rockset project:download`](#rockset-projectdownload)
* [`rockset project:execute NAME`](#rockset-projectexecute-name)
* [`rockset project:init`](#rockset-projectinit)
* [`rockset project:list`](#rockset-projectlist)
* [`rockset project:resolve NAME`](#rockset-projectresolve-name)
* [`rockset project:serve`](#rockset-projectserve)
* [`rockset sql [SQL]`](#rockset-sql-sql)
* [`rockset update [CHANNEL]`](#rockset-update-channel)

## `rockset api:apikeys:createApiKey [BODY]`

Create API Key

```
USAGE
  $ rockset api:apikeys:createApiKey [BODY]

ARGUMENTS
  BODY  JSON object

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  Create API Key

  Create a new API key for the authenticated user.

  Endpoint: POST: /v1/orgs/self/users/self/apikeys

  Endpoint Documentation: https://docs.rockset.com/rest-api#createapikey

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/apikeys/createApiKey.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/apikeys/createApiKey.ts)_

## `rockset api:apikeys:createApiKeyAdmin [BODY] [USER]`

Create API Key for any user (admin only)

```
USAGE
  $ rockset api:apikeys:createApiKeyAdmin [BODY] [USER]

ARGUMENTS
  BODY  JSON object
  USER

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  Create API Key for any user (admin only)

  Create a new API key for any user (admin only).

  Endpoint: POST: /v1/orgs/self/users/{user}/apikeys

  Endpoint Documentation: https://docs.rockset.com/rest-api#createapikeyadmin

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/apikeys/createApiKeyAdmin.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/apikeys/createApiKeyAdmin.ts)_

## `rockset api:apikeys:deleteApiKey [NAME]`

Delete API Key

```
USAGE
  $ rockset api:apikeys:deleteApiKey [NAME]

ARGUMENTS
  NAME  name of the API key

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  Delete API Key

  Delete an API key for the authenticated user.

  Endpoint: DELETE: /v1/orgs/self/users/self/apikeys/{name}

  Endpoint Documentation: https://docs.rockset.com/rest-api#deleteapikey

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/apikeys/deleteApiKey.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/apikeys/deleteApiKey.ts)_

## `rockset api:apikeys:deleteApiKeyAdmin [NAME] [USER]`

Delete API Key for any user (admin only)

```
USAGE
  $ rockset api:apikeys:deleteApiKeyAdmin [NAME] [USER]

ARGUMENTS
  NAME  name of the API key
  USER

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  Delete API Key for any user (admin only)

  Delete an API key for any user (admin only).

  Endpoint: DELETE: /v1/orgs/self/users/{user}/apikeys/{name}

  Endpoint Documentation: https://docs.rockset.com/rest-api#deleteapikeyadmin

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/apikeys/deleteApiKeyAdmin.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/apikeys/deleteApiKeyAdmin.ts)_

## `rockset api:apikeys:listApiKeys`

List API Keys

```
USAGE
  $ rockset api:apikeys:listApiKeys

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  List API Keys

  List all API keys for the authenticated user.

  Endpoint: GET: /v1/orgs/self/users/self/apikeys

  Endpoint Documentation: https://docs.rockset.com/rest-api#listapikeys

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/apikeys/listApiKeys.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/apikeys/listApiKeys.ts)_

## `rockset api:apikeys:listApiKeysAdmin [USER]`

List API Keys for any user (admin only)

```
USAGE
  $ rockset api:apikeys:listApiKeysAdmin [USER]

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  List API Keys for any user (admin only)

  List all API keys for any user (admin only).

  Endpoint: GET: /v1/orgs/self/users/{user}/apikeys

  Endpoint Documentation: https://docs.rockset.com/rest-api#listapikeysadmin

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/apikeys/listApiKeysAdmin.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/apikeys/listApiKeysAdmin.ts)_

## `rockset api:collections:createCollection [WORKSPACE] [BODY]`

Create Collection

```
USAGE
  $ rockset api:collections:createCollection [WORKSPACE] [BODY]

ARGUMENTS
  WORKSPACE  name of the workspace
  BODY       JSON object

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  Create Collection

  Create new collection in a workspace.

  Endpoint: POST: /v1/orgs/self/ws/{workspace}/collections

  Endpoint Documentation: https://docs.rockset.com/rest-api#createcollection

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/collections/createCollection.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/collections/createCollection.ts)_

## `rockset api:collections:deleteCollection [WORKSPACE] [COLLECTION]`

Delete Collection

```
USAGE
  $ rockset api:collections:deleteCollection [WORKSPACE] [COLLECTION]

ARGUMENTS
  WORKSPACE   name of the workspace
  COLLECTION  name of the collection

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  Delete Collection

  Delete a collection and all its documents from Rockset.

  Endpoint: DELETE: /v1/orgs/self/ws/{workspace}/collections/{collection}

  Endpoint Documentation: https://docs.rockset.com/rest-api#deletecollection

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/collections/deleteCollection.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/collections/deleteCollection.ts)_

## `rockset api:collections:getCollection [WORKSPACE] [COLLECTION]`

Get Collection

```
USAGE
  $ rockset api:collections:getCollection [WORKSPACE] [COLLECTION]

ARGUMENTS
  WORKSPACE   name of the workspace
  COLLECTION  name of the collection

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  Get Collection

  Get details about a collection.

  Endpoint: GET: /v1/orgs/self/ws/{workspace}/collections/{collection}

  Endpoint Documentation: https://docs.rockset.com/rest-api#getcollection

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/collections/getCollection.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/collections/getCollection.ts)_

## `rockset api:collections:listCollections`

List Collections

```
USAGE
  $ rockset api:collections:listCollections

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  List Collections

  Retrieve all collections in an organization.

  Endpoint: GET: /v1/orgs/self/collections

  Endpoint Documentation: https://docs.rockset.com/rest-api#listcollections

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/collections/listCollections.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/collections/listCollections.ts)_

## `rockset api:collections:listQueryLambdasInCollection [WORKSPACE] [COLLECTION]`

Get Query Lambdas

```
USAGE
  $ rockset api:collections:listQueryLambdasInCollection [WORKSPACE] [COLLECTION]

ARGUMENTS
  WORKSPACE   name of the workspace
  COLLECTION  name of the collection

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  Get Query Lambdas

  Get all Query Lambdas that hit a specific Rockset Collection.

  Endpoint: GET: /v1/orgs/self/ws/{workspace}/collections/{collection}/lambdas

  Endpoint Documentation: https://docs.rockset.com/rest-api#listquerylambdasincollection

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/collections/listQueryLambdasInCollection.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/collections/listQueryLambdasInCollection.ts)_

## `rockset api:collections:workspaceCollections [WORKSPACE]`

List Collections for Workspace

```
USAGE
  $ rockset api:collections:workspaceCollections [WORKSPACE]

ARGUMENTS
  WORKSPACE  name of the workspace

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  List Collections for Workspace

  Retrieve all collections in a workspace.

  Endpoint: GET: /v1/orgs/self/ws/{workspace}/collections

  Endpoint Documentation: https://docs.rockset.com/rest-api#workspacecollections

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/collections/workspaceCollections.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/collections/workspaceCollections.ts)_

## `rockset api:documents:addDocuments [WORKSPACE] [COLLECTION] [BODY]`

Add Documents

```
USAGE
  $ rockset api:documents:addDocuments [WORKSPACE] [COLLECTION] [BODY]

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

  -x, --extended                 show extra columns

  -y, --yes                      Skip all safety prompts

  --columns=columns              only show provided columns (comma-separated)

  --csv                          output is csv format [alias: --output=csv]

  --filter=filter                filter property by partial string matching, ex: name=foo

  --full                         Show the full results JSON object

  --no-header                    hide table header from output

  --no-truncate                  do not truncate output to fit screen

  --output=csv|json|yaml         output in a more machine friendly format

  --sort=sort                    property to sort by (prepend '-' for descending)

DESCRIPTION
  Add Documents

  Add documents to a collection in Rockset.

  Endpoint: POST: /v1/orgs/self/ws/{workspace}/collections/{collection}/docs

  Endpoint Documentation: https://docs.rockset.com/rest-api#adddocuments

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/documents/addDocuments.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/documents/addDocuments.ts)_

## `rockset api:documents:deleteDocuments [WORKSPACE] [COLLECTION] [BODY]`

Delete Documents

```
USAGE
  $ rockset api:documents:deleteDocuments [WORKSPACE] [COLLECTION] [BODY]

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

  -x, --extended                 show extra columns

  -y, --yes                      Skip all safety prompts

  --columns=columns              only show provided columns (comma-separated)

  --csv                          output is csv format [alias: --output=csv]

  --filter=filter                filter property by partial string matching, ex: name=foo

  --full                         Show the full results JSON object

  --no-header                    hide table header from output

  --no-truncate                  do not truncate output to fit screen

  --output=csv|json|yaml         output in a more machine friendly format

  --sort=sort                    property to sort by (prepend '-' for descending)

DESCRIPTION
  Delete Documents

  Delete documents from a collection in Rockset.

  Endpoint: DELETE: /v1/orgs/self/ws/{workspace}/collections/{collection}/docs

  Endpoint Documentation: https://docs.rockset.com/rest-api#deletedocuments

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/documents/deleteDocuments.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/documents/deleteDocuments.ts)_

## `rockset api:documents:patchDocuments [WORKSPACE] [COLLECTION] [BODY]`

Patch Documents

```
USAGE
  $ rockset api:documents:patchDocuments [WORKSPACE] [COLLECTION] [BODY]

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

  -x, --extended                 show extra columns

  -y, --yes                      Skip all safety prompts

  --columns=columns              only show provided columns (comma-separated)

  --csv                          output is csv format [alias: --output=csv]

  --filter=filter                filter property by partial string matching, ex: name=foo

  --full                         Show the full results JSON object

  --no-header                    hide table header from output

  --no-truncate                  do not truncate output to fit screen

  --output=csv|json|yaml         output in a more machine friendly format

  --sort=sort                    property to sort by (prepend '-' for descending)

DESCRIPTION
  Patch Documents

  Patch documents in a collection

  Endpoint: PATCH: /v1/orgs/self/ws/{workspace}/collections/{collection}/docs

  Endpoint Documentation: https://docs.rockset.com/rest-api#patchdocuments

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/documents/patchDocuments.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/documents/patchDocuments.ts)_

## `rockset api:integrations:createIntegration [BODY]`

Create Integration

```
USAGE
  $ rockset api:integrations:createIntegration [BODY]

ARGUMENTS
  BODY  integration credentials

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  Create Integration

  Create a new integration with Rockset.

  Endpoint: POST: /v1/orgs/self/integrations

  Endpoint Documentation: https://docs.rockset.com/rest-api#createintegration

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/integrations/createIntegration.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/integrations/createIntegration.ts)_

## `rockset api:integrations:deleteIntegration [INTEGRATION]`

Delete Integration

```
USAGE
  $ rockset api:integrations:deleteIntegration [INTEGRATION]

ARGUMENTS
  INTEGRATION  name of the integration

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  Delete Integration

  Remove an integration.

  Endpoint: DELETE: /v1/orgs/self/integrations/{integration}

  Endpoint Documentation: https://docs.rockset.com/rest-api#deleteintegration

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/integrations/deleteIntegration.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/integrations/deleteIntegration.ts)_

## `rockset api:integrations:getIntegration [INTEGRATION]`

Get Integration

```
USAGE
  $ rockset api:integrations:getIntegration [INTEGRATION]

ARGUMENTS
  INTEGRATION  name of the integration

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  Get Integration

  Get information about a single integration.

  Endpoint: GET: /v1/orgs/self/integrations/{integration}

  Endpoint Documentation: https://docs.rockset.com/rest-api#getintegration

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/integrations/getIntegration.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/integrations/getIntegration.ts)_

## `rockset api:integrations:listIntegrations`

List Integrations

```
USAGE
  $ rockset api:integrations:listIntegrations

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  List Integrations

  List all integrations for organization.

  Endpoint: GET: /v1/orgs/self/integrations

  Endpoint Documentation: https://docs.rockset.com/rest-api#listintegrations

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/integrations/listIntegrations.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/integrations/listIntegrations.ts)_

## `rockset api:orgs:getOrganization`

Get Organization

```
USAGE
  $ rockset api:orgs:getOrganization

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  Get Organization

  Retrieve information about current organization.

  Endpoint: GET: /v1/orgs/self

  Endpoint Documentation: https://docs.rockset.com/rest-api#getorganization

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/orgs/getOrganization.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/orgs/getOrganization.ts)_

## `rockset api:queries:query [BODY]`

Query

```
USAGE
  $ rockset api:queries:query [BODY]

ARGUMENTS
  BODY  JSON object

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be json. Keys are translated
                                 into arguments of the same name. If no BODY argument is specified, the whole object,
                                 minus keys used as other arguments, will be passed in as the BODY.

  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this apicall. The value
                                 passed to this flag determines how many requests per second will be sent

  -x, --extended                 show extra columns

  -y, --yes                      Skip all safety prompts

  --columns=columns              only show provided columns (comma-separated)

  --csv                          output is csv format [alias: --output=csv]

  --filter=filter                filter property by partial string matching, ex: name=foo

  --full                         Show the full results JSON object

  --no-header                    hide table header from output

  --no-truncate                  do not truncate output to fit screen

  --output=csv|json|yaml         output in a more machine friendly format

  --sort=sort                    property to sort by (prepend '-' for descending)

DESCRIPTION
  Query

  Make a SQL query to Rockset.

  Endpoint: POST: /v1/orgs/self/queries

  Endpoint Documentation: https://docs.rockset.com/rest-api#query

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queries/query.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/queries/query.ts)_

## `rockset api:queryLambdas:createQueryLambda [WORKSPACE] [BODY]`

Create Query Lambda

```
USAGE
  $ rockset api:queryLambdas:createQueryLambda [WORKSPACE] [BODY]

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

  -x, --extended                 show extra columns

  -y, --yes                      Skip all safety prompts

  --columns=columns              only show provided columns (comma-separated)

  --csv                          output is csv format [alias: --output=csv]

  --filter=filter                filter property by partial string matching, ex: name=foo

  --full                         Show the full results JSON object

  --no-header                    hide table header from output

  --no-truncate                  do not truncate output to fit screen

  --output=csv|json|yaml         output in a more machine friendly format

  --sort=sort                    property to sort by (prepend '-' for descending)

DESCRIPTION
  Create Query Lambda

  Create a Query Lambda in given workspace.

  Endpoint: POST: /v1/orgs/self/ws/{workspace}/lambdas

  Endpoint Documentation: https://docs.rockset.com/rest-api#createquerylambda

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queryLambdas/createQueryLambda.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/queryLambdas/createQueryLambda.ts)_

## `rockset api:queryLambdas:deleteQueryLambda [WORKSPACE] [QUERYLAMBDA]`

Delete Query Lambda

```
USAGE
  $ rockset api:queryLambdas:deleteQueryLambda [WORKSPACE] [QUERYLAMBDA]

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

  -x, --extended                 show extra columns

  -y, --yes                      Skip all safety prompts

  --columns=columns              only show provided columns (comma-separated)

  --csv                          output is csv format [alias: --output=csv]

  --filter=filter                filter property by partial string matching, ex: name=foo

  --full                         Show the full results JSON object

  --no-header                    hide table header from output

  --no-truncate                  do not truncate output to fit screen

  --output=csv|json|yaml         output in a more machine friendly format

  --sort=sort                    property to sort by (prepend '-' for descending)

DESCRIPTION
  Delete Query Lambda

  Delete a Query Lambda.

  Endpoint: DELETE: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}

  Endpoint Documentation: https://docs.rockset.com/rest-api#deletequerylambda

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queryLambdas/deleteQueryLambda.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/queryLambdas/deleteQueryLambda.ts)_

## `rockset api:queryLambdas:executeQueryLambda [WORKSPACE] [QUERYLAMBDA] [VERSION] [BODY]`

Run Query Lambda

```
USAGE
  $ rockset api:queryLambdas:executeQueryLambda [WORKSPACE] [QUERYLAMBDA] [VERSION] [BODY]

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

  -x, --extended                 show extra columns

  -y, --yes                      Skip all safety prompts

  --columns=columns              only show provided columns (comma-separated)

  --csv                          output is csv format [alias: --output=csv]

  --filter=filter                filter property by partial string matching, ex: name=foo

  --full                         Show the full results JSON object

  --no-header                    hide table header from output

  --no-truncate                  do not truncate output to fit screen

  --output=csv|json|yaml         output in a more machine friendly format

  --sort=sort                    property to sort by (prepend '-' for descending)

DESCRIPTION
  Run Query Lambda

  Run a particular version of a Query Lambda.

  Endpoint: POST: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions/{version}

  Endpoint Documentation: https://docs.rockset.com/rest-api#executequerylambda

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queryLambdas/executeQueryLambda.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/queryLambdas/executeQueryLambda.ts)_

## `rockset api:queryLambdas:getQueryLambdaVersion [WORKSPACE] [QUERYLAMBDA] [VERSION]`

Get Query Lambda Version

```
USAGE
  $ rockset api:queryLambdas:getQueryLambdaVersion [WORKSPACE] [QUERYLAMBDA] [VERSION]

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

  -x, --extended                 show extra columns

  -y, --yes                      Skip all safety prompts

  --columns=columns              only show provided columns (comma-separated)

  --csv                          output is csv format [alias: --output=csv]

  --filter=filter                filter property by partial string matching, ex: name=foo

  --full                         Show the full results JSON object

  --no-header                    hide table header from output

  --no-truncate                  do not truncate output to fit screen

  --output=csv|json|yaml         output in a more machine friendly format

  --sort=sort                    property to sort by (prepend '-' for descending)

DESCRIPTION
  Get Query Lambda Version

  Get a specific version of a Query Lambda

  Endpoint: GET: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions/{version}

  Endpoint Documentation: https://docs.rockset.com/rest-api#getquerylambdaversion

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queryLambdas/getQueryLambdaVersion.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/queryLambdas/getQueryLambdaVersion.ts)_

## `rockset api:queryLambdas:listAllQueryLambdas`

List Query Lambdas

```
USAGE
  $ rockset api:queryLambdas:listAllQueryLambdas

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be json. Keys are translated
                                 into arguments of the same name. If no BODY argument is specified, the whole object,
                                 minus keys used as other arguments, will be passed in as the BODY.

  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this apicall. The value
                                 passed to this flag determines how many requests per second will be sent

  -x, --extended                 show extra columns

  -y, --yes                      Skip all safety prompts

  --columns=columns              only show provided columns (comma-separated)

  --csv                          output is csv format [alias: --output=csv]

  --filter=filter                filter property by partial string matching, ex: name=foo

  --full                         Show the full results JSON object

  --no-header                    hide table header from output

  --no-truncate                  do not truncate output to fit screen

  --output=csv|json|yaml         output in a more machine friendly format

  --sort=sort                    property to sort by (prepend '-' for descending)

DESCRIPTION
  List Query Lambdas

  List all Query Lambdas.

  Endpoint: GET: /v1/orgs/self/lambdas

  Endpoint Documentation: https://docs.rockset.com/rest-api#listallquerylambdas

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queryLambdas/listAllQueryLambdas.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/queryLambdas/listAllQueryLambdas.ts)_

## `rockset api:queryLambdas:listQueryLambdaVersions [WORKSPACE] [QUERYLAMBDA]`

List Query Lambda Versions

```
USAGE
  $ rockset api:queryLambdas:listQueryLambdaVersions [WORKSPACE] [QUERYLAMBDA]

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

  -x, --extended                 show extra columns

  -y, --yes                      Skip all safety prompts

  --columns=columns              only show provided columns (comma-separated)

  --csv                          output is csv format [alias: --output=csv]

  --filter=filter                filter property by partial string matching, ex: name=foo

  --full                         Show the full results JSON object

  --no-header                    hide table header from output

  --no-truncate                  do not truncate output to fit screen

  --output=csv|json|yaml         output in a more machine friendly format

  --sort=sort                    property to sort by (prepend '-' for descending)

DESCRIPTION
  List Query Lambda Versions

  List all versions of a Query Lambda.

  Endpoint: GET: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions

  Endpoint Documentation: https://docs.rockset.com/rest-api#listquerylambdaversions

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queryLambdas/listQueryLambdaVersions.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/queryLambdas/listQueryLambdaVersions.ts)_

## `rockset api:queryLambdas:listQueryLambdasInWorkspace [WORKSPACE]`

List Query Lambdas

```
USAGE
  $ rockset api:queryLambdas:listQueryLambdasInWorkspace [WORKSPACE]

ARGUMENTS
  WORKSPACE  name of the workspace

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be json. Keys are translated
                                 into arguments of the same name. If no BODY argument is specified, the whole object,
                                 minus keys used as other arguments, will be passed in as the BODY.

  -h, --help                     show CLI help

  -l, --loadTestRps=loadTestRps  If this flag is active, a load test will be conducted using this apicall. The value
                                 passed to this flag determines how many requests per second will be sent

  -x, --extended                 show extra columns

  -y, --yes                      Skip all safety prompts

  --columns=columns              only show provided columns (comma-separated)

  --csv                          output is csv format [alias: --output=csv]

  --filter=filter                filter property by partial string matching, ex: name=foo

  --full                         Show the full results JSON object

  --no-header                    hide table header from output

  --no-truncate                  do not truncate output to fit screen

  --output=csv|json|yaml         output in a more machine friendly format

  --sort=sort                    property to sort by (prepend '-' for descending)

DESCRIPTION
  List Query Lambdas

  List all Query Lambdas under given workspace.

  Endpoint: GET: /v1/orgs/self/ws/{workspace}/lambdas

  Endpoint Documentation: https://docs.rockset.com/rest-api#listquerylambdasinworkspace

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queryLambdas/listQueryLambdasInWorkspace.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/queryLambdas/listQueryLambdasInWorkspace.ts)_

## `rockset api:queryLambdas:updateQueryLambda [WORKSPACE] [QUERYLAMBDA] [BODY]`

Update Query Lambda

```
USAGE
  $ rockset api:queryLambdas:updateQueryLambda [WORKSPACE] [QUERYLAMBDA] [BODY]

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

  -x, --extended                 show extra columns

  -y, --yes                      Skip all safety prompts

  --columns=columns              only show provided columns (comma-separated)

  --csv                          output is csv format [alias: --output=csv]

  --filter=filter                filter property by partial string matching, ex: name=foo

  --full                         Show the full results JSON object

  --no-header                    hide table header from output

  --no-truncate                  do not truncate output to fit screen

  --output=csv|json|yaml         output in a more machine friendly format

  --sort=sort                    property to sort by (prepend '-' for descending)

DESCRIPTION
  Update Query Lambda

  Create a new version of a Query Lambda in given workspace.

  Endpoint: POST: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions

  Endpoint Documentation: https://docs.rockset.com/rest-api#updatequerylambda

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queryLambdas/updateQueryLambda.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/queryLambdas/updateQueryLambda.ts)_

## `rockset api:users:createUser [BODY]`

Create User

```
USAGE
  $ rockset api:users:createUser [BODY]

ARGUMENTS
  BODY  JSON object

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  Create User

  Create a new user for an organization.

  Endpoint: POST: /v1/orgs/self/users

  Endpoint Documentation: https://docs.rockset.com/rest-api#createuser

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/users/createUser.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/users/createUser.ts)_

## `rockset api:users:deleteUser [USER]`

Delete User

```
USAGE
  $ rockset api:users:deleteUser [USER]

ARGUMENTS
  USER  user email

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  Delete User

  Delete a user from an organization.

  Endpoint: DELETE: /v1/orgs/self/users/{user}

  Endpoint Documentation: https://docs.rockset.com/rest-api#deleteuser

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/users/deleteUser.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/users/deleteUser.ts)_

## `rockset api:users:getCurrentUser`

Get Current User

```
USAGE
  $ rockset api:users:getCurrentUser

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  Get Current User

  Retrieve currently active user.

  Endpoint: GET: /v1/orgs/self/users/self

  Endpoint Documentation: https://docs.rockset.com/rest-api#getcurrentuser

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/users/getCurrentUser.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/users/getCurrentUser.ts)_

## `rockset api:users:listUsers`

List Users

```
USAGE
  $ rockset api:users:listUsers

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  List Users

  Retrieve all users for an organization.

  Endpoint: GET: /v1/orgs/self/users

  Endpoint Documentation: https://docs.rockset.com/rest-api#listusers

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/users/listUsers.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/users/listUsers.ts)_

## `rockset api:workspaces:childWorkspaces [WORKSPACE]`

List Workspaces

```
USAGE
  $ rockset api:workspaces:childWorkspaces [WORKSPACE]

ARGUMENTS
  WORKSPACE  name of the workspace

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  List Workspaces

  List workspaces under given workspace.

  Endpoint: GET: /v1/orgs/self/ws/{workspace}/ws

  Endpoint Documentation: https://docs.rockset.com/rest-api#childworkspaces

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/workspaces/childWorkspaces.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/workspaces/childWorkspaces.ts)_

## `rockset api:workspaces:createWorkspace [BODY]`

Create Workspace

```
USAGE
  $ rockset api:workspaces:createWorkspace [BODY]

ARGUMENTS
  BODY  workspace details

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  Create Workspace

  Create a new workspace in your org.

  Endpoint: POST: /v1/orgs/self/ws

  Endpoint Documentation: https://docs.rockset.com/rest-api#createworkspace

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/workspaces/createWorkspace.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/workspaces/createWorkspace.ts)_

## `rockset api:workspaces:deleteWorkspace [WORKSPACE]`

Delete Workspace

```
USAGE
  $ rockset api:workspaces:deleteWorkspace [WORKSPACE]

ARGUMENTS
  WORKSPACE  name of the workspace

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  Delete Workspace

  Remove a workspace.

  Endpoint: DELETE: /v1/orgs/self/ws/{workspace}

  Endpoint Documentation: https://docs.rockset.com/rest-api#deleteworkspace

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/workspaces/deleteWorkspace.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/workspaces/deleteWorkspace.ts)_

## `rockset api:workspaces:getWorkspace [WORKSPACE]`

Get Workspace

```
USAGE
  $ rockset api:workspaces:getWorkspace [WORKSPACE]

ARGUMENTS
  WORKSPACE  name of the workspace

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  Get Workspace

  Get information about a single workspace.

  Endpoint: GET: /v1/orgs/self/ws/{workspace}

  Endpoint Documentation: https://docs.rockset.com/rest-api#getworkspace

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/workspaces/getWorkspace.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/workspaces/getWorkspace.ts)_

## `rockset api:workspaces:listWorkspaces`

List Workspaces

```
USAGE
  $ rockset api:workspaces:listWorkspaces

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be json. Keys are translated into
                          arguments of the same name. If no BODY argument is specified, the whole object, minus keys
                          used as other arguments, will be passed in as the BODY.

  -h, --help              show CLI help

  -x, --extended          show extra columns

  --columns=columns       only show provided columns (comma-separated)

  --csv                   output is csv format [alias: --output=csv]

  --filter=filter         filter property by partial string matching, ex: name=foo

  --full                  Show the full results JSON object

  --no-header             hide table header from output

  --no-truncate           do not truncate output to fit screen

  --output=csv|json|yaml  output in a more machine friendly format

  --sort=sort             property to sort by (prepend '-' for descending)

DESCRIPTION
  List Workspaces

  List all workspaces.

  Endpoint: GET: /v1/orgs/self/ws

  Endpoint Documentation: https://docs.rockset.com/rest-api#listworkspaces

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/workspaces/listWorkspaces.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/api/workspaces/listWorkspaces.ts)_

## `rockset auth:add NAME APIKEY [APISERVER]`

Create a new profile with the specified name and apikey.

```
USAGE
  $ rockset auth:add NAME APIKEY [APISERVER]

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

_See code: [src/commands/auth/add.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/auth/add.ts)_

## `rockset auth:list`

List all of the available profiles.

```
USAGE
  $ rockset auth:list

OPTIONS
  -h, --help  show CLI help

DESCRIPTION
  List all of the available profiles.
```

_See code: [src/commands/auth/list.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/auth/list.ts)_

## `rockset auth:use NAME`

Use a specific authentication profile.

```
USAGE
  $ rockset auth:use NAME

ARGUMENTS
  NAME  The name of the profile you wish to use.

OPTIONS
  -h, --help  show CLI help

DESCRIPTION
  Use a specific authentication profile.
```

_See code: [src/commands/auth/use.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/auth/use.ts)_

## `rockset autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ rockset autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ rockset autocomplete
  $ rockset autocomplete bash
  $ rockset autocomplete zsh
  $ rockset autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.2.0/src/commands/autocomplete/index.ts)_

## `rockset help [COMMAND]`

display help for rockset

```
USAGE
  $ rockset help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `rockset project:add NAME`

Add an empty entity with the specified name to the project. The path for the entity is the same

```
USAGE
  $ rockset project:add NAME

ARGUMENTS
  NAME  The fully qualified name of the entity you wish to resolve

OPTIONS
  -e, --entity=lambda  [default: lambda] the type of entity you wish to add
  -h, --help           show CLI help

DESCRIPTION
  Add an empty entity with the specified name to the project. The path for the entity is the same
     as would be created with 'rockset project:resolve'
```

_See code: [src/commands/project/add.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/project/add.ts)_

## `rockset project:delete`

Delete all query lambdas from the project.

```
USAGE
  $ rockset project:delete

OPTIONS
  -h, --help  show CLI help
  -y, --yes   Bypass the safety checks, and automatically engage in dangerous actions.

DESCRIPTION
  Delete all query lambdas from the project.
```

_See code: [src/commands/project/delete.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/project/delete.ts)_

## `rockset project:deploy`

Deploy Query Lambda entities to Rockset from your local project.

```
USAGE
  $ rockset project:deploy

OPTIONS
  -h, --help                                                                show CLI help
  -t, --tag=
          Specify a tag name to be applied to these Query Lambda versions.

DESCRIPTION
  Deploy Query Lambda entities to Rockset from your local project.
```

_See code: [src/commands/project/deploy.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/project/deploy.ts)_

## `rockset project:download`

Download Query Lambda entities from Rockset to your local project.

```
USAGE
  $ rockset project:download

OPTIONS
  -h, --help                                                                            show CLI help
  -t, --tag=
          Specify a value to download all Query Lambda versions tagged with this tag. 
          Query Lambdas that do not have a version with this tag name will be skipped.

DESCRIPTION
  Download Query Lambda entities from Rockset to your local project.
```

_See code: [src/commands/project/download.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/project/download.ts)_

## `rockset project:execute NAME`

Execute a specific version of a Query Lambda in the current project.

```
USAGE
  $ rockset project:execute NAME

ARGUMENTS
  NAME  The fully qualified name of the Query Lambda you wish to execute

OPTIONS
  -h, --help  show CLI help

DESCRIPTION
  Execute a specific version of a Query Lambda in the current project.
  
     You must specify the fully qualified name of the Query Lambda: eg. 'commons.foo'.

     You must specify the specific version to execute: eg. 'b1d7c9a34b50cd'.
```

_See code: [src/commands/project/execute.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/project/execute.ts)_

## `rockset project:init`

Initialize your project.

```
USAGE
  $ rockset project:init

OPTIONS
  -h, --help  show CLI help

DESCRIPTION
  Initialize your project.

  This command initializes your project with a rockconfig.json file.
```

_See code: [src/commands/project/init.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/project/init.ts)_

## `rockset project:list`

List all of the entities in the current project. Note: this does not list entities on remote. For that, please use

```
USAGE
  $ rockset project:list

OPTIONS
  -e, --entity=lambda  [default: lambda] the type of entity you wish to list
  -h, --help           show CLI help

DESCRIPTION
  List all of the entities in the current project. Note: this does not list entities on remote. For that, please use
     the API endpoints present in 'rockset api:...'
```

_See code: [src/commands/project/list.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/project/list.ts)_

## `rockset project:resolve NAME`

Resolve the absolute path of an entity in the current project.

```
USAGE
  $ rockset project:resolve NAME

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

_See code: [src/commands/project/resolve.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/project/resolve.ts)_

## `rockset project:serve`

Start a development server that allows you to execute Query Lambdas from your local project from a development UI.

```
USAGE
  $ rockset project:serve

OPTIONS
  -h, --help       show CLI help
  -p, --port=port  [default: 3001] The port to start the server at

DESCRIPTION
  Start a development server that allows you to execute Query Lambdas from your local project from a development UI.
```

_See code: [src/commands/project/serve.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/project/serve.ts)_

## `rockset sql [SQL]`

Execute a SQL expression.

```
USAGE
  $ rockset sql [SQL]

ARGUMENTS
  SQL  Rockset SQL string to execute

OPTIONS
  -h, --help                       show CLI help

  -l, --defaultLimit=defaultLimit  Set the default row limit property on the query. This will set a default limit on the
                                   query that can be overrided by a limit in the SQL text.

  -x, --extended                   show extra columns

  --columns=columns                only show provided columns (comma-separated)

  --csv                            output is csv format [alias: --output=csv]

  --filter=filter                  filter property by partial string matching, ex: name=foo

  --no-header                      hide table header from output

  --no-truncate                    do not truncate output to fit screen

  --output=csv|json|yaml           output in a more machine friendly format

  --sort=sort                      property to sort by (prepend '-' for descending)

DESCRIPTION
  Execute a SQL expression.

EXAMPLE

     // Runs a sql query passed as a string
     rockset sql QUERY

     // Opens your default editor to edit more complex queries
     rockset sql -e
```

_See code: [src/commands/sql.ts](https://github.com/rockset/rockset-js/blob/v0.2.1/src/commands/sql.ts)_

## `rockset update [CHANNEL]`

update the rockset CLI

```
USAGE
  $ rockset update [CHANNEL]
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v1.3.10/src/commands/update.ts)_
<!-- commandsstop -->
