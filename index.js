import fs from "fs/promises";
import path from "path";

const lockfiles = {
  npm: "package-lock.json",
  yarn: "yarn.lock",
  pnpm: "pnpm-lock.yaml",
};

export async function checkCorrectLockfile(
  correctPm,
  directory = process.cwd()
) {
  if (!correctPm) {
    throw Error(
      `js-correct-lockfile: please specify correct pacakge manager for this project. Valid values are yarn, npm, and pnpm`
    );
  }

  if (correctPm !== "pnpm" && correctPm !== "yarn" && correctPm !== "npm") {
    throw Error(
      `js-correct-lockfile: correct package manager must be 'yarn', 'npm', or 'pnpm.' Received ${correctPm}`
    );
  }

  try {
    await fs.stat(directory);
  } catch (err) {
    throw Error(
      `js-correct-lockfile: root directory does not exist - ${directory}`
    );
  }

  for (let pm in lockfiles) {
    let lockfileExists = false;
    const lockfilePath = path.resolve(directory, lockfiles[pm]);

    try {
      await fs.stat(lockfilePath);
      lockfileExists = true;
    } catch {}

    if (pm === correctPm) {
      if (!lockfileExists) {
        throw Error(
          `js-correct-lockfile: Lockfile at ${lockfilePath} should exist, but does not`
        );
      }
    } else {
      if (lockfileExists) {
        throw Error(
          `js-correct-lockfile: Lockfile at ${lockfilePath} should not exist, but does. Please use ${correctPm} instead of ${pm}`
        );
      }
    }
  }
}
