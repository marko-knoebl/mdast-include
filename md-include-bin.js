#! /usr/bin/env node

/*
provides an npm package script that can be used like this:

npx @karuga/remark-include infile.md outfile.md
*/

const { mdInclude } = require("./md-include.js");

const inPath = process.argv[2];
const outPath = process.argv[3];

const main = async () => {
  await mdInclude(inPath, outPath);
};

main();
