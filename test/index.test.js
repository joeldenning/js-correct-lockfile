import assert from "assert";
import fs from "fs/promises";
import path from "path";
import { checkCorrectLockfile } from "../index.js";

describe(`js-correct-lockfile`, () => {
  afterEach(async () => {
    await createLockfiles({ npm: false, yarn: false, pnpm: false });
  });

  it("correctly validates npm projects", async () => {
    await createLockfiles({ npm: true, pnpm: false, yarn: false });
    assert.doesNotReject(() =>
      checkCorrectLockfile("npm", path.resolve("./test"))
    );

    await createLockfiles({ npm: true, pnpm: true, yarn: false });
    assert.rejects(() => checkCorrectLockfile("npm", path.resolve("./test")));

    await createLockfiles({ npm: true, pnpm: true, yarn: true });
    assert.rejects(() => checkCorrectLockfile("npm", path.resolve("./test")));

    await createLockfiles({ npm: false, pnpm: true, yarn: true });
    assert.rejects(() => checkCorrectLockfile("npm", path.resolve("./test")));

    await createLockfiles({ npm: false, pnpm: false, yarn: true });
    assert.rejects(() => checkCorrectLockfile("npm", path.resolve("./test")));
  });

  it("correctly validates yarn projects", async () => {
    await createLockfiles({ npm: false, pnpm: false, yarn: true });
    assert.doesNotReject(() =>
      checkCorrectLockfile("npm", path.resolve("./test"))
    );

    await createLockfiles({ npm: true, pnpm: true, yarn: true });
    assert.rejects(() => checkCorrectLockfile("npm", path.resolve("./test")));

    await createLockfiles({ npm: true, pnpm: true, yarn: true });
    assert.rejects(() => checkCorrectLockfile("npm", path.resolve("./test")));

    await createLockfiles({ npm: true, pnpm: true, yarn: false });
    assert.rejects(() => checkCorrectLockfile("npm", path.resolve("./test")));

    await createLockfiles({ npm: false, pnpm: false, yarn: true });
    assert.rejects(() => checkCorrectLockfile("npm", path.resolve("./test")));
  });

  it("correctly validates pnpm projects", async () => {
    await createLockfiles({ npm: false, pnpm: true, yarn: false });
    assert.doesNotReject(() =>
      checkCorrectLockfile("npm", path.resolve("./test"))
    );

    await createLockfiles({ npm: false, pnpm: true, yarn: true });
    assert.rejects(() => checkCorrectLockfile("npm", path.resolve("./test")));

    await createLockfiles({ npm: true, pnpm: true, yarn: true });
    assert.rejects(() => checkCorrectLockfile("npm", path.resolve("./test")));

    await createLockfiles({ npm: true, pnpm: false, yarn: false });
    assert.rejects(() => checkCorrectLockfile("npm", path.resolve("./test")));

    await createLockfiles({ npm: false, pnpm: false, yarn: true });
    assert.rejects(() => checkCorrectLockfile("npm", path.resolve("./test")));
  });
});

async function createLockfiles({ npm, pnpm, yarn }) {
  if (npm) {
    await fs.writeFile("./test/package-lock.json", "", "utf-8");
  } else {
    await deleteFileIfExists("./test/package-lock.json");
  }

  if (yarn) {
    await fs.writeFile("./test/yarn.lock", "", "utf-8");
  } else {
    await deleteFileIfExists("./test/yarn.lock");
  }

  if (pnpm) {
    await fs.writeFile("./test/pnpm-lock.yaml", "", "utf-8");
  } else {
    await deleteFileIfExists("./test/pnpm-lock.yaml");
  }
}

async function deleteFileIfExists(path) {
  try {
    await fs.unlink(path);
  } catch {}
}
