---
title: "eslint/yoda | Oxlint"
rule: "eslint/yoda"
category: "Style"
version: "0.14.1"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://eslint.org/docs/latest/rules/yoda"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/yoda.rs`;
</script>

<RuleHeader />

### 它的作用

要求或禁止“尤达式”条件。此规则旨在强制统一比较变量与字面量值时的条件风格。

### 为什么这不好？

之所以称为尤达式条件，是因为条件中的字面量值排在前面，而变量排在后面。例如，下面就是一个尤达式条件：

```js
if ("red" === color) {
}
```

之所以称其为尤达式条件，是因为它读起来像“如果红色等于颜色”，类似《星球大战》角色尤达的说话方式。再比较一下另一种安排操作数的方式：

```js
if (color === "red") {
  // ...
}
```

这通常读起来像“如果颜色等于红色”，这无疑是一种更自然的比较描述方式。
尤达式条件的支持者强调，错误地把 `=` 写成 `==` 是不可能的，因为你不能把值赋给字面量。这样做会导致语法错误，并且会让你尽早发现这个错误。因此，在早期编程中，由于当时还没有可用的工具，这种做法非常常见。
尤达式条件的反对者指出，工具已经让我们成为更好的程序员，因为工具会捕获把 `=` 误写成 `==` 的错误（ESLint 会帮你检查出来）。因此，他们认为，这种模式带来的收益并不足以抵消使用尤达式条件时对可读性的影响。

### 示例

#### never

默认 `"never"` 选项的**错误**代码示例：

```js
if ("red" === color) {
  // ...
}
if (`red` === color) {
  // ...
}
if (`red` === `${color}`) {
  // ...
}

if (true == flag) {
  // ...
}

if (0 <= x && x < 1) {
  // ...
}
```

默认 `"never"` 选项的**正确**代码示例：

```js
if (5 & value) {
  // ...
}

if (value === "red") {
  // ...
}

if (value === `red`) {
  // ...
}

if (`${value}` === `red`) {
}
```

#### exceptRange

`"never", { "exceptRange": true }` 选项的**正确**代码示例：

```js
function isReddish(color) {
  return color.hue < 60 || 300 < color.hue;
}

if (x < -1 || 1 < x) {
  // ...
}

if (count < 10 && 0 <= rand && rand < 1) {
  // ...
}

if (`blue` < x && x < `green`) {
  // ...
}

function howLong(arr) {
  return 0 <= arr.length && arr.length < 10 ? "short" : "long";
}
```

#### onlyEquality

`"never", { "onlyEquality": true }` 选项的**正确**代码示例：

```js
if (x < -1 || 9 < x) {
}

if (x !== "foo" && "bar" != x) {
}

if (x !== `foo` && `bar` != x) {
}
```

#### always

`"always"` 选项的**错误**代码示例：

```js
if (color == "blue") {
  // ...
}

if (color == `blue`) {
  // ...
}
```

`"always"` 选项的**正确**代码示例：

```js
if ("blue" == value) {
  // ...
}

if (`blue` == value) {
  // ...
}

if (`blue` == `${value}`) {
  // ...
}

if (-1 < str.indexOf(substr)) {
  // ...
}
```

## 配置

### 第 1 个选项

type: `"never" | "always"`

#### `"never"`

默认的 `"never"` 选项可以在对象字面量中通过 `exceptRange` 和 `onlyEquality` 配置例外选项。

#### `"always"`

`"always"` 选项要求在比较中，字面量值必须始终放在前面。

### 第 2 个选项

此选项是一个包含以下属性的对象：

#### exceptRange

type: `boolean`

default: `false`

如果 `"exceptRange"` 属性为 `true`，则该规则允许
在直接用括号包裹的范围比较中使用 Yoda 条件，包括 `if` 或 `while` 条件的括号。
“范围”比较用于测试某个变量是否位于两个字面量值之间的范围内或范围外。

#### onlyEquality

type: `boolean`

default: `false`

如果 `"onlyEquality"` 属性为 `true`，则该规则仅对相等运算符 `==` 和 `===` 报告 Yoda
条件。`onlyEquality`
选项允许的例外是 `exceptRange` 允许的超集，因此这两个选项不适合一起使用。

## 如何使用

<RuleHowToUse />

## Version

This rule was added in v0.14.1.

## 参考资料

<RuleReferences />
