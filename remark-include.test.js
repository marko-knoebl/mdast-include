const remark = require("remark");
const vfile = require("vfile");

const { remarkInclude } = require("./remark-include");

it("processes a file with imports relative to the current directory", async done => {
  const processor = remark().use(remarkInclude);
  const input = "@include test_assets/glob_import.md\n";
  const output = (await processor.process(input)).toString();
  expect(output).toMatch(/par 1\n\npar 2/);
  done();
});

it("processes a file with imports relative to a given directory", async () => {
  const processor = remark().use(remarkInclude, { directory: "test_assets" });
  const input = "@include glob_import.md\n";
  const output = (await processor.process(input)).toString();
  expect(output).toMatch(/par 1\n\npar 2/);
});

it("processes a vfile with relative imports", async () => {
  const processor = remark().use(remarkInclude);
  const input = vfile({
    contents: "@include glob_import.md\n",
    path: "test_assets/glob_import.md"
  });
  const output = (await processor.process(input)).toString();
  expect(output).toMatch(/par 1\n\npar 2/);
});
