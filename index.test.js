const mdast = require("@karuga/mdast");

const mdastInclude = require("./index.js");

it("leaves mdast tree without @imports unchanged", async () => {
  const inputString = "# heading";
  const inputTree = mdast.parse(inputString);
  const outputTree = await mdastInclude(inputTree);
  expect(outputTree.children.length).toEqual(1);
});

it("processes a single include directive", async () => {
  const inputString = "@include 2p.md";
  const inputTree = mdast.parse(inputString);
  const outputTree = await mdastInclude(
    inputTree,
    {},
    { directory: "test_assets" }
  );
  expect(outputTree.children.length).not.toEqual(1);
});

it("processes multiple include directives", async () => {
  const inputString = "@include 2p.md\n@include 2p.md\n";
  const inputTree = mdast.parse(inputString);
  const outputTree = await mdastInclude(
    inputTree,
    {},
    { directory: "test_assets" }
  );
  expect(outputTree.children.length).toEqual(4);
});

it("processes recursive include directives", async () => {
  const inputString = "@include i_i_i_2p.md\n";
  const inputTree = mdast.parse(inputString);
  const outputTree = await mdastInclude(
    inputTree,
    {},
    { directory: "test_assets" }
  );
  expect(outputTree.children.length).toEqual(2);
});

it("throws error if no matching file is found", async () => {
  expect.assertions(1);
  const inputString = "@include nonexistant.md";
  const inputTree = mdast.parse(inputString);
  return mdastInclude(inputTree).catch(e => {
    expect(e).toBeDefined();
  });
});

it("throws error if there is a non-include statement inside an include block", () => {
  expect.assertions(1);
  const inputString = "@include 2p.md\n@include 2p.md\nfoo";
  const inputTree = mdast.parse(inputString);
  return mdastInclude(inputTree, {}, { directory: "test_assets" }).catch(e => {
    expect(e).toBeDefined();
  });
});

it("imports multiple files via glob patterns", async () => {
  const inputString = "@include glob_import.md\n";
  const inputTree = mdast.parse(inputString);
  const outputTree = await mdastInclude(
    inputTree,
    {},
    { directory: "test_assets" }
  );
  expect(outputTree.children.length).toEqual(7);
});
