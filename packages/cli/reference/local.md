`rockset local`
===============

Manage your local Query Lambdas.

* [`rockset local deploy`](#rockset-local-deploy)
* [`rockset local download`](#rockset-local-download)
* [`rockset local init`](#rockset-local-init)
* [`rockset local queryLambda add NAME`](#rockset-local-querylambda-add-name)
* [`rockset local queryLambda delete NAME`](#rockset-local-querylambda-delete-name)
* [`rockset local queryLambda execute NAME`](#rockset-local-querylambda-execute-name)
* [`rockset local queryLambda list`](#rockset-local-querylambda-list)
* [`rockset local resolve NAME`](#rockset-local-resolve-name)

## `rockset local deploy`

deploy Query Lambda entities to Rockset

```
USAGE
  $ rockset local deploy [-h] [-t <value>] [-l <value> | -w <value>] [--failOnMissingWorkspace] [--dryRun]

FLAGS
  -h, --help                                                                    Show CLI help.
  -l, --lambda=<value>                                                          the qualified name of the lambda to
                                                                                deploy
  -t, --tag=specify a tag name to be applied to deployed Query Lambda versions
  -w, --workspace=<value>                                                       the qualified name of the workspace to
                                                                                deploy
  --dryRun                                                                      print out the names of the Query Lambdas
                                                                                that would be deployed and return
  --failOnMissingWorkspace                                                      if a workspace does not exist in the
                                                                                remote, the deploy will fail instead of
                                                                                creating one

DESCRIPTION
  deploy Query Lambda entities to Rockset

  If a workspace parameter is passed, only Query Lambdas in that workspace will be deployed.

  If a lambda parameter is passed, only that Query Lambda will be deployed.
```

## `rockset local download`

download Query Lambda entities from Rockset to your local project

```
USAGE
  $ rockset local download [-h] [-y] [-t <value>]

FLAGS
  -h, --help            Show CLI help.
  -t, --tag=production  only download Query Lambda versions marked with this tag
  -y, --yes             bypass the safety checks, and automatically engage in dangerous actions

DESCRIPTION
  download Query Lambda entities from Rockset to your local project



  Note: For operating systems that are case insensitive (eg. MacOS and Windows), it is possible that two different Query
  Lambdas from the server will be associated with the same paths on disk. This command will skip Query Lambdas that
  would otherwise overwrite each other.
```

## `rockset local init`

initialize your project with a rockset.config.json file.

```
USAGE
  $ rockset local init [-h] [-y]

FLAGS
  -h, --help  Show CLI help.
  -y, --yes

DESCRIPTION
  initialize your project with a rockset.config.json file.
```

## `rockset local queryLambda add NAME`

add a Query Lambda to the current project

```
USAGE
  $ rockset local queryLambda add [NAME] [-h] [-d <value>]

ARGUMENTS
  NAME  the fully qualified name of the lambda you wish to add (eg. "{workspace}.{name}")

FLAGS
  -d, --description=<value>  set the description for the Query Lambda
  -h, --help                 Show CLI help.

DESCRIPTION
  add a Query Lambda to the current project

EXAMPLES
   $ rockset local:queryLambda:add commons.helloWorld -d "my lambda"
  Successfully added Query Lambda commons.helloWorld to path /Users/tchordia/rockset/src/commons/helloWorld.lambda.json
```

## `rockset local queryLambda delete NAME`

delete a Query Lambda from the current project

```
USAGE
  $ rockset local queryLambda delete [NAME] [-h] [-y]

ARGUMENTS
  NAME  the fully qualified name of the lambda you wish to delete (eg. "{workspace}.{name}")

FLAGS
  -h, --help  Show CLI help.
  -y, --yes   bypass the safety checks, and automatically engage in dangerous actions

DESCRIPTION
  delete a Query Lambda from the current project

EXAMPLES
  $ rockset local:queryLambda:delete commons.foo
  ✔ WARNING: This operation will delete commons.foo, and all associated files in the current project, and can result in a loss of work. Are you sure you would like to proceed? … no
```

## `rockset local queryLambda execute NAME`

execute a Query Lambda in the current project

```
USAGE
  $ rockset local queryLambda execute [NAME] [-h] [-p <value>]

ARGUMENTS
  NAME  the fully qualified name of the lambda you wish to execute (eg. "{workspace}.{name}")

FLAGS
  -h, --help                                                         Show CLI help.
  -p, --parameters=[{"name":"param","value":"foo","type":"string"}]  a JSON string of parameters to execute the query
                                                                     with.

DESCRIPTION
  execute a Query Lambda in the current project

EXAMPLES
  $ rockset local:queryLambda:execute commons.helloWorld
```

## `rockset local queryLambda list`

list all of the Query Lambdas in the current project

```
USAGE
  $ rockset local queryLambda list [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  list all of the Query Lambdas in the current project
```

## `rockset local resolve NAME`

resolve the absolute path of an entity in the current project

```
USAGE
  $ rockset local resolve [NAME] [-h] [-e lambda|workspace] [--exists] [--sql]

ARGUMENTS
  NAME  the fully qualified name of the lambda you wish to resolve (eg. "{workspace}.{name}")

FLAGS
  -e, --entity=<option>  [default: lambda] the type of entity you wish to resolve
                         <options: lambda|workspace>
  -h, --help             Show CLI help.
  --[no-]exists          return with an error if file does not exist
  --sql                  return the SQL file path (only for Query Lambdas)

DESCRIPTION
  resolve the absolute path of an entity in the current project

EXAMPLES
  $ rockset local:resolve commons.myLambda

  $ rockset local:resolve commons.myLambda --sql
```
