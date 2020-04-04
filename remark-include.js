const mdastInclude = require("./mdast-include");

const attacher = options => async (tree, file) => {
  const newTree = await mdastInclude(tree, options, {
    directory: file.dirname
  });
  Object.assign(tree, newTree);
};

module.exports = attacher;
