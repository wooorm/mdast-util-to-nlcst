/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:to-nlcst
 * @fileoverview Test suite for `mdast-util-to-nlcst`.
 */

'use strict';

/* Dependencies. */
var fs = require('fs');
var path = require('path');
var test = require('tape');
var remark = require('remark');
var vfile = require('vfile');
var Latin = require('parse-latin');
var Dutch = require('parse-dutch');
var English = require('parse-english');
var negate = require('negate');
var hidden = require('is-hidden');
var toNLCST = require('..');

/* Methods. */
var read = fs.readFileSync;
var join = path.join;

/* Constants. */
var ROOT = join(__dirname, 'fixtures');

/* Fixtures. */
var fixtures = fs.readdirSync(ROOT);

/* Tests. */
test('mdast-util-to-nlcst', function (t) {
  t.throws(
    function () {
      toNLCST();
    },
    /mdast-util-to-nlcst expected node/,
    'should fail when not given an AST'
  );

  t.throws(
    function () {
      toNLCST({});
    },
    /mdast-util-to-nlcst expected node/,
    'should fail when not given an AST (#2)'
  );

  t.throws(
    function () {
      toNLCST({type: 'foo'});
    },
    /mdast-util-to-nlcst expected file/,
    'should fail when not given a file'
  );

  t.throws(
    function () {
      toNLCST({type: 'foo'});
    },
    /mdast-util-to-nlcst expected file/,
    'should fail when not given a file (#2)'
  );

  t.throws(
    function () {
      toNLCST(
        {type: 'text', value: 'foo'},
        {foo: 'bar'}
      );
    },
    /mdast-util-to-nlcst expected file/,
    'should fail when not given a file (#3)'
  );

  t.throws(
    function () {
      toNLCST(
        {type: 'text', value: 'foo'},
        vfile('foo')
      );
    },
    /mdast-util-to-nlcst expected parser/,
    'should fail without parser'
  );

  t.throws(
    function () {
      toNLCST({type: 'text', value: 'foo'}, vfile(), Latin);
    },
    /mdast-util-to-nlcst expected position on nodes/,
    'should fail when not given positional information'
  );

  t.doesNotThrow(
    function () {
      toNLCST({
        type: 'text',
        value: 'foo',
        position: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 4}
        }
      }, vfile(), English);
    },
    'should accept a parser constructor'
  );

  t.doesNotThrow(
    function () {
      toNLCST({
        type: 'text',
        value: 'foo',
        position: {
          start: {line: 1, column: 1},
          end: {line: 1, column: 4}
        }
      }, vfile(), new Dutch());
    },
    'should accept a parser instance'
  );

  t.throws(
    function () {
      toNLCST({
        type: 'text',
        value: 'foo',
        position: {start: {}, end: {}}
      }, vfile(), Latin);
    },
    /mdast-util-to-nlcst expected position on nodes/,
    'should fail when not given positional information (#2)'
  );

  t.test('should accept nodes without offsets', function (st) {
    var node = toNLCST({
      type: 'text',
      value: 'foo',
      position: {
        start: {line: 1, column: 1},
        end: {line: 1, column: 4}
      }
    }, vfile('foo'), Latin);

    st.equal(node.position.start.offset, 0, 'should set starting offset');
    st.equal(node.position.end.offset, 3, 'should set ending offset');

    st.end();
  });

  t.end();
});

/* Fixtures. */
test('Fixtures', function (t) {
  fixtures
    .filter(negate(hidden))
    .forEach(function (fixture) {
      var filepath = join(ROOT, fixture);
      var output = read(join(filepath, 'output.json'), 'utf-8');
      var input = read(join(filepath, 'input.md'), 'utf-8');

      t.deepEqual(
        toNLCST(remark().parse(input), vfile(input), Latin),
        JSON.parse(output),
        'should work on `' + fixture + '`'
      );
    });

  t.end();
});
