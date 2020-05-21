@rockset/cli
============

Official Rockset CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@rockset/cli.svg)](https://npmjs.org/package/@rockset/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@rockset/cli.svg)](https://npmjs.org/package/@rockset/cli)
[![License](https://img.shields.io/npm/l/@rockset/cli.svg)](https://github.com/rockset/rockset-js/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @rockset/cli
$ rock COMMAND
running command...
$ rock (-v|--version|version)
@rockset/cli/0.0.7 darwin-x64 node-v12.16.3
$ rock --help [COMMAND]
USAGE
  $ rock COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`rock autocomplete [SHELL]`](#rock-autocomplete-shell)
* [`rock help [COMMAND]`](#rock-help-command)
* [`rock update [CHANNEL]`](#rock-update-channel)

## `rock autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ rock autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ rock autocomplete
  $ rock autocomplete bash
  $ rock autocomplete zsh
  $ rock autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.2.0/src/commands/autocomplete/index.ts)_

## `rock help [COMMAND]`

display help for rock

```
USAGE
  $ rock help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `rock update [CHANNEL]`

update the rock CLI

```
USAGE
  $ rock update [CHANNEL]
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v1.3.10/src/commands/update.ts)_
<!-- commandsstop -->
