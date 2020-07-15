## Features

- Syntax highlighting
- Execute Queries
- Error Highlighting
- Autocomplete
- Formatting

![gif failed to load](/packages/rscode/assets/vscode-readme.gif)

## Installation

The Rockset VSCode plugin is available to install on the [VSCode Extension Marketplace](https://code.visualstudio.com/docs/editor/extension-gallery).

## Setup

After installation, please first set the following two properties in your VSCode preferences (CMD-,).

- `rockset.apiserver`: The Rockset API server to use with this extension
- `rockset.apikey`: the Rockset apikey to use with this extension

The recommended way to get started with SQL files is to use [Rockset CLI v2](../cli).

```sh

# Authenticate
$ rockset auth:add default <apikey>

# Populate your Query Lambda SQL from Rockset
$ rockset project:init
$ rockset project:download
$ rockset project:add commons.myLambda

# Open the current directory in VSCode (if you have the VSCode cli tools)
$ code .

# Alternatively, simply open the current directory using the VSCode UI
```

### Configuration a language

Then, open `myLambda.sql` in VSCode. You should confirm that the language of your SQL file is set to RocksetSQL to activate this extension. You may also want to set RocksetSQL as the default language for '.sql' file extensions. See the [VSCode documentation](https://code.visualstudio.com/docs/languages/overview#_changing-the-language-for-the-selected-file) for more information about configuring languages for your files.

![Image failed to load](/packages/rscode/assets/rockset-sql.png)

### Formatting documents

The Rockset VSCode Extension comes with a formatter. The simplest way to use the formatter is by running `Format Document` in the VSCode Command Palette (`CTRL-Shift-P` or `CMD-Shift-P`), in any RocksetSQL document. We recommend adding the following to your VSCode preferences:

- Set `rockset-vscode` as your default formatter for your Rockset Projects Workspace.
- Turn on `editor.formatOnSave`. This will automatically format your document whenever you save it.

## Executing Queries

The recommended way to execute queries is with the [Rockset Projects Development UI](../dev-server), which comes with the [Rockset CLI](../cli). Please follow the documentation to install and set up these tools.

```sh
# After following the setup instructions above
rockset project:serve
```

This will open up a UI which will allow you to set parameters and test your local Query Lambdas.

You can also execute simple queries directly in VSCode. open the Command Palette in VSCode (`CTRL-SHIFT-P` or `CMD-SHIFT-P`) and execute the command `Rockset Run Query`. This will execute the Query Lambda text raw and _will not pass any parameters_.

## Extension Settings

This extension contributes the following settings:

- `rockset.apiserver`: The Rockset API server to use with this extension
- `rockset.apikey`: the Rockset apikey to use with this extension

## Release Notes

Users appreciate release notes as you update your extension.

### 0.1.3

Supports syntax highlighting, executing a query, and formatting
