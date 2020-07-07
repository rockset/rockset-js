# Rockset VSCode Extension

## Features

* Syntax highlighting
* Execute Queries
* Error Highlighting
* Autocomplete
* Formatting

![gif failed to load](./vscode-readme.gif)

## Installation

The Rockset VSCode plugin is available to install on the [VSCode Extension Marketplace](https://code.visualstudio.com/docs/editor/extension-gallery).

## Usage

After installation, please first set the following two properties in your VSCode preferences (CMD-,).

* `rockset.apiserver`: The Rockset API server to use with this extension
* `rockset.apikey`: the Rockset apikey to use with this extension

The easiest way to get started with SQL files is to use [Rockset CLI v2](../cli).

```sh

// Authenticate
rockset auth:add <apikey>

// Populate your Query Lambda SQL from Rockset
rockset project:init
rockset project:download

// Open the current directory in VSCode
code .
```

Then simply open one of the SQL files in your project and edit. `CTRL-SHIFT-R` (`CMD-SHIFT-R` on Mac) is the shortkey to execute the current SQL file. This will not include any parameters, and is a little bit limiting.

You can also execute queries with the [Rockset IDE Sidecar](../dev-server) as follows:

```sh
// After following the setup instructions above
rockset project:serve
```

This will open up a UI in which you can easily execute your Query Lambdas.

## Extension Settings

This extension contributes the following settings:

* `rockset.apiserver`: The Rockset API server to use with this extension
* `rockset.apikey`: the Rockset apikey to use with this extension

## Release Notes

Users appreciate release notes as you update your extension.

### 0.1.3

Supports syntax highlighting, executing a query, and formatting


