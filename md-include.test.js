const fsExtra = require("fs-extra");

const { mdInclude } = require("./md-include");

it("processes an include", async () => {
  const inPath = "test_assets/glob_import.md";
  const outPath = "test_out/glob_import.md";
  await fsExtra.ensureDir("test_out");
  await mdInclude(inPath, outPath);
  const exists = await fsExtra.pathExists(outPath);
  expect(exists).toEqual(true);
  await fsExtra.remove("test_out");
});
