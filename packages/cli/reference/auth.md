`rockset auth`
==============

Manage your authentication profiles.

* [`rockset auth:add NAME APIKEY [APISERVER]`](#rockset-authadd-name-apikey-apiserver)
* [`rockset auth:delete NAME`](#rockset-authdelete-name)
* [`rockset auth:list`](#rockset-authlist)
* [`rockset auth:use NAME`](#rockset-authuse-name)

## `rockset auth:add NAME APIKEY [APISERVER]`

create a new profile with the specified name and apikey.

```
create a new profile with the specified name and apikey.  

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

_See code: [src/commands/auth/add.ts](../src/commands/auth/add.ts)_

## `rockset auth:delete NAME`

delete a profile with the specified name

```
delete a profile with the specified name

USAGE
  $ rockset auth:delete NAME

ARGUMENTS
  NAME  the name of the profile you wish to delete

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/auth/delete.ts](../src/commands/auth/delete.ts)_

## `rockset auth:list`

list all of the available profiles, and show the active profile

```
list all of the available profiles, and show the active profile

USAGE
  $ rockset auth:list

OPTIONS
  -h, --help      show CLI help
  -s, --showKeys  uncensor all API Keys
```

_See code: [src/commands/auth/list.ts](../src/commands/auth/list.ts)_

## `rockset auth:use NAME`

use a specific authentication profile

```
use a specific authentication profile

USAGE
  $ rockset auth:use NAME

ARGUMENTS
  NAME  The name of the profile you wish to use.

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/auth/use.ts](../src/commands/auth/use.ts)_
