const remark = require("remark");

const remarkInclude = require("./remark-include");

it("processes a file with imports relative to the current directory", async done => {
  const processor = remark().use(remarkInclude);
  const input = "@include test_assets/glob_import.md\n";
  const output = (await processor.process(input)).toString();
  expect(output).toMatch(/<!--.*\n\npar 1/);
  done();
});

it("processes a file with imports relative to a given directory", async () => {
  const processor = remark().use(remarkInclude, { directory: "test_assets" });
  const input = "@include test_assets/glob_import.md\n";
  const output = (await processor.process(input)).toString();
  expect(output).toMatch(/<!--.*\n\npar 1/);
});
