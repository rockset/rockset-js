# Rockset VSCode README

## Features

* Syntax highlighting
* Execute Queries
* Error Highlighting
* Autocomplete
* Formatting

## Beta Installation

```sh

// Download to current directory
curl https://rockset-cli-artifacts.s3-us-west-2.amazonaws.com/vscode-artifacts/rockset-vscode-0.1.3.vsix > rockset.vsix

// Install from current directory
code --install-extension rockset.vsix
```

## Usage

After installation, please first set the following two properties in your VSCode preferences (CMD-,).

* `rockset.apiserver`: The Rockset API server to use with this extension
* `rockset.apikey`: the Rockset apikey to use with this extension

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:
This extension contributes the following settings:

* `rockset.apiserver`: The Rockset API server to use with this extension
* `rockset.apikey`: the Rockset apikey to use with this extension

## Release Notes

Users appreciate release notes as you update your extension.

### 0.1.3

Supports syntax highlighting, executing a query, and formatting


