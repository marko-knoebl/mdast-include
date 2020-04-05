const fs = require("fs");
const mdast = require("@karuga/mdast");
const fastGlob = require("fast-glob");

const includeRegex = /^@include (.*)(\n|$)/;

const mdastInclude = async (tree, options = {}, context = {}) => {
  const baseDirectory = context.directory || ".";
  let newChildren = [];
  for (let node of tree.children) {
    if (
      node.type === "paragraph" &&
      node.children[0].type === "text" &&
      includeRegex.test(node.children[0].value)
    ) {
      // this "paragraph" starts with @include
      // split lines
      const lines = node.children[0].value.split(/\r?\n/);
      for (let line of lines) {
        const includeMatch = includeRegex.exec(line);
        if (includeMatch === null) {
          throw new Error("non-include expression in include block");
        }
        const includePattern = `${baseDirectory}/${includeRegex.exec(line)[1]}`;
        const includePaths = await fastGlob(includePattern);
        if (includePaths.length === 0) {
          throw new Error(`no files matched pattern ${includePattern}`);
        }
        const contentPromises = includePaths.map(async path => {
          const includeBase = path.slice(0, path.lastIndexOf("/"));
          const includeString = await fs.promises.readFile(path, {
            encoding: "utf-8"
          });
          const includeContent = mdast.parse(includeString);
          // recursive inclusion
          const recursiveIncludeContent = await mdastInclude(
            includeContent,
            options,
            { ...context, directory: includeBase }
          );
          return recursiveIncludeContent;
        });
        const contentParts = await Promise.all(contentPromises);
        for (let contentPart of contentParts) {
          newChildren = newChildren.concat(contentPart.children);
        }
      }
    } else {
      newChildren.push(node);
    }
  }
  const newContent = {
    type: "root",
    children: newChildren
  };
  return newContent;
};

module.exports = { mdastInclude };
