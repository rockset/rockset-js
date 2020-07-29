@rockset/cli
============

Official Rockset CLI

**Note: The Rockset CLI is currently in a beta release. Please report any bugs to Rockset Customer Support**

![Release](https://img.shields.io/badge/release-beta-yellow)
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@rockset/cli.svg)](https://npmjs.org/package/@rockset/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@rockset/cli.svg)](https://npmjs.org/package/@rockset/cli)
[![License](https://img.shields.io/npm/l/@rockset/cli.svg)](https://github.com/rockset/rockset-js/blob/master/package.json)
![Build|Lint|Test](https://github.com/rockset/rockset-js/workflows/Build%7CLint%7CTest/badge.svg)

* [Download & Installation Instructions](#download--installation-instructions)
* [Authentication and Profile Management (`rockset auth`)](#authentication-and-profile-management-rockset-auth)
* [Create and Deploy Query Lambdas (`rockset local`)](#create-and-deploy-query-lambdas-rockset-local)
    * [Set Up Query Lambdas Source Directory](#set-up-query-lambdas-source-directory)
    * [Download Existing Query Lambdas from Rockset](#download-existing-query-lambdas-from-rockset)
    * [Add a New Query Lambda](#add-a-new-query-lambda)
    * [Write and Edit Query Lambda SQL](#write-and-edit-query-lambda-sql)
    * [Execute and Test Query Lambda SQL](#execute-and-test-query-lambda-sql)
    * [Deploy Query Lambdas to Rockset](#deploy-query-lambdas-to-rockset)
    * [Integrate with Version Control and CI/CD](#integrate-with-version-control-and-cicd)
* [Access the Rockset API from the Command Line (`rockset api`)](#access-the-rockset-api-from-the-command-line-rockset-api)
    * [Input Arguments & Examples](#input-arguments--examples)
    * [Output Format Options](#output-format-options)
* [Execute SQL from the Command Line (`rockset sql`)](#execute-sql-from-the-command-line-rockset-sql)
* [Telemetry](#telemetry)

# Download & Installation Instructions

### Install Using `curl` (Recommended)

This standalone installation is ideal for most environments as it contains its own Node.js binary and automatically updates. However, it is **not Windows compatible**. 

```
curl https://rockset-cli-artifacts.s3-us-west-2.amazonaws.com/install-standalone.sh | bash 
```

Running this script requires sudo access. **Be sure to restart your command line once the installation is completed.**

### Install Using `npm` (Not Recommended)

As a standalone Node.js binary, you can also install the `@rockset/cli` package directly from `npm`. However, it is strongly recommended that you use another installation method as the package will not be able to autoupdate and requires you to use your system's version of Node.js. If you choose to use this installation method, ensure you are on Node.js 10.x or 12.x before attempting it.

```
npm install -g @rockset/cli
```

### Update to Latest Version

You can update the Rockset CLI to the latest version at any time using `rockset update`.
```
$ rockset update
```

After an update, run `rockset autocomplete -r` to rebuild the autocomplete cache. 

### Verify Your Installation
To verify that your installation was completed successfully, run `rockset --version` in your command line.
```
$ rockset --version
```

### Install Autocomplete

The Rockset CLI Autocomplete feature allows you to preview and complete commands using the tab key. It is currently compatible with bash and zsh.

To install this feature, run `rockset autocomplete` in your command line.
```
$ rockset autocomplete
```
**Note: If you are installing autocomplete on macOS and using it from a login shell, you may need to run the following command:**
```bash
$ echo 'source ~/.bashrc' >> ~/.bash_profile
```

You may need to restart your command line after all steps to enable the autocomplete feature after installation.

# Authentication and Profile Management (`rockset auth`)

To use the Rockset CLI tool, you will need to create an authentication profile using your API Key which can be created and found in the [Rockset Console](https://console.rockset.com/apikeys).

Once you have successfully obtained your API key, run the `rockset auth:add` command to create your authentication profile. Running the following command will create an authentication profile named `default`:

```
$ rockset auth:add default [API Key]
```

You can add multiple profiles as needed. To view all profiles and switch between them, use the following commands:

```bash
#. View auth profiles
$ rockset auth:list

#. Use a different auth profile
$ rockset auth:use
```

You can find a complete reference for all supported `rockset:auth` commands [here](/packages/cli/reference/auth.md).

# Create and Deploy Query Lambdas (`rockset local`)

The `rockset local` commands allow you to create Query Lambdas locally, include them in your source code and deploy them to Rockset.

You can find a complete reference for all supported `rockset local` commands [here](/packages/cli/reference/local.md).

### Set Up Query Lambdas Source Directory

Before you can proceed with any of the following steps, run `rockset local:init` to configure the source directory for your Query Lambdas.
You'll be prompted for a relative path (`./src` by default) that will serve as the home for your Query Lambda definition and SQL files.

### Download Existing Query Lambdas from Rockset

If you've already created Query Lambdas through the Rockset Console, you can download them to your local filesystem using the `rockset local:download` 
command. You can specify particular Query Lambda tags to download as arguments (see `rockset local:download -h` for full details).

Each Query Lambda downloaded will write both a definition file and a SQL file. A sample file structure might look like:

```bash
#. After downloading three Query Lambdas: commons.getMovies, commons.getMovieRatings and quickstart.helloWorld
$ tree
.
├── rockset.config.json
└── src
    ├── commons
    │   ├── getMovies.lambda.json
    │   ├── getMovieRatings.lambda.json
    │   └── __sql
    │       ├── getMovies.sql
    │       └── getMovieRatings.sql
    └── quickstart
        ├── helloWorld.lambda.json
        └── __sql
            └── helloWorld.sql
```

### Add a New Query Lambda

You can set up a new Query Lambda locally by running:

```
rockset local:queryLambda:add [workspaceName].[queryLambdaName]
rockset local:queryLambda:add commons.helloWorld
```

This command will construct two boilerplate files on your behalf:
* `[workspaceName]/[queryLambdaName].lambda.json` - definition file that includes meta information such as description and default parameters.
* `[workspaceName]/__sql/[queryLambdaName].sql` - SQL file that contains the SQL statement associated with this Query Lambda.

### Write and Edit Query Lambda SQL

Write the SQL for your Query Lambda in the `.sql` file created in the section above. You can use any editor,
but we encourage you to try VSCode and the [Rockset VSCode plugin](/packages/rscode), which offers syntax highlighting, autocomplete and more.

### Execute and Test Query Lambda SQL

You can test your Query Lambda SQL during development in several different ways.

For simple, unparametrized queries with simple results, you can trigger an execution through VSCode itself
(`Execute Rockset Query` from the VSCode Command Pallate).

You can also execute Query Lambda SQL direclty from the command line:

```
$ rockset local:queryLambda:execute commons.helloWorld
```

For more complex queries or queries with parameters, you can use the [Rockset Developer UI](/packages/dev-server). You can
start the Developer UI with the following command:

```
$ rockset local:serve
```

This command spins up a local webserver that displays all of the Query Lambdas found in your local project, allows
you to easily specify and manage query parameters, and offers fully featured data tables and JSON renderers to view your
SQL results.

### Deploy Query Lambdas to Rockset

Up to this point, none of the commands we've run have actually created or updated any resources in our Rockset account.
To take the Query Lambdas defined locally and deploy them to Rockset, we can run the following command:

```
$ rockset local:deploy -l commons.helloWorld -t dev
```

If a Query Lambda named `commons.helloWorld` already exists in Rockset (for example, if you'd already `deploy`'d it previously,
or you had created a Query Lambda with the same name in the Rockset Console), this command will create a new version hash and append
it to the version history for this Query Lambda. If such a Query Lambda does not yet exist, it will create a new Query Lambda.
You can tag this Query Lambda with the `-t` flag — this flag will apply the specified tag to the Query Lambda version created.

So long as your applications hitting this Query Lambda are executing it by tag (as opposed to version hash), you can use this command
to deploy an updated query (or rollback to a previous query) without having to deploy your application code at all.

### Integrate with Version Control and CI/CD

You can check all of your Query Lambda files into your version control system as you might with any other application files. You can also use the `deploy`
command to deploy your Query Lambdas automatically in CI/CD.

```bash
#. In CI/CD
rockset local:deploy -t development
...

#. When you want to deploy to production
git checkout <commit hash>
rockset local:deploy -t production
```

Then, your application can hit Query Lambda `helloWorld` with tag `development` in development, and hit `helloWorld` with tag `production` in the production environment.

```js
// JS Application Example
rockset.queryLambdas.executeQueryLambdaByTag('commons', 'helloWorld', isProduction() ? 'production' : 'development');
```

# Access the Rockset API from the Command Line (`rockset api`)

The `rockset api` commands allow you to access any of the [Rockset REST API endpoints](https://docs.rockset.com/rest-api).

You can find a complete reference for all supported `rockset api` commands [here](/packages/cli/reference/api.md), along with detailed examples for
most commands.

### Input Arguments & Examples

Each API command accepts positional arguments that translate to the URL parameters of the REST endpoint that they wrap. Commands that wrap POST endpoints must
additionally take a JSON / YAML file that specifies the data to be passed.

Let's look at two basic examples:

**List all Collections**

```bash
$ rockset api:collections:listCollections
```

**Create a Collection**

```yaml
#. YAML Spec for this collection
name: footest
sources:
- s3:
    access_key: ''
    secret_access: ''
    prefix: partial-cities
    region: us-west-2
    bucket: rockset-public-datasets
    prefixes:
    - partial-cities
    mappings: []
  format: JSON
retention_secs: 100000
field_mappings:
- name: country_length_mapper
  is_drop_all_fields:
  input_fields:
  - field_name: fields.country
    if_missing: PASS
    is_drop: true
    param: country
  output_field:
    field_name: lenCountry
    value:
      sql: LENGTH(:country)
    on_error: SKIP
```

```bash
$ rockset api:collections:createCollection commons --body spec.yaml
...
```

### Output Format Options

All API Commands by default will intelligently grab the most relevant part of the response data and display it for you in a table. The most commonly used flags are shown below. The full set of flags can be found by setting the `-h` flag.

```
  --columns=columns              only show provided columns (comma-separated)

  --output=csv|json|yaml         output in a more machine friendly format
```


# Execute SQL from the Command Line (`rockset sql`)

The `rockset sql` commands allow you to execute any SQL statement.

You can pass a SQL string directly as an argument:

```
$ rockset sql "SELECT 'hello, world!'"
```

You can also not pass any arguments, in which case you will be prompted to open your default text editor. Saving and closing the file
will execute the SQL statement contained within it.

```bash
$ rockset sql
? sql: Press <enter> to launch your preferred editor.
```

You can find a complete reference for the `rockset sql` command [here](/packages/cli/reference/sql.md).

# Telemetry

The Rockset CLI includes a telemetry feature that collects some usage data. This feature is enabled by default. We never log any sensitive data, query text, or query result data.

To opt out of telemetry, set the ROCKSET_CLI_TELEMETRY_OPTOUT environment variable to 1 or true.
