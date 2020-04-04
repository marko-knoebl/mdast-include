const { remarkInclude, mdastInclude, mdInclude } = require("./index");

it("provides two named exports", () => {
  expect(remarkInclude).toBeDefined();
  expect(mdastInclude).toBeDefined();
  expect(mdInclude).toBeDefined();
});
