@rockset/cli
============

Official Rockset CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@rockset/cli.svg)](https://npmjs.org/package/@rockset/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@rockset/cli.svg)](https://npmjs.org/package/@rockset/cli)
[![License](https://img.shields.io/npm/l/@rockset/cli.svg)](https://github.com/rockset/rockset-js/blob/master/package.json)
![Build|Lint|Test](https://github.com/rockset/rockset-js/workflows/Build%7CLint%7CTest/badge.svg)

<!-- toc -->
* [Download & Installation Instructions](#download--installation-instructions)
* [Getting Started](#getting-started)
* [Usage Overview](#usage-overview)
* [API Usage Details](#api-usage-details)
* [Rockset Projects Usage Details](#rockset-projects-usage-details)
* [Telemetry](#telemetry)
* [Commands](#commands)
<!-- tocstop -->

# Download & Installation Instructions

### Install using `curl` (Recommended)

This standalone installation is ideal for most environments as it contains its own Node.js binary and automatically updates. However, it is **not Windows compatible**. 

```
curl https://rockset-cli-artifacts.s3-us-west-2.amazonaws.com/install-standalone.sh | bash 
```

Running this script requires sudo access. **Be sure to restart your command line once the installation is completed.**

### Install using `npm` (Not Recommended)

As a standalone Node.js binary, you can also install the `@rockset/cli` package directly from `npm`. However, it is strongly recommended that you use another installation method as the package will not be able to autoupdate and requires you to use your system's version of Node.js. If you choose to use this installation method, ensure you are on Node.js 10.x or 12.x before attempting it.

```
npm install -g @rockset/cli
```

### Verify Your Installation
To verify that your installation was completed successfully, you may run `rockset --version` in your command line.
```
$ rockset --version
```

# Getting Started

The following steps will help you configure the CLI tool.

To view the list of available commands, run `rockset -h` in your command line.
```
$ rockset -h
```

### Updating the Rockset CLI

You can update the Rockset CLI to the latest version at any time using `rockset update`.
```
$ rockset update
```

### Installing Autocomplete

The Rockset CLI Autocomplete feature allows you to preview and complete commands using your tab key. It is currently only compatible on bash and zsh, and we have no plans to support other shells at this time.

To install this feature, update the CLI and run `rockset autocomplete` in your command line. You will receive different instructions depending on which shell you are using.
```
$ rockset update
$ rockset autocomplete
```
You may need to restart your command line to enable the autocomplete feature after installation.

### Setting Up Authentication

To use the Rockset CLI tool, you will need to create an authentication profile using your API Key which can be created and found in the [Rockset Console](https://console.rockset.com/apikeys).

Once you have successfully obtained your API key, run the `rockset auth:add` command to create your authentication profile. Running the following command will create an authentication profile named `default`:

```
$ rockset auth:add default [API Key]
```

# Usage Overview

The new Rockset CLI supports 4 core workflows.

1. Authentication (`rockset auth`)
1. Rockset SQL Execution Support (`rockset sql`)
1. REST API support (`rockset api`)
    1. Execute any endpoint in the [Rockset REST API](https://docs.rockset.com/rest-api)
    1. Load test select routes
1. Local support for Query Lambdas(`rockset local`)
    1. Download your Query Lambdas to your local file system
    1. Edit your Query Lambdas and commit to git (or the version control system of your choice)
    1. Deploy your Query Lambdas to Rockset

Basic usage is demonstrated below:

```bash
#. Get specific help for a command
$ rockset -h [COMMAND]
USAGE
  $ rockset COMMAND

#. View different auth profiles
$ rockset auth:list

#. Use a different auth profile
$ rockset auth:use

#. Run a SQL query
$ rockset sql "SELECT 'hello, world!"

#. List all Query Lambdas in "commons" workspace
$ rockset api:queryLambdas:listQueryLambdasInWorkspace commons

#. Initialize a Rockset Project in the current directory
$ rockset local:init

#. Download your Query Lambdas
$ rockset local:download

#. Serve the Rockset Project Development Server and UI to test your local Query Lambdas
$ rockset local:serve

#. Deploy your local Query Lambdas to Rockset
$ rockset local:deploy

#. Update to the latest CLI version
$ rockset update

```

# API Usage Details

## Organization

The API tool is contained in `rockset api`. This tool is designed to very closely match the layout of our [REST API endpoints](https://docs.rockset.com/rest-api). This remainder of this section provides examples for using these commands.

The API calls are further broken into subcommands based on the resource that the command affects. This reflects the breakdown of our API Documentation.

* apikeys
* collections
* documents
* integrations
* orgs
* queries
* queryLambdas
* users
* workspaces

For example, all endpoints for creating, deleting, and managing Collections will appear under the `rockset api:collections` path.

To view all available endpoints for a resource, use the `-h` flag.

```
$ rockset api:collections -h

USAGE
  $ rockset api:collections:COMMAND

DESCRIPTION
  Create Collection

  Create new collection in a workspace.

  Endpoint: POST: /v1/orgs/self/ws/{workspace}/collections

  Endpoint Documentation: https://docs.rockset.com/rest-api#createcollection

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.



COMMANDS
  api:collections:createCollection
  api:collections:deleteCollection
  api:collections:getCollection
  api:collections:listCollections
  api:collections:listQueryLambdasInCollection
  api:collections:workspaceCollections

```

## Input Arguments Examples

Each API command will accept positional arguments that translate to the URL parameters of the REST endpoint that they wrap. API Commands that wrap POST requests will additionally accept a JSON string for the Body of the POST request. This JSON string will be passed directly to the API Endpoint, and should thus match the API specification.

```bash
#. GET All Collections
$ rockset api:collections:listCollections
[INFO]: GET: /v1/orgs/self/collections
[INFO]: Arguments:
[INFO]: {}
Created at           Created by                    Name                  Description
2020-06-24T00:12:30Z scott@rockset.com             Collections           null          
2020-06-30T17:24:03Z ben@rockset.com               Collections2          null                                         
2020-07-01T21:03:07Z joe@rockset.com               JoeTest               null                                         

#. GET One Collection
$ rockset api:collections:getCollection commons Collections
[INFO]: GET: /v1/orgs/self/ws/{workspace}/collections/{collection}
[INFO]: Arguments:
[INFO]: {
  "workspace": "commons",
  "collection": "Collections"
}
{
  "created_at": "2020-06-24T00:12:30Z",
  "created_by": "scott@rockset.com",
  "name": "Collections",
  "description": null,
  ...
}
```

Arguments can also be passed in as a JSON file specification using the `-f` flag. This is especially useful for POST requests that may require large specifications. 

1. Each top level key in the file is passed as the parameter of the corresponding name, ignoring case
2. The Body parameter for post requests can be passed in two ways. Either a top level key called "body" can be used with the JSON body, or all of the keys required in the body can be added directly to the top level. In other words, once step 1 has completed, all remaining keys are passed as the body.

```bash
#. The following two JSON files are treated identically
#. Commons.foo is a query lambda with text 'Select :foo'

$ cat spec1.json
{
  "workspace": "commons",
  "querylambda": "foo",
  "tag": "test",
  "body": {
    "parameters": [
      {
        "name": "foo",
        "type": "string",
        "value": "bar"
      }
    ]
  }
}

$ cat spec2.json
{
  "workspace": "commons",
  "querylambda": "foo",
  "tag": "test",
  "parameters": [
    {
      "name": "foo",
      "type": "string",
      "value": "bar"
    }
  ]
}

#. These two commands likewise produce the same output
$ rockset api:queryLambdas:executeQueryLambdaByTag -f spec2.json
$ rockset api:queryLambdas:executeQueryLambdaByTag -f spec1.json
[INFO]: POST: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags/{tag}
[INFO]: Arguments:
[INFO]: {
  "workspace": "commons",
  "queryLambda": "foo",
  "tag": "test",
  "body": {
    "parameters": [
      {
        "name": "foo",
        "type": "string",
        "value": "bar"
      }
    ]
  }
}
Foo
bar
```


## Output Format

All API Commands by default will intelligently grab the most relevant part of the response data and display it for you in a table. The most commonly used flags are shown below. The full set of flags can be found by setting the `-h` flag.

```
  --columns=columns              only show provided columns (comma-separated)

  --filter=filter                filter property by partial string matching, ex: name=foo

  --full                         Show the full results JSON object

  --no-header                    hide table header from output

  --output=csv|json|yaml         output in a more machine friendly format

  --sort=sort                    property to sort by (prepend '-' for descending)
```

## Load Testing

Some API commands support running load tests to test the performance of your queries under real load. Currently this includes API commands in the following categories.

* queries
* queryLambdas
* documents

To run a load test, run the command as usual and pass the `-l` flag with the number of requests you wish to make per second.

```bash

#. Run a load test against Query Lambda commons.foo, with text 'Select :foo'
$ cat spec2.json
{
  "workspace": "commons",
  "querylambda": "foo",
  "tag": "test",
  "parameters": [
    {
      "name": "foo",
      "type": "string",
      "value": "bar"
    }
  ]
}

#. Start load test
$ rockset api:queryLambdas:executeQueryLambdaByTag -f spec2.json -l 5
[INFO]: POST: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags/{tag}
[INFO]: Arguments:
[INFO]: {
  "workspace": "commons",
  "queryLambda": "foo",
  "tag": "test",
  "body": {
    "parameters": [
      {
        "name": "foo",
        "type": "string",
        "value": "bar"
      }
    ]
  }
}
? Please confirm that you would like to send 5 API requests per second to the endpoint show above.
Sending huge amounts of requests may cause performance issues for the rest of your organization. Please be careful › (y/N) ... yes

****
Sent: 0
Success: 0
Failure: 0
Pending: 0
Average Success Latency: NaN ms
Average Failure Latency: NaN ms



****
Sent: 5
Success: 5
Failure: 0
Pending: 0
Average Success Latency: 257 ms
Average Failure Latency: NaN ms



****
Sent: 10
Success: 10
Failure: 0
Pending: 0
Average Success Latency: 168 ms
Average Failure Latency: NaN ms



****
Sent: 15
Success: 15
Failure: 0
Pending: 0
Average Success Latency: 140 ms
Average Failure Latency: NaN ms

...

#. Load test will continue to run until it is killed
```


## More Examples

**Create a Collection**

```yaml
#. YAML Spec for this collection
name: footest
workspace: commons
sources:
- s3:
    access_key: ''
    secret_access: ''
    prefix: partial-cities
    region: us-west-2
    bucket: rockset-public-datasets
    prefixes:
    - partial-cities
    mappings: []
  format: JSON
retention_secs: 100000
field_mappings:
- name: transformation538cvdohk
  is_drop_all_fields:
  input_fields:
  - field_name: fields.country
    if_missing: PASS
    is_drop: true
    param: country
  output_field:
    field_name: lenCountry
    value:
      sql: LENGTH(:country)
    on_error: SKIP
```

```bash
$ rockset api:collections:createCollection -f spec.yaml
[INFO]: POST: /v1/orgs/self/ws/{workspace}/collections
[INFO]: Arguments:
[INFO]: {
  "workspace": "commons",
  "body": {
    "name": "footest",
    "sources": [
      {
        "s3": {
          "access_key": "",
          "secret_access": "",
          "prefix": "partial-cities",
          "region": "us-west-2",
          "bucket": "rockset-public-datasets",
          "prefixes": [
            "partial-cities"
          ],
          "mappings": []
        },
        "format": "JSON"
      }
    ],
    "retention_secs": 100000,
    "field_mappings": [
      {
        "name": "transformation538cvdohk",
        "is_drop_all_fields": null,
        "input_fields": [
          {
            "field_name": "fields.country",
            "if_missing": "PASS",
            "is_drop": true,
            "param": "country"
          }
        ],
        "output_field": {
          "field_name": "lenCountry",
          "value": {
            "sql": "LENGTH(:country)"
          },
          "on_error": "SKIP"
        }
      }
    ]
  }
}
...
```

# Rockset Projects Usage Details

Rockset Projects is an ecosystem of developer focused tools to help you work with your Query Lambdas. The Project CLI tool consists of subcommands of  `rockset local`. This tool is designed to help you easily manage your Query Lambdas and integrate well with versioning tools like Git.

To get started, first set up your Rockset Project by creating a `rockset.config.json` file in your project root. We highly recommend that this directory be under version control. All of the files handled by the tool can be safely checked in.

```bash
$ rockset local:init
✔ Enter the root path for your Query Lambdas … src
✔ Creating an rockset.config.json file including
{
  "source_root": "src"
}
Is this okay? … yes
$ cat rockset.config.json
{
  "source_root": "src"
}

#. Download your existing Query Lambdas from Rockset's API Server
#. This will download the latest versions of your Query Lambdas
#. You can also download lambdas by tag using the -t flag
$ rockset local:download
Downloaded lambda commons.QLBar
Downloaded lambda commons.QLFoo
Downloaded lambda frontend.QLFrontend

#. Visualize the project structure
$ tree
.
├── rockconfig.json
└── src
    ├── commons
    │   ├── QLBar.lambda.json
    │   ├── QLFoo.lambda.json
    │   └── __sql
    │       ├── QLBar.sql
    │       └── QLFoo.sql
    └── frontend
        ├── QLFrontend.lambda.json
        └── __sql
            └── QLFrontend.sql
```

As you can see, each Query Lambda is placed in a directory with the same name as its workspace. Each query lambda has two files associated with it.

* `<workspace/path>/QL.lambda.json` This is the Lambda Definition file. It includes information such as the description and the default parameters of the query lambda.
    * A Lambda Definition file must use extension `.lambda.json`. The name of the associated QL must be the name of the file
    * The parent directory of the Lambda Definition file should be its workspace 
* `<workspace/path>/__sql/QL.sql` This file contains the SQL associated with the Query Lambda.

You can also use nested workspaces. If we continue the example above:

```bash
$ rockset local:queryLambda:add prod.frontend.QLFrontend
$ tree
.
├── rockconfig.json
└── src
    ├── commons
    │   ├── QLBar.lambda.json
    │   ├── QLFoo.lambda.json
    │   └── __sql
    │       ├── QLBar.sql
    │       └── QLFoo.sql
    ├── frontend
    │   ├── QLFrontend.lambda.json
    │   └── __sql
    │       └── QLFrontend.sql
    └── prod
        └── frontend
            ├── QLFrontend.lambda.json
            └── __sql
                └── QLFrontend.sql

```
This yields nested directories to represent the nested workspace `prod.frontend`.

## The Query Lambda Definition File

Let's take a look at the Query Lambda definition file. This file is the source of truth for properties about your Query Lambda.

```bash
#. `rockset local:resolve` gives the path for a particular Query Lambda given it's Qualified Name
$ cat `rockset local:resolve prod.frontend.QLFrontend`
{
  "sql_path": "__sql/QLFrontend.sql",
  "default_parameters": [],
  "description": ""
}
```

The definition includes 3 fields:
* `sql_path` which gives the path of the SQL file relative to the parent of the definition file
* `default_parameters` which specifies the default parameters that this query lambda will use after it has been deployed
* `description` The description that will show for this query lambda after it has been deployed

Let's update our query lambda definition to the following.

```json
{
  "sql_path": "__sql/QLFrontend.sql",
  "default_parameters": [
    {
      "name": "foo",
      "type": "string",
      "value": "my foo"
    }
  ],
  "description": "My foo query lambda"
}
```

And then update our Query Lambda SQL to 

```sql
select :foo
```

Now we can execute the Query Lambda to see the result.

```bash
$ rockset local:queryLambda:execute prod.frontend.QLFrontend
[INFO]: About to execute prod.frontend.QLFrontend from local project...
[INFO]: SQL: select :foo

[INFO]: Parameters: [
  {
    "name": "foo",
    "type": "string",
    "value": "my foo"
  }
]
[INFO]: Successfully executed query.
{
  "collections": [],
  "column_fields": [
    {
      "name": "?field0",
      "type": ""
    }
  ],
  "results": [
    {
      "?field0": "my foo"
    }
  ],
  "query_id": "d9e2e2ab-75ac-4cfe-a3ca-e8346e4ee4a7:up50MQy:0",
  "stats": {
    "elapsed_time_ms": 2
  }
}

```

## Editing your Query Lambda SQL

The recommended way to edit your Query Lambdas is with the [Rockset VSCode plugin](../rscode), which provides Syntax Highlighting, Autocomplete, Error Highlighting, and more. VSCode also provides an excellent tools for editing JSON to assist you in editing your Query Lambda definition file. 

However, if you choose not to use the VSCode plugin, you can also easily edit your Query Lambdas using your preferred command line editor.

```bash
$ rockset local:resolve --sql prod.frontend.QLFrontend
/Users/tchordia/rockset-js/packages/cli/testLambdas/src/prod/frontend/__sql/QLFrontend.sql

#. open in your preferred editor
$ $EDITOR `rockset local:resolve --sql prod.frontend.QLFrontend`
```

## Executing your Rockset Project Query Lambdas

**Note: this section covers executing the local version of your query lambda. This will not help you execute a Query Lambda on Rockset's API Server. For that, please use the API tool described above**

The recommended way to execute your local Query Lambdas is with the [Rockset Project Developer UI](../dev-server). 

```bash
#. Open a UI to execute local Query Lambdas
$ rockset local:serve
```

This will open a UI for you to add parameters and inspect the results of your query. It will also set up a mock of Rockset's API server that can execute query lambdas.
Please see the [Rockset Project Developer UI Docs](../dev-server) for more information.

You can also execute your Query Lambdas from the CLI tool. The CLI tool will do the following to execute your Query Lambda.

* Resolve SQL text and default_parameters from the qualified name of the query lambda
* Override the default_parameters with any parameters you pass
* Execute the SQL text along with the computed parameters

```bash
#. Print out the text of the query we will run
$ cat `rockset local:resolve prod.frontend.QLFrontend --sql`
select :foo

#. Execute the query with parameter "foo" set to value "bar"
$ rockset local:queryLambda:execute prod.frontend.QLFrontend -p '[{"name": "foo", "type": "string", "value": "bar"}]'
{
  "collections": [],
  "column_fields": [
    {
      "name": "?field0",
      "type": ""
    }
  ],
  "results": [
    {
      "?field0": "bar"
    }
  ],
  "query_id": "6f2e8211-dd9e-408d-a8bc-55a498ef5307:5Rtq9NK:0",
  "stats": {
    "elapsed_time_ms": 2
  }
}
```

## Deploying your Query Lambdas

When you are ready, you can use `rockset local:deploy` to deploy your Query Lambdas to Rockset's service. At that point, your Query Lambdas are live to any applications that may try to hit them, so please proceed with caution.

```bash
#. This shows all query lambdas that will be deployed
$ rockset local:deploy --dryRun
commons.QLBar
commons.QLFoo
frontend.QLFrontend
frontend.l1
prod.frontend.QLFrontend

#. You can narrow the list by specifying a workspace
$ rockset local:deploy -w commons --dryRun
commons.QLBar
commons.QLFoo
 ›   Warning: Skipping: frontend.QLFrontend
 ›   Warning: Skipping: frontend.l1
 ›   Warning: Skipping: prod.frontend.QLFrontend

#. You can also specify one lambda to deploy
$ rockset local:deploy --dryRun -l commons.QLBar
commons.QLBar
 ›   Warning: Skipping: commons.QLFoo
 ›   Warning: Skipping: frontend.QLFrontend
 ›   Warning: Skipping: frontend.l1
 ›   Warning: Skipping: prod.frontend.QLFrontend

 #. When you are ready, remove the --dryRun flag to deploy
 #. In practice, you should always tag your query lambdas, so that your application can execute them by tag
$ rockset local:deploy -l commons.QLBar -t dev
 ›   Warning: Skipping: frontend.QLFrontend
 ›   Warning: Skipping: frontend.l1
 ›   Warning: Skipping: prod.frontend.QLFrontend
Successfully updated commons.QLFoo — version bb765a336e5eea9a
Successfully updated commons.QLBar — version ff631d5e8085613d
Successfully tagged commons.QLFoo version bb765a336e5eea9a with tag "dev"
Successfully tagged commons.QLBar version ff631d5e8085613d with tag "dev"

```

Sometimes, you may have added a new Query Lambda in a workspace that doesn't exist yet. In this situation, you should pass the `--createMissingWorkspaces` flag to create any workspaces that you are missing.

The deploy tool deploys lambdas in 2 steps:
1. Deploy the Lambda text and config, and version the Lambda with its hash
1. Tag the deployed Lambda with the specified tag

If the specified Query Lambda already exists, the first step is idempotent. Furthermore, the first step is idempotent with respect to your applications: since Query Lambdas are versioned by their hash, no application should be targeting the new Query Lambda yet. When the second step occurs, your application traffic may be redirected through your new Query Lambda. Please be careful: if you tag your Query Lambda with a production tag, it is possible to break your application.

## Integration with Git Version Control and CI/CD

We highly recommend that you check all of your project files into Version Control as you might with any other application files. We also recommend deploying your Query Lambdas automatically in CI/CD. 

```bash
#. In CI/CD
rockset local:deploy -t development
...

#. When you want to deploy to production
git checkout <commit hash>
rockset local:deploy -t production
```

Then, your application can hit Lambda `QLFoo` with tag `development` in development, and hit `QLFoo` with tag `production` in the production environment.

```js
// JS Application Example
rockset.queryLambdas.executeQueryLambdaByTag('commons', 'QLFoo', isProduction() ? 'production' : 'development');
```

# Telemetry

The Rockset CLI includes a telemetry feature that collects some usage data. This feature is enabled by default.

To opt out of telemetry, set the ROCKSET_CLI_TELEMETRY_OPTOUT environment variable to 1 or true.







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
* [`rockset api:queryLambdas:createQueryLambdaTag [WORKSPACE] [QUERYLAMBDA] [BODY]`](#rockset-apiquerylambdascreatequerylambdatag-workspace-querylambda-body)
* [`rockset api:queryLambdas:deleteQueryLambda [WORKSPACE] [QUERYLAMBDA]`](#rockset-apiquerylambdasdeletequerylambda-workspace-querylambda)
* [`rockset api:queryLambdas:deleteQueryLambdaTag [WORKSPACE] [QUERYLAMBDA] [TAG]`](#rockset-apiquerylambdasdeletequerylambdatag-workspace-querylambda-tag)
* [`rockset api:queryLambdas:deleteQueryLambdaVersion [WORKSPACE] [QUERYLAMBDA] [VERSION]`](#rockset-apiquerylambdasdeletequerylambdaversion-workspace-querylambda-version)
* [`rockset api:queryLambdas:executeQueryLambda [WORKSPACE] [QUERYLAMBDA] [VERSION] [BODY]`](#rockset-apiquerylambdasexecutequerylambda-workspace-querylambda-version-body)
* [`rockset api:queryLambdas:executeQueryLambdaByTag [WORKSPACE] [QUERYLAMBDA] [TAG] [BODY]`](#rockset-apiquerylambdasexecutequerylambdabytag-workspace-querylambda-tag-body)
* [`rockset api:queryLambdas:getQueryLambdaTagVersion [WORKSPACE] [QUERYLAMBDA] [TAG]`](#rockset-apiquerylambdasgetquerylambdatagversion-workspace-querylambda-tag)
* [`rockset api:queryLambdas:getQueryLambdaVersion [WORKSPACE] [QUERYLAMBDA] [VERSION]`](#rockset-apiquerylambdasgetquerylambdaversion-workspace-querylambda-version)
* [`rockset api:queryLambdas:listAllQueryLambdas`](#rockset-apiquerylambdaslistallquerylambdas)
* [`rockset api:queryLambdas:listOrganizationTags`](#rockset-apiquerylambdaslistorganizationtags)
* [`rockset api:queryLambdas:listQueryLambdaTagVersions [TAG]`](#rockset-apiquerylambdaslistquerylambdatagversions-tag)
* [`rockset api:queryLambdas:listQueryLambdaTags [WORKSPACE] [QUERYLAMBDA]`](#rockset-apiquerylambdaslistquerylambdatags-workspace-querylambda)
* [`rockset api:queryLambdas:listQueryLambdaVersions [WORKSPACE] [QUERYLAMBDA]`](#rockset-apiquerylambdaslistquerylambdaversions-workspace-querylambda)
* [`rockset api:queryLambdas:listQueryLambdasInWorkspace [WORKSPACE]`](#rockset-apiquerylambdaslistquerylambdasinworkspace-workspace)
* [`rockset api:queryLambdas:updateQueryLambda [WORKSPACE] [QUERYLAMBDA] [BODY] [CREATE]`](#rockset-apiquerylambdasupdatequerylambda-workspace-querylambda-body-create)
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
* [`rockset local:deploy`](#rockset-localdeploy)
* [`rockset local:download`](#rockset-localdownload)
* [`rockset local:init`](#rockset-localinit)
* [`rockset local:queryLambda:add NAME`](#rockset-localquerylambdaadd-name)
* [`rockset local:queryLambda:delete`](#rockset-localquerylambdadelete)
* [`rockset local:queryLambda:execute NAME`](#rockset-localquerylambdaexecute-name)
* [`rockset local:queryLambda:list`](#rockset-localquerylambdalist)
* [`rockset local:resolve NAME`](#rockset-localresolve-name)
* [`rockset local:serve`](#rockset-localserve)
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
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/apikeys/createApiKey.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/apikeys/createApiKey.ts)_

## `rockset api:apikeys:createApiKeyAdmin [BODY] [USER]`

Create API Key for any user (admin only)

```
USAGE
  $ rockset api:apikeys:createApiKeyAdmin [BODY] [USER]

ARGUMENTS
  BODY  JSON object
  USER

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/apikeys/createApiKeyAdmin.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/apikeys/createApiKeyAdmin.ts)_

## `rockset api:apikeys:deleteApiKey [NAME]`

Delete API Key

```
USAGE
  $ rockset api:apikeys:deleteApiKey [NAME]

ARGUMENTS
  NAME  name of the API key

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/apikeys/deleteApiKey.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/apikeys/deleteApiKey.ts)_

## `rockset api:apikeys:deleteApiKeyAdmin [NAME] [USER]`

Delete API Key for any user (admin only)

```
USAGE
  $ rockset api:apikeys:deleteApiKeyAdmin [NAME] [USER]

ARGUMENTS
  NAME  name of the API key
  USER

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/apikeys/deleteApiKeyAdmin.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/apikeys/deleteApiKeyAdmin.ts)_

## `rockset api:apikeys:listApiKeys`

List API Keys

```
USAGE
  $ rockset api:apikeys:listApiKeys

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/apikeys/listApiKeys.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/apikeys/listApiKeys.ts)_

## `rockset api:apikeys:listApiKeysAdmin [USER]`

List API Keys for any user (admin only)

```
USAGE
  $ rockset api:apikeys:listApiKeysAdmin [USER]

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/apikeys/listApiKeysAdmin.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/apikeys/listApiKeysAdmin.ts)_

## `rockset api:collections:createCollection [WORKSPACE] [BODY]`

Create Collection

```
USAGE
  $ rockset api:collections:createCollection [WORKSPACE] [BODY]

ARGUMENTS
  WORKSPACE  name of the workspace
  BODY       JSON object

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/collections/createCollection.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/collections/createCollection.ts)_

## `rockset api:collections:deleteCollection [WORKSPACE] [COLLECTION]`

Delete Collection

```
USAGE
  $ rockset api:collections:deleteCollection [WORKSPACE] [COLLECTION]

ARGUMENTS
  WORKSPACE   name of the workspace
  COLLECTION  name of the collection

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/collections/deleteCollection.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/collections/deleteCollection.ts)_

## `rockset api:collections:getCollection [WORKSPACE] [COLLECTION]`

Get Collection

```
USAGE
  $ rockset api:collections:getCollection [WORKSPACE] [COLLECTION]

ARGUMENTS
  WORKSPACE   name of the workspace
  COLLECTION  name of the collection

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/collections/getCollection.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/collections/getCollection.ts)_

## `rockset api:collections:listCollections`

List Collections

```
USAGE
  $ rockset api:collections:listCollections

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/collections/listCollections.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/collections/listCollections.ts)_

## `rockset api:collections:listQueryLambdasInCollection [WORKSPACE] [COLLECTION]`

Get Query Lambdas

```
USAGE
  $ rockset api:collections:listQueryLambdasInCollection [WORKSPACE] [COLLECTION]

ARGUMENTS
  WORKSPACE   name of the workspace
  COLLECTION  name of the collection

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/collections/listQueryLambdasInCollection.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/collections/listQueryLambdasInCollection.ts)_

## `rockset api:collections:workspaceCollections [WORKSPACE]`

List Collections for Workspace

```
USAGE
  $ rockset api:collections:workspaceCollections [WORKSPACE]

ARGUMENTS
  WORKSPACE  name of the workspace

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/collections/workspaceCollections.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/collections/workspaceCollections.ts)_

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
  -f, --file=file                The config file to execute this command from. Format must be [json|yaml]. Keys are
                                 translated into arguments of the same name. If no BODY argument is specified, the whole
                                 object, minus keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/documents/addDocuments.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/documents/addDocuments.ts)_

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
  -f, --file=file                The config file to execute this command from. Format must be [json|yaml]. Keys are
                                 translated into arguments of the same name. If no BODY argument is specified, the whole
                                 object, minus keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/documents/deleteDocuments.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/documents/deleteDocuments.ts)_

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
  -f, --file=file                The config file to execute this command from. Format must be [json|yaml]. Keys are
                                 translated into arguments of the same name. If no BODY argument is specified, the whole
                                 object, minus keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/documents/patchDocuments.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/documents/patchDocuments.ts)_

## `rockset api:integrations:createIntegration [BODY]`

Create Integration

```
USAGE
  $ rockset api:integrations:createIntegration [BODY]

ARGUMENTS
  BODY  integration credentials

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/integrations/createIntegration.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/integrations/createIntegration.ts)_

## `rockset api:integrations:deleteIntegration [INTEGRATION]`

Delete Integration

```
USAGE
  $ rockset api:integrations:deleteIntegration [INTEGRATION]

ARGUMENTS
  INTEGRATION  name of the integration

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/integrations/deleteIntegration.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/integrations/deleteIntegration.ts)_

## `rockset api:integrations:getIntegration [INTEGRATION]`

Get Integration

```
USAGE
  $ rockset api:integrations:getIntegration [INTEGRATION]

ARGUMENTS
  INTEGRATION  name of the integration

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/integrations/getIntegration.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/integrations/getIntegration.ts)_

## `rockset api:integrations:listIntegrations`

List Integrations

```
USAGE
  $ rockset api:integrations:listIntegrations

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/integrations/listIntegrations.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/integrations/listIntegrations.ts)_

## `rockset api:orgs:getOrganization`

Get Organization

```
USAGE
  $ rockset api:orgs:getOrganization

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/orgs/getOrganization.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/orgs/getOrganization.ts)_

## `rockset api:queries:query [BODY]`

Query

```
USAGE
  $ rockset api:queries:query [BODY]

ARGUMENTS
  BODY  JSON object

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be [json|yaml]. Keys are
                                 translated into arguments of the same name. If no BODY argument is specified, the whole
                                 object, minus keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/queries/query.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/queries/query.ts)_

## `rockset api:queryLambdas:createQueryLambda [WORKSPACE] [BODY]`

Create Query Lambda

```
USAGE
  $ rockset api:queryLambdas:createQueryLambda [WORKSPACE] [BODY]

ARGUMENTS
  WORKSPACE  name of the workspace
  BODY       JSON object

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be [json|yaml]. Keys are
                                 translated into arguments of the same name. If no BODY argument is specified, the whole
                                 object, minus keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/queryLambdas/createQueryLambda.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/queryLambdas/createQueryLambda.ts)_

## `rockset api:queryLambdas:createQueryLambdaTag [WORKSPACE] [QUERYLAMBDA] [BODY]`

Create Query Lambda Tag

```
USAGE
  $ rockset api:queryLambdas:createQueryLambdaTag [WORKSPACE] [QUERYLAMBDA] [BODY]

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda
  BODY         JSON object

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be [json|yaml]. Keys are
                                 translated into arguments of the same name. If no BODY argument is specified, the whole
                                 object, minus keys used as other arguments, will be passed in as the BODY.

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
  Create Query Lambda Tag

  Create a tag for a specific Query Lambda version, or update if it exists

  Endpoint: POST: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags

  Endpoint Documentation: https://docs.rockset.com/rest-api#createquerylambdatag

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queryLambdas/createQueryLambdaTag.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/queryLambdas/createQueryLambdaTag.ts)_

## `rockset api:queryLambdas:deleteQueryLambda [WORKSPACE] [QUERYLAMBDA]`

Delete Query Lambda

```
USAGE
  $ rockset api:queryLambdas:deleteQueryLambda [WORKSPACE] [QUERYLAMBDA]

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be [json|yaml]. Keys are
                                 translated into arguments of the same name. If no BODY argument is specified, the whole
                                 object, minus keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/queryLambdas/deleteQueryLambda.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/queryLambdas/deleteQueryLambda.ts)_

## `rockset api:queryLambdas:deleteQueryLambdaTag [WORKSPACE] [QUERYLAMBDA] [TAG]`

Delete Query Lambda Tag Version

```
USAGE
  $ rockset api:queryLambdas:deleteQueryLambdaTag [WORKSPACE] [QUERYLAMBDA] [TAG]

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda
  TAG          name of the tag

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be [json|yaml]. Keys are
                                 translated into arguments of the same name. If no BODY argument is specified, the whole
                                 object, minus keys used as other arguments, will be passed in as the BODY.

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
  Delete Query Lambda Tag Version

  Delete a tag for a specific Query Lambda

  Endpoint: DELETE: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags/{tag}

  Endpoint Documentation: https://docs.rockset.com/rest-api#deletequerylambdatag

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queryLambdas/deleteQueryLambdaTag.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/queryLambdas/deleteQueryLambdaTag.ts)_

## `rockset api:queryLambdas:deleteQueryLambdaVersion [WORKSPACE] [QUERYLAMBDA] [VERSION]`

Delete Query Lambda Version

```
USAGE
  $ rockset api:queryLambdas:deleteQueryLambdaVersion [WORKSPACE] [QUERYLAMBDA] [VERSION]

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda
  VERSION      version

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be [json|yaml]. Keys are
                                 translated into arguments of the same name. If no BODY argument is specified, the whole
                                 object, minus keys used as other arguments, will be passed in as the BODY.

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
  Delete Query Lambda Version

  Delete a Query Lambda version.

  Endpoint: DELETE: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/version/{version}

  Endpoint Documentation: https://docs.rockset.com/rest-api#deletequerylambdaversion

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queryLambdas/deleteQueryLambdaVersion.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/queryLambdas/deleteQueryLambdaVersion.ts)_

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
  -f, --file=file                The config file to execute this command from. Format must be [json|yaml]. Keys are
                                 translated into arguments of the same name. If no BODY argument is specified, the whole
                                 object, minus keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/queryLambdas/executeQueryLambda.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/queryLambdas/executeQueryLambda.ts)_

## `rockset api:queryLambdas:executeQueryLambdaByTag [WORKSPACE] [QUERYLAMBDA] [TAG] [BODY]`

Run Query Lambda By Tag

```
USAGE
  $ rockset api:queryLambdas:executeQueryLambdaByTag [WORKSPACE] [QUERYLAMBDA] [TAG] [BODY]

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda
  TAG          tag
  BODY         JSON object

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be [json|yaml]. Keys are
                                 translated into arguments of the same name. If no BODY argument is specified, the whole
                                 object, minus keys used as other arguments, will be passed in as the BODY.

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
  Run Query Lambda By Tag

  Run the Query Lambda version associated with a given tag.

  Endpoint: POST: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags/{tag}

  Endpoint Documentation: https://docs.rockset.com/rest-api#executequerylambdabytag

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queryLambdas/executeQueryLambdaByTag.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/queryLambdas/executeQueryLambdaByTag.ts)_

## `rockset api:queryLambdas:getQueryLambdaTagVersion [WORKSPACE] [QUERYLAMBDA] [TAG]`

Get Query Lambda Tag

```
USAGE
  $ rockset api:queryLambdas:getQueryLambdaTagVersion [WORKSPACE] [QUERYLAMBDA] [TAG]

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda
  TAG          name of the tag

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be [json|yaml]. Keys are
                                 translated into arguments of the same name. If no BODY argument is specified, the whole
                                 object, minus keys used as other arguments, will be passed in as the BODY.

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
  Get Query Lambda Tag

  Get the specific Query Lambda version associated with a given tag

  Endpoint: GET: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags/{tag}

  Endpoint Documentation: https://docs.rockset.com/rest-api#getquerylambdatagversion

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queryLambdas/getQueryLambdaTagVersion.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/queryLambdas/getQueryLambdaTagVersion.ts)_

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
  -f, --file=file                The config file to execute this command from. Format must be [json|yaml]. Keys are
                                 translated into arguments of the same name. If no BODY argument is specified, the whole
                                 object, minus keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/queryLambdas/getQueryLambdaVersion.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/queryLambdas/getQueryLambdaVersion.ts)_

## `rockset api:queryLambdas:listAllQueryLambdas`

List Query Lambdas

```
USAGE
  $ rockset api:queryLambdas:listAllQueryLambdas

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be [json|yaml]. Keys are
                                 translated into arguments of the same name. If no BODY argument is specified, the whole
                                 object, minus keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/queryLambdas/listAllQueryLambdas.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/queryLambdas/listAllQueryLambdas.ts)_

## `rockset api:queryLambdas:listOrganizationTags`

List Query Lambda Tags

```
USAGE
  $ rockset api:queryLambdas:listOrganizationTags

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be [json|yaml]. Keys are
                                 translated into arguments of the same name. If no BODY argument is specified, the whole
                                 object, minus keys used as other arguments, will be passed in as the BODY.

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
  List Query Lambda Tags

  List all tags in an organization

  Endpoint: GET: /v1/orgs/self/lambdas/tags

  Endpoint Documentation: https://docs.rockset.com/rest-api#listorganizationtags

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queryLambdas/listOrganizationTags.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/queryLambdas/listOrganizationTags.ts)_

## `rockset api:queryLambdas:listQueryLambdaTagVersions [TAG]`

List Query Lambda Tag Versions

```
USAGE
  $ rockset api:queryLambdas:listQueryLambdaTagVersions [TAG]

ARGUMENTS
  TAG  name of the tag

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be [json|yaml]. Keys are
                                 translated into arguments of the same name. If no BODY argument is specified, the whole
                                 object, minus keys used as other arguments, will be passed in as the BODY.

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
  List Query Lambda Tag Versions

  List all Query Lambda versions associated with a tag

  Endpoint: GET: /v1/orgs/self/lambdas/tags/{tag}

  Endpoint Documentation: https://docs.rockset.com/rest-api#listquerylambdatagversions

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queryLambdas/listQueryLambdaTagVersions.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/queryLambdas/listQueryLambdaTagVersions.ts)_

## `rockset api:queryLambdas:listQueryLambdaTags [WORKSPACE] [QUERYLAMBDA]`

List Query Lambda Tags

```
USAGE
  $ rockset api:queryLambdas:listQueryLambdaTags [WORKSPACE] [QUERYLAMBDA]

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be [json|yaml]. Keys are
                                 translated into arguments of the same name. If no BODY argument is specified, the whole
                                 object, minus keys used as other arguments, will be passed in as the BODY.

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
  List Query Lambda Tags

  List all tags associated with a Query Lambda

  Endpoint: GET: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags

  Endpoint Documentation: https://docs.rockset.com/rest-api#listquerylambdatags

  This command is a simple wrapper around the above endpoint. Please view further documentation at the url above.
```

_See code: [src/commands/api/queryLambdas/listQueryLambdaTags.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/queryLambdas/listQueryLambdaTags.ts)_

## `rockset api:queryLambdas:listQueryLambdaVersions [WORKSPACE] [QUERYLAMBDA]`

List Query Lambda Versions

```
USAGE
  $ rockset api:queryLambdas:listQueryLambdaVersions [WORKSPACE] [QUERYLAMBDA]

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be [json|yaml]. Keys are
                                 translated into arguments of the same name. If no BODY argument is specified, the whole
                                 object, minus keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/queryLambdas/listQueryLambdaVersions.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/queryLambdas/listQueryLambdaVersions.ts)_

## `rockset api:queryLambdas:listQueryLambdasInWorkspace [WORKSPACE]`

List Query Lambdas

```
USAGE
  $ rockset api:queryLambdas:listQueryLambdasInWorkspace [WORKSPACE]

ARGUMENTS
  WORKSPACE  name of the workspace

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be [json|yaml]. Keys are
                                 translated into arguments of the same name. If no BODY argument is specified, the whole
                                 object, minus keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/queryLambdas/listQueryLambdasInWorkspace.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/queryLambdas/listQueryLambdasInWorkspace.ts)_

## `rockset api:queryLambdas:updateQueryLambda [WORKSPACE] [QUERYLAMBDA] [BODY] [CREATE]`

Update Query Lambda

```
USAGE
  $ rockset api:queryLambdas:updateQueryLambda [WORKSPACE] [QUERYLAMBDA] [BODY] [CREATE]

ARGUMENTS
  WORKSPACE    name of the workspace
  QUERYLAMBDA  name of the Query Lambda
  BODY         JSON object
  CREATE

OPTIONS
  -f, --file=file                The config file to execute this command from. Format must be [json|yaml]. Keys are
                                 translated into arguments of the same name. If no BODY argument is specified, the whole
                                 object, minus keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/queryLambdas/updateQueryLambda.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/queryLambdas/updateQueryLambda.ts)_

## `rockset api:users:createUser [BODY]`

Create User

```
USAGE
  $ rockset api:users:createUser [BODY]

ARGUMENTS
  BODY  JSON object

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/users/createUser.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/users/createUser.ts)_

## `rockset api:users:deleteUser [USER]`

Delete User

```
USAGE
  $ rockset api:users:deleteUser [USER]

ARGUMENTS
  USER  user email

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/users/deleteUser.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/users/deleteUser.ts)_

## `rockset api:users:getCurrentUser`

Get Current User

```
USAGE
  $ rockset api:users:getCurrentUser

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/users/getCurrentUser.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/users/getCurrentUser.ts)_

## `rockset api:users:listUsers`

List Users

```
USAGE
  $ rockset api:users:listUsers

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/users/listUsers.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/users/listUsers.ts)_

## `rockset api:workspaces:childWorkspaces [WORKSPACE]`

List Workspaces

```
USAGE
  $ rockset api:workspaces:childWorkspaces [WORKSPACE]

ARGUMENTS
  WORKSPACE  name of the workspace

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/workspaces/childWorkspaces.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/workspaces/childWorkspaces.ts)_

## `rockset api:workspaces:createWorkspace [BODY]`

Create Workspace

```
USAGE
  $ rockset api:workspaces:createWorkspace [BODY]

ARGUMENTS
  BODY  workspace details

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/workspaces/createWorkspace.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/workspaces/createWorkspace.ts)_

## `rockset api:workspaces:deleteWorkspace [WORKSPACE]`

Delete Workspace

```
USAGE
  $ rockset api:workspaces:deleteWorkspace [WORKSPACE]

ARGUMENTS
  WORKSPACE  name of the workspace

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/workspaces/deleteWorkspace.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/workspaces/deleteWorkspace.ts)_

## `rockset api:workspaces:getWorkspace [WORKSPACE]`

Get Workspace

```
USAGE
  $ rockset api:workspaces:getWorkspace [WORKSPACE]

ARGUMENTS
  WORKSPACE  name of the workspace

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/workspaces/getWorkspace.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/workspaces/getWorkspace.ts)_

## `rockset api:workspaces:listWorkspaces`

List Workspaces

```
USAGE
  $ rockset api:workspaces:listWorkspaces

OPTIONS
  -f, --file=file         The config file to execute this command from. Format must be [json|yaml]. Keys are translated
                          into arguments of the same name. If no BODY argument is specified, the whole object, minus
                          keys used as other arguments, will be passed in as the BODY.

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

_See code: [src/commands/api/workspaces/listWorkspaces.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/api/workspaces/listWorkspaces.ts)_

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

_See code: [src/commands/auth/add.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/auth/add.ts)_

## `rockset auth:list`

List all of the available profiles.

```
USAGE
  $ rockset auth:list

OPTIONS
  -h, --help      show CLI help
  -s, --showKeys  Uncensor all API Keys

DESCRIPTION
  List all of the available profiles.
```

_See code: [src/commands/auth/list.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/auth/list.ts)_

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

_See code: [src/commands/auth/use.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/auth/use.ts)_

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

## `rockset local:deploy`

Deploy Query Lambda entities to Rockset from your local project. 

```
USAGE
  $ rockset local:deploy

OPTIONS
  -h, --help                                                                    show CLI help

  -l, --lambda=lambda                                                           The qualified name of the lambda to
                                                                                deploy

  -t, --tag= Specify a tag name to be applied to these Query Lambda versions.

  -w, --workspace=workspace                                                     The qualified name of the workspace to
                                                                                deploy

  --createMissingWorkspaces                                                     If a workspace does not exist in the
                                                                                remote, create it

  --dryRun                                                                      If this flag is set, the tool will print
                                                                                out the names of the query lambdas it
                                                                                would deploy and return

DESCRIPTION
  Deploy Query Lambda entities to Rockset from your local project. 

  If a workspace parameter is passed, only that workspace will be deployed.
  If a lambda parameter is passed, only that lambda will be deployed.
  These two parameters are mutually exclusive, only one may be passed.
```

_See code: [src/commands/local/deploy.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/local/deploy.ts)_

## `rockset local:download`

Download Query Lambda entities from Rockset to your local project.

```
USAGE
  $ rockset local:download

OPTIONS
  -h, --help                                                                            show CLI help
  -t, --tag=
          Specify a value to download all Query Lambda versions tagged with this tag. 
          Query Lambdas that do not have a version with this tag name will be skipped.

DESCRIPTION
  Download Query Lambda entities from Rockset to your local project.
```

_See code: [src/commands/local/download.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/local/download.ts)_

## `rockset local:init`

Initialize your project.

```
USAGE
  $ rockset local:init

OPTIONS
  -h, --help  show CLI help

DESCRIPTION
  Initialize your project.

  This command initializes your project with a rockconfig.json file.
```

_See code: [src/commands/local/init.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/local/init.ts)_

## `rockset local:queryLambda:add NAME`

Add an empty entity with the specified name to the project. The path for the entity is the same

```
USAGE
  $ rockset local:queryLambda:add NAME

ARGUMENTS
  NAME  The fully qualified name of the entity you wish to resolve

OPTIONS
  -e, --entity=lambda  [default: lambda] the type of entity you wish to add
  -h, --help           show CLI help

DESCRIPTION
  Add an empty entity with the specified name to the project. The path for the entity is the same
     as would be created with 'rockset local:resolve'
```

_See code: [src/commands/local/queryLambda/add.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/local/queryLambda/add.ts)_

## `rockset local:queryLambda:delete`

Delete all query lambdas from the project.

```
USAGE
  $ rockset local:queryLambda:delete

OPTIONS
  -h, --help                 show CLI help
  -l, --lambda=lambda        The qualified name of the lambda to delete
  -w, --workspace=workspace  The qualified name of the workspace to delete
  -y, --yes                  Bypass the safety checks, and automatically engage in dangerous actions.

DESCRIPTION
  Delete all query lambdas from the project.

  If a workspace parameter is passed, only that workspace will be deleted.
  If a lambda parameter is passed, only that lambda will be deleted.
  These two parameters are mutually exclusive, only one may be passed.
```

_See code: [src/commands/local/queryLambda/delete.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/local/queryLambda/delete.ts)_

## `rockset local:queryLambda:execute NAME`

Execute a specific version of a Query Lambda in the current project.

```
USAGE
  $ rockset local:queryLambda:execute NAME

ARGUMENTS
  NAME  The fully qualified name of the Query Lambda you wish to execute

OPTIONS
  -h, --help                   show CLI help
  -p, --parameters=parameters  A JSON string of parameters to execute the query with.

DESCRIPTION
  Execute a specific version of a Query Lambda in the current project.
  
     You must specify the fully qualified name of the Query Lambda: eg. 'commons.foo'.
```

_See code: [src/commands/local/queryLambda/execute.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/local/queryLambda/execute.ts)_

## `rockset local:queryLambda:list`

List all of the entities in the current project. Note: this does not list entities on remote. For that, please use

```
USAGE
  $ rockset local:queryLambda:list

OPTIONS
  -e, --entity=lambda  [default: lambda] the type of entity you wish to list
  -h, --help           show CLI help

DESCRIPTION
  List all of the entities in the current project. Note: this does not list entities on remote. For that, please use
     the API endpoints present in 'rockset api:...'
```

_See code: [src/commands/local/queryLambda/list.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/local/queryLambda/list.ts)_

## `rockset local:resolve NAME`

Resolve the absolute path of an entity in the current project.

```
USAGE
  $ rockset local:resolve NAME

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

_See code: [src/commands/local/resolve.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/local/resolve.ts)_

## `rockset local:serve`

Start a development server that allows you to execute Query Lambdas from your local project from a development UI.

```
USAGE
  $ rockset local:serve

OPTIONS
  -h, --help       show CLI help
  -p, --port=port  [default: 3001] The port to start the server at

DESCRIPTION
  Start a development server that allows you to execute Query Lambdas from your local project from a development UI.
```

_See code: [src/commands/local/serve.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/local/serve.ts)_

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

_See code: [src/commands/sql.ts](https://github.com/rockset/rockset-js/blob/v0.4.0/src/commands/sql.ts)_

## `rockset update [CHANNEL]`

update the rockset CLI

```
USAGE
  $ rockset update [CHANNEL]
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v1.3.10/src/commands/update.ts)_
<!-- commandsstop -->
