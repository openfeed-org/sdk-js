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

The project uses Yarn 4, through [Corepack](https://github.com/nodejs/corepack): run `corepack enable` once (on Node 25 or later, install Corepack first with `npm i -g corepack`). Then:

```shell
yarn
yarn hooks:install
yarn generate:version
```

`hooks:install` installs the git hooks (`.husky/`), which check each commit message with commitlint. `yarn` doesn't install them, since this repository runs no install scripts, its dependencies' included (`enableScripts: false` in `.yarnrc.yml`).

`generate:version` writes `generated/version.ts`, which isn't committed. The tests, the linter and the type checker all need it, so run it once after cloning.

`build:ts`, `run:browser` and `run:node` run both of these themselves.

### Checks

| Command              | What it does                                    |
| -------------------- | ----------------------------------------------- |
| `yarn test`          | Runs the tests (Vitest)                         |
| `yarn lint`          | Lints the project (ESLint)                      |
| `yarn format`        | Formats the project (Prettier)                  |
| `yarn format:check`  | Checks the formatting without changing anything |
| `yarn check:package` | Checks the built package with publint and attw  |
| `yarn check:esm`     | Imports the built package from Node as ESM      |

`check:package` and `check:esm` need a build first. CI runs all of these on every branch, and the package checks again before publishing.

### Building

```shell
yarn build:ts    # browser bundle and type declarations
yarn build:node  # Node bundle
```

Both write to `dist`. Run `build:ts` first, as it clears `dist` before building.

### Updating the proto files

The generated code in `generated/` comes from the [openfeed-org/proto](https://github.com/openfeed-org/proto) repository, which `yarn generate` clones over SSH into `.proto/` (not committed), so you need SSH access to it. You also need `protoc` on your `PATH`: download it from the [protobuf releases](https://github.com/protocolbuffers/protobuf/releases), or on macOS run `brew install protobuf`.

Then run:

```shell
yarn generate
```

This pulls the latest proto files, generates the TypeScript code with `ts-proto`, and post-processes it (splitting encoders from decoders to keep the bundle small, and writing `generated/index.ts`). Commit the changes to `generated/`.

### Releasing

Releases are made by [release-please](https://github.com/googleapis/release-please), from the conventional commits on `master`:

1. Every push to `master` opens or updates a release PR, with the next version and its `CHANGELOG.md` entries.
2. Merging the release PR tags the version and creates the GitHub release.
3. The same workflow builds and checks that version, then stages it on npm.
4. A maintainer approves the staged version on npmjs.com (or with `npm stage approve`) with 2FA, which makes it public.

`feat` commits bump the minor version, `fix` and `perf` the patch, and a `!` or a `BREAKING CHANGE:` footer the major. Commits of other types (`build`, `chore`, `ci`, `docs`, `refactor`, `style`, `test`) don't trigger a release or appear in the changelog. Release notes from before release-please are in [`.releases/`](.releases/).
