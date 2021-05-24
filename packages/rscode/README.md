**Note: The Rockset VSCode extension is currently in a beta release. Please report any bugs to Rockset Customer Support**
## Features

- Syntax Highlighting
- Execute Queries
- Error Highlighting
- Autocomplete
- Formatting

![gif failed to load](/packages/rscode/assets/vscode-readme.gif)

## Installation

The Rockset VSCode plugin is available to install on the [VSCode Extension Marketplace](https://code.visualstudio.com/docs/editor/extension-gallery).

## Setup

After installation, first set the following two properties in your VSCode preferences (CMD-,).

- `rockset.apiserver`: The Rockset API server to use with this extension
- `rockset.apikey`: The Rockset API key to use with this extension

The recommended way to get started with SQL files is to use [Rockset CLI](/packages/cli).

```sh

# Authenticate
$ rockset auth:add default <apikey>

# Populate your Query Lambda SQL from Rockset
$ rockset local:init
$ rockset local:download
$ rockset local:queryLambda:add commons.myLambda

# Open the current directory in VSCode (if you have the VSCode CLI tools)
$ code .

# Alternatively, simply open the current directory using the VSCode UI
```

### Configuring RocksetSQL language

Then, open `myLambda.sql` in VSCode. You should confirm that the language of your SQL file is set to RocksetSQL to activate this extension. You may also want to set RocksetSQL as the default language for '.sql' file extensions. See the [VSCode documentation](https://code.visualstudio.com/docs/languages/overview#_changing-the-language-for-the-selected-file) for more information about configuring languages for your files.

![Image failed to load](/packages/rscode/assets/rockset-sql.png)

### Formatting documents

The Rockset VSCode Extension comes with a formatter. The simplest way to use the formatter is by running `Format Document` in the VSCode Command Palette (`CTRL-Shift-P` or `CMD-Shift-P`), in any RocksetSQL document. We recommend adding the following to your VSCode preferences:

- Turn on `editor.formatOnSave`. This will automatically format your document whenever you save it.

## Executing Queries

You can execute simple queries directly in VSCode. Open the Command Palette in VSCode (`CTRL-SHIFT-P` or `CMD-SHIFT-P`) and execute the command `Execute Rockset Query`. This will execute the Query Lambda text raw and _will not pass any parameters_. At this point, it is not possible to run parameterized queries directly from VSCode.

## Extension Settings

This extension contributes the following settings:

- `rockset.apiserver`: The Rockset API server to use with this extension
- `rockset.apikey`: the Rockset API key to use with this extension

## Release Notes

### 0.3.0

- syntax highlighting for Rockset's SQL dialect
- basic query execution in VsCode
- autoformatting for .sql files
