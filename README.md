# TS/JS SDK for Barchart OpenFeed

TypeScript and JavaScript SDK for Barchart OpenFeed is a library that can be used to subscribe to market data messages served by the Barchart [OpenFeed](https://openfeed.com/) servers.

## Obtaining the Library

Using npm:

```shell
$ npm i --save @openfeed/sdk-js
```

Using yarn:

```shell
$ yarn add @openfeed/sdk-js
```

## User Guide

The User Guide for this project can be found in the [documentation](DOCUMENTATION.md) page.

## Updating the Dependencies

To update the protobuf auto-generated files, follow the steps:

1. Download the latest protoc executable from [here](https://github.com/protocolbuffers/protobuf/releases).
2. Put the protoc.exe in the root folder of the project
3. Run the following command: `yarn generate`
