---
title: "eslint/eqeqeq | Oxlint"
rule: "eslint/eqeqeq"
category: "Pedantic"
version: "0.0.3"
default: false
type_aware: false
fix: "conditional_dangerous_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/eqeqeq.rs`;
</script>

<RuleHeader />

### 作用

要求使用 `===` 和 `!==` 运算符，禁止使用 `==` 和 `!=`。

### 为什么不好？

使用非严格相等运算符会导致因类型转换而产生意外行为，从而引发难以发现的 bug。

### 示例

JSON 配置示例：

```json
{
  "eqeqeq": ["error", "always", { "null": "ignore" }]
}
```

#### `"always"`（默认）

此规则 **错误** 代码示例：

```js
/* eqeqeq: "error" */

if (x == 42) {
}
if ("" == text) {
}
if (obj.getStuff() != undefined) {
}
```

此规则 **正确** 代码示例：

```js
/* eqeqeq: "error" */

if (x === 42) {
}
if ("" === text) {
}
if (obj.getStuff() !== undefined) {
}
```

#### `"smart"`

使用 `"smart"` 选项时，此规则 **错误** 代码示例：

```js
/* eqeqeq: ["error", "smart"] */

if (x == 42) {
}
if ("" == text) {
}
```

使用 `"smart"` 选项时，此规则 **正确** 代码示例：

```js
/* eqeqeq: ["error", "smart"] */

if (typeof foo == "undefined") {
}
if (foo == null) {
}
if (foo != null) {
}
```

#### `{"null": "ignore"}`（首个选项为 `"always"` 时）

使用 `{ "null": "ignore" }` 选项时，此规则 **错误** 代码示例：

```js
/* eqeqeq: ["error", "always", { "null": "ignore" }] */
if (x == 42) {
}
if ("" == text) {
}
```

使用 `{ "null": "ignore" }` 选项时，此规则 **正确** 代码示例：

```js
/* eqeqeq: ["error", "always", { "null": "ignore" }] */
if (foo == null) {
}
if (foo != null) {
}
```

#### `{"null": "always"}`（默认 - 首个选项为 `"always"` 时）

使用 `{ "null": "always" }` 选项时，此规则 **错误** 代码示例：

```js
/* eqeqeq: ["error", "always", { "null": "always" }] */

if (foo == null) {
}
if (foo != null) {
}
```

使用 `{ "null": "always" }` 选项时，此规则 **正确** 代码示例：

```js
/* eqeqeq: ["error", "always", { "null": "always" }] */

if (foo === null) {
}
if (foo !== null) {
}
```

#### `{"null": "never"}`（首个选项为 `"always"` 时）

使用 `{ "null": "never" }` 选项时，此规则 **错误** 代码示例：

```js
/* eqeqeq: ["error", "always", { "null": "never" }] */

if (x == 42) {
}
if ("" == text) {
}
if (foo === null) {
}
if (foo !== null) {
}
```

使用 `{ "null": "never" }` 选项时，此规则 **正确** 代码示例：

```js
/* eqeqeq: ["error", "always", { "null": "never" }] */

if (x === 42) {
}
if ("" === text) {
}
if (foo == null) {
}
if (foo != null) {
}
```

## 配置

### 第 1 个选项

类型：`"always" | "smart"`

#### `"always"`

始终要求三重相等比较，`===`/`!==`。
这是默认值。

#### `"smart"`

允许某些安全的比较使用 `==`/`!=`（`typeof`、字面量、空值）。

### 第 2 个选项

此选项是一个包含以下属性的对象：

#### null

类型：`"always" | "never" | "ignore"`

对于是否允许/禁止与 `null` 进行比较的配置，
例如 `foo == null` 或 `foo != null`

##### `"always"`

与 null 比较时始终要求三重相等，`=== null`/`!== null`。
这是默认值。

##### `"never"`

与 null 比较时从不要求三重相等，始终使用 `== null`/`!= null`。

##### `"ignore"`

忽略 null 比较，允许使用 `== null`/`!= null` 或 `=== null`/`!== null`。

## 如何使用

<RuleHowToUse />

## 版本

该规则是在 v0.0.3 中添加的。

## 参考

<RuleReferences />
