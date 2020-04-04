# remark-include

@include directives for remark / mdast

features:

- recursive includes (include a file which in turn includes another file)
- include patterns (`@include mydir/*.md` will include all matching files)

downsides:

- this operates _after_ parsing is done
- syntax restrictions (e.g. there must be blank lines before and after a block of imports)

alternatives (remark-based):

- https://github.com/wangshijun/remark-include
- https://github.com/BrekiTomasson/remark-import

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

note: code formatters (like prettier) may have to be disabled (e.g. to prevent replacing `*` with `\*`):

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
