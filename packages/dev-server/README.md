# Rockset Projects Dev UI

The Official Home of the Rockset Projects UI.

![Build|Lint|Test](https://github.com/rockset/rockset-js/workflows/Build%7CLint%7CTest/badge.svg)

<!-- TODO add GIF of the IDE Sidecar -->

## Getting Started

The Rockset Projects Dev UI is bundled with the Rockset CLI. Please first install and setup up the [Rockset CLI](../cli). It is intended to be used in a Rockset Project. Please see the CLI documentation for more information about setting up your Rockset Project.

```bash
# Initialize your rockset project
$ rockset project:init

# Download your query lambdas
$ rockset project:download

# Serve the IDE Sidecar
# Make sure you run this command in a valid Rockset Project.
$ rockset project:serve -p PORT
```

This will launch a server on `localhost:PORT`. Whenever a request to execute a query lambda is sent to the server, it will grab the associated Query Lambda text from the file system and execute it with any parameters.

The Projects Dev UI is tested and fully supported on the latest version of Google Chrome. You may experience bugginess on other browsers.

## UI Usage

Once you have started the development server, navigate to `localhost:PORT` in your browser.

You should see a listing of all of the different Query Lambdas in your Rockset Project.
