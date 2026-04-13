---
title: "eslint/func-style"
category: "风格"
default: false
type_aware: false
fix: "待处理"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/func_style.rs`;
</script>

<RuleHeader />

### 作用

强制一致地使用函数声明或赋值给变量的表达式。

### 为什么不好？

此规则强制使用特定类型的函数风格，要么是函数声明，要么是赋值给变量的表达式。
你可以在配置中指定你偏好哪种。

### 示例

```js
// 函数声明
function doSomething() {
  // ...
}

// 赋值给变量的箭头函数表达式
const doSomethingElse = () => {
  // ...
};

// 赋值给变量的函数表达式
const doSomethingAgain = function () {
  // ...
};
```

使用默认 `"expression"` 选项时，此规则 **错误** 代码的示例：

```js
/* func-style: ["error", "expression"] */

function foo() {
  // ...
}
```

使用 `"declaration"` 选项时，此规则 **错误** 代码的示例：

```js
/* func-style: ["error", "declaration"] */
var foo = function () {
  // ...
};

var foo = () => {};
```

使用 `"declaration"` 和 `{"overrides": { "namedExports": "expression" }}` 选项时，此规则 **错误** 代码的示例：

```js
/* func-style: ["error", "declaration", { "overrides": { "namedExports": "expression" } }] */
export function foo() {
  // ...
}
```

使用 `"expression"` 和 `{"overrides": { "namedExports": "declaration" }}` 选项时，此规则 **错误** 代码的示例：

```js
/* func-style: ["error", "expression", { "overrides": { "namedExports": "declaration" } }] */
export var foo = function () {
  // ...
};

export var bar = () => {};
```

使用默认 `"expression"` 选项时，此规则 **正确** 代码的示例：

```js
/* func-style: ["error", "expression"] */
var foo = function () {
  // ...
};
```

使用 `"declaration"` 选项时，此规则 **正确** 代码的示例：

```js
/* func-style: ["error", "declaration"] */
function foo() {
  // ...
}
// 方法（赋值给对象的函数）不受此规则检查
SomeObject.foo = function () {
  // ...
};
```

使用 `"declaration"`, `{ "allowArrowFunctions": true }` 选项时，此规则的其他正确代码示例：

```js
/* func-style: ["error", "declaration", { "allowArrowFunctions": true }] */
var foo = () => {};
```

使用 `"declaration"` 和 `{"overrides": { "namedExports": "expression" }}` 选项时，此规则 **正确** 代码的示例：

```js
/* func-style: ["error", "declaration", { "overrides": { "namedExports": "expression" } }] */
export var foo = function () {
  // ...
};
export var bar = () => {};
```

使用 `"expression"` 和 `{"overrides": { "namedExports": "declaration" }}` 选项时，此规则 **正确** 代码的示例：

```js
/* func-style: ["error", "expression", { "overrides": { "namedExports": "declaration" } }] */
export function foo() {
  // ...
}
```

使用 `{"overrides": { "namedExports": "ignore" }}` 选项时，此规则 **正确** 代码的示例：

```js
/* func-style: ["error", "expression", { "overrides": { "namedExports": "ignore" } }] */
export var foo = function () {
  // ...
};

export var bar = () => {};
export function baz() {
  // ...
}
```

## 配置

### 第 1 个选项

type: `"expression" | "declaration"`

### 第 2 个选项

此选项是一个包含以下属性的对象：

#### allowArrowFunctions

type: `boolean`

default: `false`

当为 true 时，无论风格设置如何，都允许箭头函数。

#### allowTypeAnnotation

type: `boolean`

default: `false`

当为 true 时，无论风格设置如何，都允许带有类型注解的函数。

#### overrides

type: `object`

##### overrides.namedExports

type: `"ignore" | "expression" | "declaration"`

default: `null`

## 如何使用

<RuleHowToUse />

## 参考

<RuleReferences />
