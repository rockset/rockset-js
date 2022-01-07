`rockset auth`
==============

Manage your authentication profiles.

* [`rockset auth add NAME APIKEY [APISERVER]`](#rockset-auth-add-name-apikey-apiserver)
* [`rockset auth delete NAME`](#rockset-auth-delete-name)
* [`rockset auth list`](#rockset-auth-list)
* [`rockset auth use NAME`](#rockset-auth-use-name)

## `rockset auth add NAME APIKEY [APISERVER]`

create a new profile with the specified name and apikey.

```
USAGE
  $ rockset auth add [NAME] [APIKEY] [APISERVER] [-h] [-a]

ARGUMENTS
  NAME       the name of the profile you wish to create
  APIKEY     the apikey for your account
  APISERVER  [default: https://api.rs2.usw2.rockset.com] the url for the Rockset API server to use

FLAGS
  -a, --[no-]activate  whether to activate the profile after creating it
  -h, --help           Show CLI help.

DESCRIPTION
  create a new profile with the specified name and apikey.



  You can find an API Key for your account in the Rockset Console. https://console.rockset.com/apikeys

  You can find a list of Rockset API servers and supported regions in the Rockset Docs.
  https://rockset.com/docs/rest-api
```

## `rockset auth delete NAME`

delete a profile with the specified name

```
USAGE
  $ rockset auth delete [NAME] [-h]

ARGUMENTS
  NAME  the name of the profile you wish to delete

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  delete a profile with the specified name
```

## `rockset auth list`

list all of the available profiles, and show the active profile

```
USAGE
  $ rockset auth list [-h] [-s]

FLAGS
  -h, --help      Show CLI help.
  -s, --showKeys  uncensor all API Keys

DESCRIPTION
  list all of the available profiles, and show the active profile
```

## `rockset auth use NAME`

use a specific authentication profile

```
USAGE
  $ rockset auth use [NAME] [-h]

ARGUMENTS
  NAME  The name of the profile you wish to use.

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  use a specific authentication profile
```
