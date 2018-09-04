'use strict';

// Utils
const isEmpty = list =>
	list.length === 0;

const head = list =>
	list[0];

const init = list =>
	list.slice(0, -1);

const last = list =>
	list[list.length - 1];

const append = (list, item) =>
	[ ...list, item ];

const concatLast = (list, str) =>
	append(
		init(list),
		(last(list) || '') + str);

// Bracket-related functions
const isOpening = (char, brackets) =>
	brackets.some(x =>
		head(x) === char);

const isClosing = (char, brackets) =>
	brackets.some(x =>
		last(x) === char);

const openingToClosing = (char, brackets) =>
	last(brackets.find(x =>
		head(x) === char) || []);

// Main
const Splitter = (delimiter, brackets) =>
	({ stack, acc }, char) => {
		if (isOpening(char, brackets)) {
			return {
				acc: concatLast(acc, char),
				stack: append(stack, char)
			};
		}
		if (isClosing(char, brackets)) {
			if (
				isEmpty(stack) ||
				char !== openingToClosing(last(stack), brackets)
			) {
				throw new SyntaxError('Unexpected closing bracket: ' + char);
			}
			return {
				acc: concatLast(acc, char),
				stack: init(stack)
			};
		}
		if (char === delimiter) {
			if (isEmpty(stack)) {
				return {
					acc: append(acc, ''),
					stack
				};
			}
		}
		return {
			acc: concatLast(acc, char),
			stack
		};
	};

/**
 * Performs a bracket-aware string split.
 * @param {string} delimiter The delimiter to split by.
 * @param {string} str The string to split.
 * @param {Array<string[]>} [brackets] Override the default brackets: { } [ ].
 * @returns {string[]} The splitted string.
 */
const bracketSplit = (
	delimiter,
	str,
	brackets = [
		[ '{', '}' ],
		[ '[', ']' ]
	]
) => {
	const splitter = Splitter(delimiter, brackets);
	const result = str
		.split('')
		.reduce(splitter, {
			acc: [],
			stack: []
		});
	if (result.stack.length !== 0) {
		throw new SyntaxError('Unexpected end of input');
	}
	return result.acc;
};

module.exports = bracketSplit;
