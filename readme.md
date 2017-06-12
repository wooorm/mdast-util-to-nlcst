# mdast-util-to-nlcst [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Transform [MDAST][] to [NLCST][].

> **Note** You probably want to use [remark-retext][].

## Installation

[npm][]:

```bash
npm install mdast-util-to-nlcst
```

## Usage

```javascript
var toNLCST = require('mdast-util-to-nlcst');
var inspect = require('unist-util-inspect');
var English = require('parse-english');
var remark = require('remark');
var vfile = require('vfile');

var file = vfile('Some *foo*sball.');
var tree = remark().parse(file);

var nlcst = toNLCST(tree, file, English);

console.log(inspect(nlcst));
```

Yields:

```txt
RootNode[1] (1:1-1:17, 0-16)
└─ ParagraphNode[1] (1:1-1:17, 0-16)
   └─ SentenceNode[4] (1:1-1:17, 0-16)
      ├─ WordNode[1] (1:1-1:5, 0-4)
      │  └─ TextNode: "Some" (1:1-1:5, 0-4)
      ├─ WhiteSpaceNode: " " (1:5-1:6, 4-5)
      ├─ WordNode[2] (1:7-1:16, 6-15)
      │  ├─ TextNode: "foo" (1:7-1:10, 6-9)
      │  └─ TextNode: "sball" (1:11-1:16, 10-15)
      └─ PunctuationNode: "." (1:16-1:17, 15-16)
```

## API

### `toNLCST(node, file, Parser)`

Transform an [MDAST][] syntax tree and corresponding [virtual file][vfile]
into an [NLCST][nlcst] tree.

###### Parameters

*   `node` ([`MDASTNode`][mdast]) — Syntax tree (with positional
    information);
*   `file` ([`VFile`][vfile]);
*   `parser` (`Function`)
    — Constructor of an NLCST parser, such as
    [**parse-english**][english], [**parse-dutch**][dutch],
    or [**parse-latin**][latin].

###### Returns

[`NLCSTNode`][nlcst].

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/syntax-tree/mdast-util-to-nlcst.svg

[travis]: https://travis-ci.org/syntax-tree/mdast-util-to-nlcst

[codecov-badge]: https://img.shields.io/codecov/c/github/syntax-tree/mdast-util-to-nlcst.svg

[codecov]: https://codecov.io/github/syntax-tree/mdast-util-to-nlcst

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[mdast]: https://github.com/syntax-tree/mdast

[nlcst]: https://github.com/syntax-tree/nlcst

[remark-retext]: https://github.com/wooorm/remark-retext

[vfile]: https://github.com/vfile/vfile

[english]: https://github.com/wooorm/parse-english

[latin]: https://github.com/wooorm/parse-latin

[dutch]: https://github.com/wooorm/parse-dutch
