# Rockset Developer UI

The Official Home of the Rockset Developer UI.

![Build|Lint|Test](https://github.com/rockset/rockset-js/workflows/Build%7CLint%7CTest/badge.svg)

<img src="assets/dev-ui-usage.gif" alt="Gif failed to load" width="700" />

## Getting Started

The Rockset Dev UI is bundled with the Rockset CLI. Please first install and setup up the [Rockset CLI](../cli). It is intended to be used in a local Rockset project. Please see the CLI documentation for more information about downloading Query Lambdas and setting up a local project.

```bash
# Initialize your local project
$ rockset local:init

# Download your Query Lambdas
$ rockset local:add commons.myLambda

# Serve the Rockset Developer UI
$ rockset local:serve -p PORT
```

This will launch a development server on `localhost:PORT`. Whenever a request to execute a Query Lambda is sent to the server, it will grab the associated Query Lambda text from the file system and execute it with any parameters.

The Projects Dev UI is tested and fully supported on the latest version of Google Chrome. You may experience minor bugs on other browsers.

## Usage

Once you have started the development server, navigate to `localhost:PORT` in your browser.

You should see a listing of all of the different Query Lambdas in your local project. Select one of the Query Lambdas to start testing it.

### Executing a Lambda

When you hit the Run button, the following happens:

1. The UI sends a request to the development server to run the associated query.
1. The development server loads the SQL text and Default Parameters for the Query Lambda from your local file system.
1. The development server sends a request to Rockset's remote API Server, using the active credentials configured for the CLI tool. 
1. The development server passes the response to the UI.

This means that all queries will execute the version in the local file system. Furthermore, the queries will be executed in the account associated with the CLI tool's current active profile. 

### Using Parameters

Rockset SQL supports adding query parameters to parameterize a query. To add parameters in the Rockset Developer UI, click into the Parameters Tab and then click the "Add Parameters" button. You can also add default values for your parameters in the Lambda Definition File. Please see the [Rockset CLI Documentation](../cli) for more information about adding default parameters.
