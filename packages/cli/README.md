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
@rockset/cli/0.1.0 darwin-x64 node-v11.11.0
$ rock --help [COMMAND]
USAGE
  $ rock COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`rock hello [FILE]`](#rock-hello-file)
* [`rock help [COMMAND]`](#rock-help-command)

## `rock hello [FILE]`

describe the command here

```
USAGE
  $ rock hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ rock hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/rockset/rockset-js/blob/v0.1.0/src/commands/hello.ts)_

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
<!-- commandsstop -->
