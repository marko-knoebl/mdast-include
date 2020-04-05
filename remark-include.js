const { mdastInclude } = require("./mdast-include");

const attacher = (options = {}) => async (tree, file) => {
  const newTree = await mdastInclude(tree, options, {
    directory: options.directory || file.dirname || file.cwd
  });
  Object.assign(tree, newTree);
};

module.exports = { remarkInclude: attacher };
