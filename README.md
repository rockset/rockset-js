rockset-js
============

The Official Home for all of Rockset's JS/TS Developer Tooling.

![Build|Lint|Test](https://github.com/rockset/rockset-js/workflows/Build%7CLint%7CTest/badge.svg)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Strict TypeScript Checked](https://badgen.net/badge/TS/Strict "Strict TypeScript Checked")](https://www.typescriptlang.org)


This repo is managed by [lerna](https://github.com/lerna/lerna) and [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/).

## Packages

All Lerna packages are in [packages](./packages) directory. Each individual project has detailed documentation about its usage.

* [Rockset JS SDK](./packages/client)
* [Rockset CLI](./packages/cli)
* [Rockset VSCode Plugin](./packages/rscode)
* [Rockset IDE Sidecar Server](./packages/dev-server)
* [Rockset IDE Sidecar UI](./packages/dev-ui)

## Contributing

To get started, please ensure that you are on Node v12. 

```bash
# install dependencies
yarn

# Watch all files for changes
yarn start

# Build production versions
yarn run build
```

## Publishing

The publishing o all of the above projects is handled automatically through Github Actions CI/CD. Simply run the following in the repo root, and then monitor the deploy in Github Actions.

```
./release
```

The exception to the above is the VSCode plugin, which currently has to be manually deployed.

