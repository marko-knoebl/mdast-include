# remark-include

@include directives for remark / mdast

features:

- compatible with current versions of remark
- include patterns (`@include mydir/*.md` will include all matching files)
- compatibility with prettier-formatted patterns (`@include mydir/\*.md`)

downsides:

- this operates _after_ parsing is done
- syntax restrictions (e.g. there must be blank lines before and after a block of imports)
- cannot match backslash characters in paths

alternative:

- <https://github.com/Qard/remark-include> - operates during parsing

## usage

simple imports:

<!-- prettier-ignore-start -->
```md
@import foo.md
@import bar/baz.md
```
<!-- prettier-ignore-end -->

wildcard imports:

```md
<!-- prettier-ignore-start -->

@import bar/*.md

<!-- prettier-ignore-end -->
```

using the remark plugin:

```js
const { remarkInclude } = require("@karuga/remark-include");

const processor = remark().use(remarkInclude);

const input = "@include foo.md";
const output = (await processor.process(input)).toString();
// output will be the contents of foo.md
```

using the mdast transformer:

```js
const { mdastInclude } = require("@karuga/remark-include");

const input = {
  type: "root",
  children: [
    { type: "paragraph" /*...*/ }
    /*...*/
  ]
};
const output = await mdastInclude(input);
```

using mdInclude:

```js
const { mdInclude } = require("@karuga/remark-include");

mdInclude("input.md", "output.md");
```

using the npx script:

```bash
npx @karuga/remark-include input.md output.md
```
