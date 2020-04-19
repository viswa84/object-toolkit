# object-toolkit

A simple javascript object toolkit.

This package is combines several popular object-related libraries and utilities.

## Installation

```sh
yarn add object-toolkit

# or

npm install --save object-toolkit
```

## Usage

### Operations

```js
import { set, get, remove, merge } from "object-toolkit";

const obj = { name: "Sage" };
set(obj, "age", 20);
console.log(obj); //=> { name: "Sage", age: 20 }

const age = get(obj, "age");
console.log(age); //=> 20

remove(obj, name);
console.log(obj); //=> { age: 20 }

const obj1 = { a: 1, b: 4 };
const obj2 = { a: 4, c: 5 };
const merged = merge(obj1, obj2);
console.log(merged); //=> { a: 4, b: 4, c: 5 }
```

### Loops

```js
import { map, forEach, filter, omit } from "object-toolkit";
```

## Assertion

```js
import { isObject } from "object-toolkit";
```

## Credits

- Jon (https://github.com/jonschlinkert)
- Josh (https://github.com/TehShrike/deepmerge)
