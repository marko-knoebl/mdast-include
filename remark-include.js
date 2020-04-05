const path = require("path");

const { mdastInclude } = require("./mdast-include");

const attacher = (options = {}) => async (tree, file) => {
  let directory = options.directory || file.dirname || file.cwd;
  if (!directory && file.history && file.history.length > 0) {
    directory = path.dirname(file.history[file.history.length - 1]);
  }
  const newTree = await mdastInclude(tree, options, { directory: directory });
  Object.assign(tree, newTree);
};

module.exports = { remarkInclude: attacher };
