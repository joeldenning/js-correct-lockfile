# js-correct-lockfile

Test that incoming pull requests use the correct lockfile (npm, yarn, pnpm). This automates a check that is often done manually by open source maintainers to verify that a new contributor used the correct package manager. This is intended to be used in CI tests.

For example, if a project uses yarn, new contributions to the project should not add package-lock.json or pnpm-lock.yaml files.

## Installation

```sh
npm install --save-dev js-correct-lockfile

yarn add --dev js-correct-lockfile

pnpm install --save-dev js-correct-lockfile

narn add --dev js-correct-lockfile
```

## CLI

You can use the `js-correct-lockfile` command inside of package.json scripts, or via npx, as a CLI. The CLI accepts one argument - the correct package manager for the current project. The js-correct-lockfile project will check for the presence of lockfiles in the current working directory.

```sh
npx js-correct-lockfile npm

# Requires yarn 2. For yarn 1, use npx or ynpx (https://www.npmjs.com/package/ynpx)
yarn dlx js-correct-lockfile yarn

pnpmx js-correct-lockfile pnpm
```

```json
{
  "scripts": {
    "test": "js-correct-lockfile yarn"
  }
}
```

## JS API

You can also use `js-correct-lockfile` as a javascript module:

```js
import { checkCorrectLockfile } from "js-correct-lockfile";

checkCorrectLockFile(
  // Required. Must be "npm", "yarn", or "pnpm"
  packageManager,

  // Optional, defaults to current working directory - process.cwd()
  (directory: "/Users/name/code/my-project")
).then(
  () => {
    console.log("Correct lockfiles present!");
  },
  (err) => {
    console.error(err);
    process.exit(1);
  }
);
```
