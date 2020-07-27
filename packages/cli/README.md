@rockset/cli
============

Official Rockset CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@rockset/cli.svg)](https://npmjs.org/package/@rockset/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@rockset/cli.svg)](https://npmjs.org/package/@rockset/cli)
[![License](https://img.shields.io/npm/l/@rockset/cli.svg)](https://github.com/rockset/rockset-js/blob/master/package.json)
![Build|Lint|Test](https://github.com/rockset/rockset-js/workflows/Build%7CLint%7CTest/badge.svg)

* [Download & Installation Instructions](#download--installation-instructions)
* [Getting Started](#getting-started)
* [Usage Overview](#usage-overview)
* [Query Lambda Hello World Example](#query-lambda-hello-world-example)
* [API Usage Details](#api-usage-details)
    * [Organization](#organization)
    * [Input Arguments Examples](#input-arguments-examples)
    * [Output Format](#output-format)
    * [Load Testing](#load-testing)
    * [More Examples](#more-examples)
* [Local Query Lambda Development Details](#local-query-lambda-development-details)
    * [The Query Lambda Definition File](#the-query-lambda-definition-file)
    * [Editing your Query Lambda SQL](#editing-your-query-lambda-sql)
    * [Executing your local project Query Lambdas](#executing-your-local-project-query-lambdas)
    * [Deploying your Query Lambdas](#deploying-your-query-lambdas)
    * [Integration with Git Version Control and CI/CD](#integration-with-git-version-control-and-cicd)
* [Telemetry](#telemetry)
* [All Commands](#all-commands)

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
To verify that your installation was completed successfully, run `rockset --version` in your command line.
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

After an update, run `rockset autocomplete -r` to rebuild the autocomplete cache. 

### Installing Autocomplete

The Rockset CLI Autocomplete feature allows you to preview and complete commands using the tab key. It is currently compatible with bash and zsh.

To install this feature, run `rockset autocomplete` in your command line. You will receive different instructions depending on which shell you are using.
```
$ rockset update
$ rockset autocomplete
```
**Note: If you are installing autocomplete on macOS and using it from a login shell, you may need to run the following command:**
```bash
$ echo 'source ~/.bashrc' >> ~/.bash_profile
```

You may need to restart your command line after all steps to enable the autocomplete feature after installation.


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
$ rockset sql "SELECT 'hello, world!'"

#. List all Query Lambdas in "commons" workspace
$ rockset api:queryLambdas:listQueryLambdasInWorkspace commons

#. Initialize a local project in the current directory
$ rockset local:init

#. Download your Query Lambdas
$ rockset local:download

#. Serve the Rockset Developer UI to test your local Query Lambdas
$ rockset local:serve

#. Deploy your local Query Lambdas to Rockset
$ rockset local:deploy

#. Update to the latest CLI version
$ rockset update

```

# Query Lambda Hello World Example

If you want to get live Query Lambdas working as quickly as possible, this Hello World example will get you there. Please start in an empty directory. This guide assumes you have set up authentication successfully above.

```bash

#. Initialize your local rockset project, skipping confirmation messages
$ rockset local:init -y

#. Add a Query Lambda to your project
$ rockset local:queryLambda:add commons.helloWorld

#. View the SQL file associated with your query lambda
rockset local:resolve --sql commons.helloWorld

#. We recommend editing the SQL file using our VSCode plugin for the best support
#. Alternatively, you can edit in your favorite editor, or write text from the command line as below 
#. Write text to your Query Lambda
$ echo "SELECT 'hello, world' \"Hello World\"" > `rockset local:resolve --sql commons.helloWorld`

#. Execute your Query Lambda, and select the result
#. Using the local development ui
$ rockset local:serve

#. Or execute from the command line
$ rockset local:queryLambda:execute commons.helloWorld | jq '.results'
[INFO]: About to execute commons.helloWorld from local project...
[INFO]: SQL: SELECT 'hello, world' "Hello World"

[INFO]: Parameters: []
[INFO]: Successfully executed query.
[
  {
    "Hello World": "hello, world"
  }
]

#. Deploy your Query Lambda, and tag it with the dev tag
$ rockset local:deploy -l commons.helloWorld -t dev
Successfully updated commons.helloWorld — version e71f9de16aa66e3c
Successfully tagged commons.helloWorld version e71f9de16aa66e3c with tag "dev"

#. Your Query Lambda is now live!
#. Execute your Query Lambda from the API
$ rockset api:queryLambdas:executeQueryLambdaByTag commons helloWorld dev
[INFO]: POST: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags/{tag}
[INFO]: Arguments:
[INFO]: {
  "workspace": "commons",
  "queryLambda": "helloWorld",
  "tag": "dev"
}
Hello World
hello, world

#. Alternatively, execute your Query Lambda with cURL
$ curl --request POST \
  --url https://api.rs2.usw2.rockset.com/v1/orgs/self/ws/commons/lambdas/helloWorld/tags/dev \
  -H 'Authorization: ApiKey [your apikey]' \
  -H 'Content-Type: application/json' | jq '.results'
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   202  100   202    0     0   1004      0 --:--:-- --:--:-- --:--:--  1004
[
  {
    "Hello World": "hello, world"
  }
]
```

Congratulations, you have finished setting up your Hello World Query Lambda! For a more detailed discussion of how to develop more complex Query Lambdas with Parameters, please see the [Local Query Lambda Development Details](#local-query-lambda-development-details).

# API Usage Details

## Organization

The API tool is contained in `rockset api`. This tool is designed to very closely match the layout of our [REST API endpoints](https://docs.rockset.com/rest-api). The remainder of this section provides examples for using these commands.

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
#. Commons.foo is a Query Lambda with text 'SELECT :foo'

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

#. Run a load test against Query Lambda commons.foo, with text 'SELECT :foo'
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

# Local Query Lambda Development Details

 The local Query Lambda tool under `rockset local` is designed to help you easily manage your Query Lambdas and integrate well with versioning tools like Git.

To get started, first set up your local project by creating a `rockset.config.json` file in your project root. We highly recommend that this directory be under version control. All of the files handled by the tool can be safely checked in.

```bash
$ rockset local:init
✔ Enter the root path for your Query Lambdas … src
Created root config at rockset.config.json 
$ cat rockset.config.json
{
  "source_root": "src"
}

#. Download your existing Query Lambdas from Rockset's API Server
#. This will download the latest versions of your Query Lambdas
#. You can also download lambdas by tag using the -t flag
$ rockset local:download
✔ WARNING: This will overwrite all Query Lambda objects downloaded to the current project, and can result in loss of work. Are you sure? … yes
Downloaded lambda commons.QLBar
Downloaded lambda commons.QLFoo
Downloaded lambda frontend.QLFrontend

#. Visualize the project structure
$ tree
.
├── rockset.config.json
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

As you can see, each Query Lambda is placed in a directory with the same name as its workspace. Each Query Lambda has two files associated with it.

* `<workspace/path>/QL.lambda.json` This is the Lambda Definition file. It includes information such as the description and the default parameters of the Query Lambda.
    * A Lambda Definition file must use extension `.lambda.json`. The name of the associated QL must be the name of the file
    * The parent directory of the Lambda Definition file should be its workspace 
* `<workspace/path>/__sql/QL.sql` This file contains the SQL associated with the Query Lambda.

You can also use nested workspaces. If we continue the example above:

```bash
$ rockset local:queryLambda:add prod.frontend.QLFrontend
$ tree
.
├── rockset.config.json
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
* `default_parameters` which specifies the default parameters that this Query Lambda will use after it has been deployed
* `description` The description that will show for this Query Lambda after it has been deployed

Let's update our Query Lambda definition to the following.

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
  "description": "My foo Query Lambda"
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

For the best experience, we recommend opening your project root (the directory containing `rockset.config.json`) as the root directory in VSCode. 

```bash
$ rockset local:resolve --sql prod.frontend.QLFrontend
/Users/tchordia/rockset-js/packages/cli/testLambdas/src/prod/frontend/__sql/QLFrontend.sql

#. open in your preferred editor
$ $EDITOR `rockset local:resolve --sql prod.frontend.QLFrontend`
```

## Executing your local project Query Lambdas

**Note: this section covers executing the local version of your Query Lambda. This will not help you execute a Query Lambda on Rockset's API Server. For that, please use the API tool described above**

The recommended way to execute your local Query Lambdas is with the [Rockset Developer UI](../dev-server). 

```bash
#. Open a UI to execute local Query Lambdas
$ rockset local:serve
```

This will open a UI for you to add parameters and inspect the results of your query. It will also set up a mock of Rockset's API server that can execute Query Lambdas.
Please see the [Rockset Developer UI Docs](../dev-server) for more information.

You can also execute your Query Lambdas from the CLI tool. The CLI tool will do the following to execute your Query Lambda.

* Resolve SQL text and default_parameters from the qualified name of the Query Lambda
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
#. This shows all Query Lambdas that will be deployed
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
 #. In practice, you should always tag your Query Lambdas, so that your application can execute them by tag
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

The Rockset CLI includes a telemetry feature that collects some usage data. This feature is enabled by default. We never log any sensitive data, query text, or query result data.

To opt out of telemetry, set the ROCKSET_CLI_TELEMETRY_OPTOUT environment variable to 1 or true.







# All Commands
<!-- commands -->
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
* [`rockset auth:add NAME APIKEY [APISERVER]`](#rockset-authadd-name-apikey-apiserver)
* [`rockset auth:delete NAME`](#rockset-authdelete-name)
* [`rockset auth:list`](#rockset-authlist)
* [`rockset auth:use NAME`](#rockset-authuse-name)
* [`rockset autocomplete [SHELL]`](#rockset-autocomplete-shell)
* [`rockset help [COMMAND]`](#rockset-help-command)
* [`rockset local:deploy`](#rockset-localdeploy)
* [`rockset local:download`](#rockset-localdownload)
* [`rockset local:init`](#rockset-localinit)
* [`rockset local:queryLambda:add NAME`](#rockset-localquerylambdaadd-name)
* [`rockset local:queryLambda:delete NAME`](#rockset-localquerylambdadelete-name)
* [`rockset local:queryLambda:execute NAME`](#rockset-localquerylambdaexecute-name)
* [`rockset local:queryLambda:list`](#rockset-localquerylambdalist)
* [`rockset local:resolve NAME`](#rockset-localresolve-name)
* [`rockset local:serve`](#rockset-localserve)
* [`rockset sql [SQL]`](#rockset-sql-sql)
* [`rockset update [CHANNEL]`](#rockset-update-channel)

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

_See code: [src/commands/api/apikeys/createApiKey.ts](./src/commands/api/apikeys/createApiKey.ts)_

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

_See code: [src/commands/api/apikeys/createApiKeyAdmin.ts](./src/commands/api/apikeys/createApiKeyAdmin.ts)_

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

_See code: [src/commands/api/apikeys/deleteApiKey.ts](./src/commands/api/apikeys/deleteApiKey.ts)_

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

_See code: [src/commands/api/apikeys/deleteApiKeyAdmin.ts](./src/commands/api/apikeys/deleteApiKeyAdmin.ts)_

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

_See code: [src/commands/api/apikeys/listApiKeys.ts](./src/commands/api/apikeys/listApiKeys.ts)_

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

_See code: [src/commands/api/apikeys/listApiKeysAdmin.ts](./src/commands/api/apikeys/listApiKeysAdmin.ts)_

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

_See code: [src/commands/api/collections/createCollection.ts](./src/commands/api/collections/createCollection.ts)_

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

_See code: [src/commands/api/collections/deleteCollection.ts](./src/commands/api/collections/deleteCollection.ts)_

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

_See code: [src/commands/api/collections/getCollection.ts](./src/commands/api/collections/getCollection.ts)_

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

_See code: [src/commands/api/collections/listCollections.ts](./src/commands/api/collections/listCollections.ts)_

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

_See code: [src/commands/api/collections/listQueryLambdasInCollection.ts](./src/commands/api/collections/listQueryLambdasInCollection.ts)_

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

_See code: [src/commands/api/collections/workspaceCollections.ts](./src/commands/api/collections/workspaceCollections.ts)_

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

_See code: [src/commands/api/documents/addDocuments.ts](./src/commands/api/documents/addDocuments.ts)_

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

_See code: [src/commands/api/documents/deleteDocuments.ts](./src/commands/api/documents/deleteDocuments.ts)_

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

_See code: [src/commands/api/documents/patchDocuments.ts](./src/commands/api/documents/patchDocuments.ts)_

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

_See code: [src/commands/api/integrations/createIntegration.ts](./src/commands/api/integrations/createIntegration.ts)_

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

_See code: [src/commands/api/integrations/deleteIntegration.ts](./src/commands/api/integrations/deleteIntegration.ts)_

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

_See code: [src/commands/api/integrations/getIntegration.ts](./src/commands/api/integrations/getIntegration.ts)_

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

_See code: [src/commands/api/integrations/listIntegrations.ts](./src/commands/api/integrations/listIntegrations.ts)_

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

_See code: [src/commands/api/orgs/getOrganization.ts](./src/commands/api/orgs/getOrganization.ts)_

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

_See code: [src/commands/api/queries/query.ts](./src/commands/api/queries/query.ts)_

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

_See code: [src/commands/api/queryLambdas/createQueryLambda.ts](./src/commands/api/queryLambdas/createQueryLambda.ts)_

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

_See code: [src/commands/api/queryLambdas/createQueryLambdaTag.ts](./src/commands/api/queryLambdas/createQueryLambdaTag.ts)_

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

_See code: [src/commands/api/queryLambdas/deleteQueryLambda.ts](./src/commands/api/queryLambdas/deleteQueryLambda.ts)_

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

_See code: [src/commands/api/queryLambdas/deleteQueryLambdaTag.ts](./src/commands/api/queryLambdas/deleteQueryLambdaTag.ts)_

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

_See code: [src/commands/api/queryLambdas/deleteQueryLambdaVersion.ts](./src/commands/api/queryLambdas/deleteQueryLambdaVersion.ts)_

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

_See code: [src/commands/api/queryLambdas/executeQueryLambda.ts](./src/commands/api/queryLambdas/executeQueryLambda.ts)_

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

_See code: [src/commands/api/queryLambdas/executeQueryLambdaByTag.ts](./src/commands/api/queryLambdas/executeQueryLambdaByTag.ts)_

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

_See code: [src/commands/api/queryLambdas/getQueryLambdaTagVersion.ts](./src/commands/api/queryLambdas/getQueryLambdaTagVersion.ts)_

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

_See code: [src/commands/api/queryLambdas/getQueryLambdaVersion.ts](./src/commands/api/queryLambdas/getQueryLambdaVersion.ts)_

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

_See code: [src/commands/api/queryLambdas/listAllQueryLambdas.ts](./src/commands/api/queryLambdas/listAllQueryLambdas.ts)_

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

_See code: [src/commands/api/queryLambdas/listOrganizationTags.ts](./src/commands/api/queryLambdas/listOrganizationTags.ts)_

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

_See code: [src/commands/api/queryLambdas/listQueryLambdaTagVersions.ts](./src/commands/api/queryLambdas/listQueryLambdaTagVersions.ts)_

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

_See code: [src/commands/api/queryLambdas/listQueryLambdaTags.ts](./src/commands/api/queryLambdas/listQueryLambdaTags.ts)_

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

_See code: [src/commands/api/queryLambdas/listQueryLambdaVersions.ts](./src/commands/api/queryLambdas/listQueryLambdaVersions.ts)_

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

_See code: [src/commands/api/queryLambdas/listQueryLambdasInWorkspace.ts](./src/commands/api/queryLambdas/listQueryLambdasInWorkspace.ts)_

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

_See code: [src/commands/api/queryLambdas/updateQueryLambda.ts](./src/commands/api/queryLambdas/updateQueryLambda.ts)_

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

_See code: [src/commands/api/users/createUser.ts](./src/commands/api/users/createUser.ts)_

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

_See code: [src/commands/api/users/deleteUser.ts](./src/commands/api/users/deleteUser.ts)_

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

_See code: [src/commands/api/users/getCurrentUser.ts](./src/commands/api/users/getCurrentUser.ts)_

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

_See code: [src/commands/api/users/listUsers.ts](./src/commands/api/users/listUsers.ts)_

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

_See code: [src/commands/api/workspaces/childWorkspaces.ts](./src/commands/api/workspaces/childWorkspaces.ts)_

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

_See code: [src/commands/api/workspaces/createWorkspace.ts](./src/commands/api/workspaces/createWorkspace.ts)_

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

_See code: [src/commands/api/workspaces/deleteWorkspace.ts](./src/commands/api/workspaces/deleteWorkspace.ts)_

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

_See code: [src/commands/api/workspaces/getWorkspace.ts](./src/commands/api/workspaces/getWorkspace.ts)_

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

_See code: [src/commands/api/workspaces/listWorkspaces.ts](./src/commands/api/workspaces/listWorkspaces.ts)_

## `rockset auth:add NAME APIKEY [APISERVER]`

create a new profile with the specified name and apikey.

```
USAGE
  $ rockset auth:add NAME APIKEY [APISERVER]

ARGUMENTS
  NAME       the name of the profile you wish to create
  APIKEY     the apikey for your account
  APISERVER  [default: https://api.rs2.usw2.rockset.com] the url for the Rockset API server to use

OPTIONS
  -a, --[no-]activate  whether to activate the profile after creating it
  -h, --help           show CLI help

DESCRIPTION
  You can find an API Key for your account in the Rockset Console. https://console.rockset.com/apikeys
```

_See code: [src/commands/auth/add.ts](./src/commands/auth/add.ts)_

## `rockset auth:delete NAME`

delete a profile with the specified name

```
USAGE
  $ rockset auth:delete NAME

ARGUMENTS
  NAME  the name of the profile you wish to delete

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/auth/delete.ts](./src/commands/auth/delete.ts)_

## `rockset auth:list`

list all of the available profiles, and show the active profile

```
USAGE
  $ rockset auth:list

OPTIONS
  -h, --help      show CLI help
  -s, --showKeys  uncensor all API Keys
```

_See code: [src/commands/auth/list.ts](./src/commands/auth/list.ts)_

## `rockset auth:use NAME`

use a specific authentication profile

```
USAGE
  $ rockset auth:use NAME

ARGUMENTS
  NAME  The name of the profile you wish to use.

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/auth/use.ts](./src/commands/auth/use.ts)_

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

deploy Query Lambda entities to Rockset

```
USAGE
  $ rockset local:deploy

OPTIONS
  -h, --help                                                                    show CLI help

  -l, --lambda=lambda                                                           the qualified name of the lambda to
                                                                                deploy

  -t, --tag=specify a tag name to be applied to deployed Query Lambda versions

  -w, --workspace=workspace                                                     the qualified name of the workspace to
                                                                                deploy

  --dryRun                                                                      print out the names of the Query Lambdas
                                                                                that would be deployed and return

  --failOnMissingWorkspace                                                      if a workspace does not exist in the
                                                                                remote, the deploy will fail instead of
                                                                                creating one

DESCRIPTION
  If a workspace parameter is passed, only Query Lambdas in that workspace will be deployed.
  If a lambda parameter is passed, only that Query Lambda will be deployed.
```

_See code: [src/commands/local/deploy.ts](./src/commands/local/deploy.ts)_

## `rockset local:download`

download Query Lambda entities from Rockset to your local project

```
USAGE
  $ rockset local:download

OPTIONS
  -h, --help            show CLI help
  -t, --tag=production  only download Query Lambda versions marked with this tag
  -y, --yes             bypass the safety checks, and automatically engage in dangerous actions
```

_See code: [src/commands/local/download.ts](./src/commands/local/download.ts)_

## `rockset local:init`

initialize your project with a [32mrockset.config.json[39m file.

```
USAGE
  $ rockset local:init

OPTIONS
  -h, --help  show CLI help
  -y, --yes
```

_See code: [src/commands/local/init.ts](./src/commands/local/init.ts)_

## `rockset local:queryLambda:add NAME`

add a Query Lambda to the current project

```
USAGE
  $ rockset local:queryLambda:add NAME

ARGUMENTS
  NAME  the fully qualified name of the lambda you wish to add (eg. "{workspace}.{name}")

OPTIONS
  -d, --description=description  set the description for the Query Lambda
  -h, --help                     show CLI help

EXAMPLE
    $ rockset local:queryLambda:add commons.helloWorld -d "my lambda"
  Successfully added Query Lambda commons.helloWorld to path /Users/tchordia/rockset/src/commons/helloWorld.lambda.json
```

_See code: [src/commands/local/queryLambda/add.ts](./src/commands/local/queryLambda/add.ts)_

## `rockset local:queryLambda:delete NAME`

delete a Query Lambda from the current project

```
USAGE
  $ rockset local:queryLambda:delete NAME

ARGUMENTS
  NAME  the fully qualified name of the lambda you wish to delete (eg. "{workspace}.{name}")

OPTIONS
  -h, --help  show CLI help
  -y, --yes   bypass the safety checks, and automatically engage in dangerous actions

EXAMPLE
  $ rockset local:queryLambda:delete commons.foo
  ✔ WARNING: This operation will delete commons.foo, and all associated files in the current project, and can result in 
  a loss of work. Are you sure you would like to proceed? … no
```

_See code: [src/commands/local/queryLambda/delete.ts](./src/commands/local/queryLambda/delete.ts)_

## `rockset local:queryLambda:execute NAME`

execute a Query Lambda in the current project

```
USAGE
  $ rockset local:queryLambda:execute NAME

ARGUMENTS
  NAME  the fully qualified name of the lambda you wish to execute (eg. "{workspace}.{name}")

OPTIONS
  -h, --help                                                         show CLI help

  -p, --parameters=[{"name":"param","value":"foo","type":"string"}]  a JSON string of parameters to execute the query
                                                                     with.

EXAMPLE
  $ rockset local:queryLambda:execute commons.helloWorld
```

_See code: [src/commands/local/queryLambda/execute.ts](./src/commands/local/queryLambda/execute.ts)_

## `rockset local:queryLambda:list`

list all of the Query Lambdas in the current project

```
USAGE
  $ rockset local:queryLambda:list

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/local/queryLambda/list.ts](./src/commands/local/queryLambda/list.ts)_

## `rockset local:resolve NAME`

resolve the absolute path of an entity in the current project

```
USAGE
  $ rockset local:resolve NAME

ARGUMENTS
  NAME  the fully qualified name of the lambda you wish to resolve (eg. "{workspace}.{name}")

OPTIONS
  -e, --entity=lambda|workspace  [default: lambda] the type of entity you wish to resolve
  -h, --help                     show CLI help
  --[no-]exists                  return with an error if file does not exist
  --sql                          return the SQL file path (only for Query Lambdas)

EXAMPLES
  $ rockset local:resolve commons.myLambda
  $ rockset local:resolve commons.myLambda --sql
```

_See code: [src/commands/local/resolve.ts](./src/commands/local/resolve.ts)_

## `rockset local:serve`

start development server and open the Developer UI. Used to configure parameters and execute SQL files in your local project

```
USAGE
  $ rockset local:serve

OPTIONS
  -h, --help       show CLI help
  -p, --port=port  [default: 3001] the port to listen at
```

_See code: [src/commands/local/serve.ts](./src/commands/local/serve.ts)_

## `rockset sql [SQL]`

execute a SQL expression

```
USAGE
  $ rockset sql [SQL]

ARGUMENTS
  SQL  rockset SQL string to execute

OPTIONS
  -h, --help                       show CLI help

  -l, --defaultLimit=defaultLimit  set the default row limit property on the query. This will set a default limit on the
                                   query that can be overrided by a limit in the SQL text.

  --columns=columns                only show provided columns (comma-separated)

  --output=csv|json|yaml           output in a more machine friendly format

EXAMPLES
  rockset sql "Select 'hello world'"
  rockset sql
```

_See code: [src/commands/sql.ts](./src/commands/sql.ts)_

## `rockset update [CHANNEL]`

update the rockset CLI

```
USAGE
  $ rockset update [CHANNEL]
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v1.3.10/src/commands/update.ts)_
<!-- commandsstop -->
