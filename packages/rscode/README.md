**Note: The Rockset VSCode extension is currently in a beta release. Please report any bugs to Rockset Customer Support**
## Features

- SQL syntax highlighting and documentation
- Query execution and validation
- Add documents
- Error Highlighting
- Autocomplete
- Formatting

![gif failed to load](/packages/rscode/assets/vscode-readme.gif)

## Installation

The Rockset VSCode plugin is available to install on the [VSCode Extension Marketplace](https://code.visualstudio.com/docs/editor/extension-gallery).

## Setup

After installation, first set the following two properties in your VSCode preferences (<kbd>CMD</kbd> + <kbd>,</kbd>).

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

### Executing and Validating Queries
You can execute and validate simple queries directly in VSCode. Open the Command Palette in VSCode (<kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd> or <kbd>CMD</kbd> + <kbd>SHIFT</kbd> + <kbd>P</kbd>) and execute the command `Execute Rockset Query` or `Validate Rockset Query`. At this point, it is not possible to run parameterized queries directly from VSCode.

### Adding Documents
You can add documents with the [Write API](https://docs.rockset.com/write-api/) directly from VSCode. With a JSON or YAML file open, execute the command `Add Rockset Document(s)`. This command takes either a list of documents or a single document.

### SQL Documentation
You can hover over any SQL function and get it's parameters and description, along with a link to Rockset's documentation.

![Image failed to load](/packages/rscode/assets/vscode-readme-sql-hover.png)

### Formatting SQL
The Rockset VSCode Extension comes with a formatter. The simplest way to use the formatter is by running `Format Document` in the VSCode Command Palette (`CTRL-Shift-P` or `CMD-Shift-P`), in any RocksetSQL document. We recommend adding the following to your VSCode preferences:

- Turn on `editor.formatOnSave`. This will automatically format your document whenever you save it.

### Collection Hovers
You can hover over a collection to get it's metadata.

![image failed to load](/packages/rscode/assets/vscode-readme-collection.png)

### Command shortcuts
- Execute query: <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>e</kbd>
- Validate query: <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>v</kbd>
- Add document: <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>a</kbd>
See [the VSCode documentation](https://code.visualstudio.com/docs/getstarted/keybindings#_keyboard-shortcuts-editor) to configure your own keybinds.

### Extension Settings

This extension contributes the following settings:

- `rockset.apiserver`: The Rockset API server to use with this extension
- `rockset.apikey`: The Rockset API key to use with this extension

## Release Notes

### 0.3.0

- syntax highlighting for Rockset's SQL dialect
- basic query execution in VsCode
- autoformatting for .sql files