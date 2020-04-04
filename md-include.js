const fs = require("fs");
const path = require("path");

const mdast = require("@karuga/mdast");

const mdastInclude = require("./mdast-include");

const mdInclude = async (inPath, outPath) => {
  const inTextContent = await fs.promises.readFile(inPath, {
    encoding: "utf-8"
  });
  const inDirectory = path.dirname(inPath);
  const outTextContent = await processMdIncludesFromTextContent(
    inTextContent,
    inDirectory
  );
  await fs.promises.writeFile(outPath, outTextContent);
};

const processMdIncludesFromTextContent = async (
  documentTextContent,
  baseDirectory
) => {
  const inputTree = mdast.parse(documentTextContent);
  const treeWithIncludes = await mdastInclude(
    inputTree,
    {},
    { directory: baseDirectory }
  );
  const output = mdast.stringify(treeWithIncludes);
  return output;
};

module.exports = { mdInclude };
