# bracket-split

This module can do bracket-aware splitting of strings!

## Example:

```js
const bracketSplit = require('bracket-split');

bracketSplit(
	' ',
	'{ "status": "ok" } [ "status" ] 2 3')
//-> [ '{ "status": "ok" }', '[ "status" ]', '2', '3' ]
```

## Possible errors

```bash
Unexpected closing bracket: <closing bracket>
Unexpected end of input, expected: <quote or closing bracket>
```
