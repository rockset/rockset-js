
# Query Lambda Hello World Tutorial

If you want to get live Query Lambdas working as quickly as possible, this Hello World example will get you there.

Please start in an empty directory. This guide assumes you have already set up authentication successfully.

```bash

#. Initialize your local rockset project, skipping confirmation messages
$ rockset local:init -y

#. Add a Query Lambda to your project
$ rockset local:queryLambda:add commons.helloWorld

#. View the SQL file associated with your Query Lambda
rockset local:resolve --sql commons.helloWorld

#. We recommend editing the SQL file using our VSCode plugin for the best support
#. Alternatively, you can edit in your favorite editor, or write text from the command line as below 
#. Write text to your Query Lambda
$ echo "SELECT 'hello, world' \"Hello World\"" > `rockset local:resolve --sql commons.helloWorld`

#. Execute your Query Lambda, and view the result using the local Development UI
$ rockset local:serve

#. Or execute from the command line
$ rockset local:queryLambda:execute commons.helloWorld | jq '.results'
[INFO]: About to execute commons.helloWorld from local project...
[INFO]: SQL: SELECT 'hello, world' "Hello World"

[INFO]: Parameters: []
[INFO]: Successfully executed query.
[
  {
    "Hello World": "hello, world"
  }
]

#. Deploy your Query Lambda, and tag it with the dev tag
$ rockset local:deploy -l commons.helloWorld -t dev
Successfully updated commons.helloWorld — version e71f9de16aa66e3c
Successfully tagged commons.helloWorld version e71f9de16aa66e3c with tag "dev"

#. Your Query Lambda is now live!
#. Execute your Query Lambda from the API
$ rockset api:queryLambdas:executeQueryLambdaByTag commons helloWorld dev
[INFO]: POST: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/tags/{tag}
[INFO]: Arguments:
[INFO]: {
  "workspace": "commons",
  "queryLambda": "helloWorld",
  "tag": "dev"
}
Hello World
hello, world

#. Alternatively, execute your Query Lambda with cURL
$ curl --request POST \
  --url https://api.rs2.usw2.rockset.com/v1/orgs/self/ws/commons/lambdas/helloWorld/tags/dev \
  -H 'Authorization: ApiKey [your apikey]' \
  -H 'Content-Type: application/json' | jq '.results'
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   202  100   202    0     0   1004      0 --:--:-- --:--:-- --:--:--  1004
[
  {
    "Hello World": "hello, world"
  }
]
```

Congratulations, you have finished setting up your Hello World Query Lambda!
