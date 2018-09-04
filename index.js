'use strict';

// Utils
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

// Main
const Splitter = (delimiter, brackets) => {

	// Bracket-related functions
	const isOpening = char =>
		brackets.some(x =>
			head(x) === char);

	const isClosing = char =>
		brackets.some(x =>
			last(x) === char);

	const openingToClosing = char =>
		(brackets.find(x =>
			x[0] === char) || [])[1];

	return ({ stack, acc }, char) => {
		if (isOpening(char)) {
			return {
				stack: append(stack, char),
				acc: concatLast(acc, char)
			};
		}
		if (isClosing(char)) {
			if (stack.length === 0 || char !== openingToClosing(last(stack))) {
				throw new SyntaxError('Unexpected closing bracket: ' + char);
			}
			return {
				stack: init(stack),
				acc: concatLast(acc, char)
			};
		}
		if (char === delimiter) {
			if (stack.length === 0) {
				return {
					stack,
					acc: append(acc, '')
				};
			}
		}
		return {
			stack,
			acc: concatLast(acc, char)
		};
	};
};

// Reducer
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
			stack: [],
			acc: []
		});
	if (result.stack.length !== 0) {
		throw new SyntaxError('Unexpected end of input');
	}
	return result.acc;
};

module.exports = bracketSplit;
