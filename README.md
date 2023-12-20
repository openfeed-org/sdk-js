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

## User Guide

The User Guide for this project can be found in the [documentation](DOCUMENTATION.md) page.

## Development

This library uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for clarity, tracking changes and versioning. It's recommended to install [Conventional Commits Extension for VS Code](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) when contributing to the library.

### Preparing a new version

For updating the version, run:

```shell
yarn build:prepare-release
git push --follow-tags
```

### Updating the Dependencies

To update the protobuf auto-generated files, follow the steps:

1. Download the latest protoc executable from [here](https://github.com/protocolbuffers/protobuf/releases).
2. Put the protoc.exe in the root folder of the project
3. Run the following command: `yarn generate`
