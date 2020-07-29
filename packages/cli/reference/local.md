`rockset local`
===============

Manage your local Query Lambdas.

* [`rockset local:deploy`](#rockset-localdeploy)
* [`rockset local:download`](#rockset-localdownload)
* [`rockset local:init`](#rockset-localinit)
* [`rockset local:queryLambda:add NAME`](#rockset-localquerylambdaadd-name)
* [`rockset local:queryLambda:delete NAME`](#rockset-localquerylambdadelete-name)
* [`rockset local:queryLambda:execute NAME`](#rockset-localquerylambdaexecute-name)
* [`rockset local:queryLambda:list`](#rockset-localquerylambdalist)
* [`rockset local:resolve NAME`](#rockset-localresolve-name)
* [`rockset local:serve`](#rockset-localserve)

## `rockset local:deploy`

deploy Query Lambda entities to Rockset

```
USAGE
  $ rockset local:deploy

OPTIONS
  -h, --help                                                                    show CLI help

  -l, --lambda=lambda                                                           the qualified name of the lambda to
                                                                                deploy

  -t, --tag=specify a tag name to be applied to deployed Query Lambda versions

  -w, --workspace=workspace                                                     the qualified name of the workspace to
                                                                                deploy

  --dryRun                                                                      print out the names of the Query Lambdas
                                                                                that would be deployed and return

  --failOnMissingWorkspace                                                      if a workspace does not exist in the
                                                                                remote, the deploy will fail instead of
                                                                                creating one

DESCRIPTION
  If a workspace parameter is passed, only Query Lambdas in that workspace will be deployed.
  If a lambda parameter is passed, only that Query Lambda will be deployed.
```

_See code: [src/commands/local/deploy.ts](../src/commands/local/deploy.ts)_

## `rockset local:download`

download Query Lambda entities from Rockset to your local project

```
USAGE
  $ rockset local:download

OPTIONS
  -h, --help            show CLI help
  -t, --tag=production  only download Query Lambda versions marked with this tag
  -y, --yes             bypass the safety checks, and automatically engage in dangerous actions

DESCRIPTION
  Note: For operating systems that are case insensitive (eg. MacOS and Windows), it is possible that two different Query 
  Lambdas from the server will be associated with the same paths on disk. This command will skip Query Lambdas that 
  would otherwise overwrite each other.
```

_See code: [src/commands/local/download.ts](../src/commands/local/download.ts)_

## `rockset local:init`

initialize your project with a rockset.config.json file.

```
USAGE
  $ rockset local:init

OPTIONS
  -h, --help  show CLI help
  -y, --yes
```

_See code: [src/commands/local/init.ts](../src/commands/local/init.ts)_

## `rockset local:queryLambda:add NAME`

add a Query Lambda to the current project

```
USAGE
  $ rockset local:queryLambda:add NAME

ARGUMENTS
  NAME  the fully qualified name of the lambda you wish to add (eg. "{workspace}.{name}")

OPTIONS
  -d, --description=description  set the description for the Query Lambda
  -h, --help                     show CLI help

EXAMPLE
    $ rockset local:queryLambda:add commons.helloWorld -d "my lambda"
  Successfully added Query Lambda commons.helloWorld to path /Users/tchordia/rockset/src/commons/helloWorld.lambda.json
```

_See code: [src/commands/local/queryLambda/add.ts](../src/commands/local/queryLambda/add.ts)_

## `rockset local:queryLambda:delete NAME`

delete a Query Lambda from the current project

```
USAGE
  $ rockset local:queryLambda:delete NAME

ARGUMENTS
  NAME  the fully qualified name of the lambda you wish to delete (eg. "{workspace}.{name}")

OPTIONS
  -h, --help  show CLI help
  -y, --yes   bypass the safety checks, and automatically engage in dangerous actions

EXAMPLE
  $ rockset local:queryLambda:delete commons.foo
  ✔ WARNING: This operation will delete commons.foo, and all associated files in the current project, and can result in 
  a loss of work. Are you sure you would like to proceed? … no
```

_See code: [src/commands/local/queryLambda/delete.ts](../src/commands/local/queryLambda/delete.ts)_

## `rockset local:queryLambda:execute NAME`

execute a Query Lambda in the current project

```
USAGE
  $ rockset local:queryLambda:execute NAME

ARGUMENTS
  NAME  the fully qualified name of the lambda you wish to execute (eg. "{workspace}.{name}")

OPTIONS
  -h, --help                                                         show CLI help

  -p, --parameters=[{"name":"param","value":"foo","type":"string"}]  a JSON string of parameters to execute the query
                                                                     with.

EXAMPLE
  $ rockset local:queryLambda:execute commons.helloWorld
```

_See code: [src/commands/local/queryLambda/execute.ts](../src/commands/local/queryLambda/execute.ts)_

## `rockset local:queryLambda:list`

list all of the Query Lambdas in the current project

```
USAGE
  $ rockset local:queryLambda:list

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/local/queryLambda/list.ts](../src/commands/local/queryLambda/list.ts)_

## `rockset local:resolve NAME`

resolve the absolute path of an entity in the current project

```
USAGE
  $ rockset local:resolve NAME

ARGUMENTS
  NAME  the fully qualified name of the lambda you wish to resolve (eg. "{workspace}.{name}")

OPTIONS
  -e, --entity=lambda|workspace  [default: lambda] the type of entity you wish to resolve
  -h, --help                     show CLI help
  --[no-]exists                  return with an error if file does not exist
  --sql                          return the SQL file path (only for Query Lambdas)

EXAMPLES
  $ rockset local:resolve commons.myLambda
  $ rockset local:resolve commons.myLambda --sql
```

_See code: [src/commands/local/resolve.ts](../src/commands/local/resolve.ts)_

## `rockset local:serve`

start development server and open the Developer UI. Used to configure parameters and execute SQL files in your local project

```
USAGE
  $ rockset local:serve

OPTIONS
  -h, --help       show CLI help
  -p, --port=port  [default: 3001] the port to listen at
```

_See code: [src/commands/local/serve.ts](../src/commands/local/serve.ts)_
