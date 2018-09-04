'use strict';

const assert = require('assert');

const bracketSplit = require('.');

const input = '{ "status": "ok" } [ "status" ] 2 3';
const output = [ '{ "status": "ok" }', '[ "status" ]', '2', '3' ];

assert.deepStrictEqual(bracketSplit(' ', input), output);

console.log(input);
console.log(output.map(x =>
	JSON.parse(x)));


const quoteInput = '[ "}" ]';
const quoteOutput = [ '[ "}" ]' ];

assert.deepStrictEqual(bracketSplit(' ', quoteInput), quoteOutput);

console.log(quoteInput);
console.log(quoteOutput.map(x =>
	JSON.parse(x)));


const escapeInput = '[ \\} ]';
const escapeOutput = [ '[ \\} ]' ];

assert.deepStrictEqual(bracketSplit(' ', escapeInput), escapeOutput);

console.log(escapeInput);
console.log(escapeOutput);
