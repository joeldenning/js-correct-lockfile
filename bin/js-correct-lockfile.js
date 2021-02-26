#!/usr/bin/env node

import { checkCorrectLockfile } from "../index.js";

const args = process.argv.slice(2);

const packageManager = args.length > 0 ? args[0] : "";

checkCorrectLockfile(packageManager).then(
  () => {
    console.log("Correct package manager lockfiles are present");
  },
  (err) => {
    console.error(err);
    process.exit(1);
  }
);
