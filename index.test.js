const { remarkInclude, mdastInclude } = require("./index");

it("provides two named exports", () => {
  expect(remarkInclude).toBeDefined();
  expect(mdastInclude).toBeDefined();
});
