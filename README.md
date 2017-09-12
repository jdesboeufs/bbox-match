# bbox-match

[![npm version](https://badge.fury.io/js/bbox-match.svg)](https://badge.fury.io/js/bbox-match)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

Just match bboxes.

INITIAL AND NAIVE IMPLEMENTATION

## Installation

```
npm install bbox-match
```

## Usage

```js
const bboxMatch = require('bbox-match')

const match = bboxMatch([
  { name: 'A', bbox: [0, 0, 1, 1] },
  { name: 'B', bbox: [0.5, 0.5, 2, 2] }
])

console.log(match([0.1, 0.1, 1.05, 1.05]).name)
// => 'A'
```

## License

MIT
