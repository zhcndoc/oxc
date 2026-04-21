---
title: "eslint/id-length"
category: "风格"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/id_length.rs`;
</script>

<RuleHeader />

### 作用

此规则通过计算给定标识符的字素（graphemes）数量来强制实施最小和/或最大标识符长度约定。

### 为什么不好？

非常短的标识符名称（如 e, x, \_t）或非常长的名称（如 hashGeneratorResultOutputContainerObject）会使代码更难阅读，并且可能降低可维护性。为了防止这种情况，可以强制实施最小和/或最大标识符长度。

### 示例

此规则 **错误** 代码示例：

```js
/* id-length: "error" */ // 默认是最小 2 个字符 ({ "min": 2 })

const x = 5;
obj.e = document.body;
const foo = function (e) {};
try {
  dangerousStuff();
} catch (e) {
  // 忽略，就像许多人做的那样
}
const myObj = { a: 1 };
(a) => {
  a * a;
};
class y {}
class Foo {
  x() {}
}
class Bar {
  #x() {}
}
class Baz {
  x = 1;
}
class Qux {
  #x = 1;
}
function bar(...x) {}
function baz([x]) {}
const [z] = arr;
const {
  prop: [i],
} = {};
function qux({ x }) {}
const { j } = {};
const { prop: a } = {};
({ prop: obj.x } = {});
```

此规则 **正确** 代码示例：

```js
/* id-length: "error" */ // 默认是最小 2 个字符 ({ "min": 2 })

const num = 5;
function _f() {
  return 42;
}
function _func() {
  return 42;
}
obj.el = document.body;
const foo = function (evt) {
  /* 做一些事情 */
};
try {
  dangerousStuff();
} catch (error) {
  // 忽略，就像许多人做的那样
}
const myObj = { apple: 1 };
(num) => {
  num * num;
};
function bar(num = 0) {}
class MyClass {}
class Foo {
  method() {}
}
class Bar {
  #method() {}
}
class Baz {
  field = 1;
}
class Qux {
  #field = 1;
}
function baz(...args) {}
function qux([longName]) {}
const { prop } = {};
const {
  prop: [name],
} = {};
const [longName] = arr;
function foobar({ prop }) {}
function foobaz({ a: prop }) {}
const { a: property } = {};
({ prop: obj.longName } = {});
const data = { x: 1 }; // 因为有引号而豁免
data["y"] = 3; // 因为计算属性访问而豁免
```

## 配置

此规则接受一个具有以下属性的配置对象：

### checkGeneric

type: `boolean`

default: `true`

是否检查 TypeScript 泛型类型参数名称。
默认为 `true`。

### exceptionPatterns

type: `string[]`

要从规则中排除的标识符的正则表达式模式数组。
例如，`["^x.*"]` 将排除所有以 "x" 开头的标识符。

### exceptions

type: `string[]`

default: `[]`

要从规则中排除的标识符名称数组。
例如，`["x", "y", "z"]` 将允许单字母标识符 "x"、"y" 和 "z"。

### max

type: `integer`

default: `18446744073709551615`

标识符中允许的最大字素数量。
默认为无最大值（实际上无限）。

### min

type: `integer`

default: `2`

标识符中所需的最小字素数量。

### properties

type: `"always" | "never"`

default: `"always"`

是否检查属性名长度。

#### `"always"`

属性名与其他标识符一样被检查。

#### `"never"`

属性名不会被检查长度。

## 如何使用

<RuleHowToUse />

## 参考

<RuleReferences />
