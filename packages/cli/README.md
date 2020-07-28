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
* [Full Command Reference](#full-command-reference)
* [Telemetry](#telemetry)

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

# Full Command Reference

* [`rockset api`](reference/api.md) - execute any of Rockset's API endpoints
* [`rockset auth`](reference/auth.md) - manage your authentication profiles
* [`rockset local`](reference/local.md) - manage your local Query Lambdas
* [`rockset sql`](reference/sql.md) - execute raw SQL expressions

# Telemetry

The Rockset CLI includes a telemetry feature that collects some usage data. This feature is enabled by default. We never log any sensitive data, query text, or query result data.

To opt out of telemetry, set the ROCKSET_CLI_TELEMETRY_OPTOUT environment variable to 1 or true.
