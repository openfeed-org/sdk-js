# TS/JS SDK for Barchart Openfeed

TypeScript and JavaScript SDK for Barchart Openfeed is a library that can be used to subscribe to market data messages served by the Barchart [Openfeed](https://openfeed.com/) servers.

## Obtaining the Library

Using npm:

```shell
npm i --save @openfeed/sdk-js
```

Using yarn:

```shell
yarn add @openfeed/sdk-js
```

If you use TypeScript, enable `esModuleInterop` in your `tsconfig.json`. The SDK's types import `long` with a default import, and without it 64-bit fields like `marketId` lose their `Long` type.

## User Guide

The User Guide for this project can be found in the [documentation](DOCUMENTATION.md) page.

## Development

This library uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for clarity, tracking changes and versioning. It's recommended to install [Conventional Commits Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) when contributing to the library.

### Setup

```shell
yarn
yarn generate:version
```

`generate:version` writes `generated/version.ts`, which isn't committed. The tests, the linter and the type checker all need it, so run it once after cloning (the build scripts run it themselves).

### Checks

| Command             | What it does                                    |
| ------------------- | ----------------------------------------------- |
| `yarn test`         | Runs the tests (Vitest)                         |
| `yarn lint`         | Lints the project (ESLint)                      |
| `yarn format`       | Formats the project (Prettier)                  |
| `yarn format:check` | Checks the formatting without changing anything |

CI runs `lint`, `format:check` and `test` on every branch.

### Building

```shell
yarn build:ts    # browser bundle and type declarations
yarn build:node  # Node bundle
```

Both write to `dist`. Run `build:ts` first, as it clears `dist` before building.

### Updating the proto files

The generated code in `generated/` comes from the [openfeed-org/proto](https://github.com/openfeed-org/proto) repository, which is installed over SSH, so you need SSH access to it. You also need `protoc` on your `PATH`: download it from the [protobuf releases](https://github.com/protocolbuffers/protobuf/releases), or on macOS run `brew install protobuf`.

Then run:

```shell
yarn generate
```

This pulls the latest proto files, generates the TypeScript code with `ts-proto`, and post-processes it (splitting encoders from decoders to keep the bundle small, and writing `generated/index.ts`). Commit the changes to `generated/` and `yarn.lock`.

### Preparing a new version

For updating the version and automatically collecting changes, run:

```shell
yarn build:prepare-release
git push --follow-tags origin master
```
