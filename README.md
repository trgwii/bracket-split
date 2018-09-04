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
