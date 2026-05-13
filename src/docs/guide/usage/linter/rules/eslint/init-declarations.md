---
title: "eslint/init-declarations | Oxlint"
rule: "eslint/init-declarations"
category: "Style"
version: "0.15.11"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/init_declarations.rs`;
</script>

<RuleHeader />

### 作用

要求或禁止在变量声明中进行初始化。

### 为什么不好？

在 JavaScript 中，变量可以在声明时赋值，也可以在之后的任何时间点使用赋值语句进行赋值。
例如，在以下代码中，`foo` 在声明时初始化，而 `bar` 在之后初始化。

```js
var foo = 1;
var bar;
if (foo) {
  bar = 1;
} else {
  bar = 2;
}
```

### 示例

默认 `"always"` 选项的错误代码示例：

```js
/* init-declarations: ["error", "always"] */
function foo() {
  var bar;
  let baz;
}
```

`"never"` 选项的错误代码示例：

```js
/* init-declarations: ["error", "never"] */
function foo() {
  var bar = 1;
  let baz = 2;
  for (var i = 0; i < 1; i++) {}
}
```

默认 `"always"` 选项的正确代码示例：

```js
/* init-declarations: ["error", "always"] */

function foo() {
  var bar = 1;
  let baz = 2;
  const qux = 3;
}
```

`"never"` 选项的正确代码示例：

```js
/* init-declarations: ["error", "never"] */

function foo() {
  var bar;
  let baz;
  const buzz = 1;
}
```

`"never", { "ignoreForLoopInit": true }` 选项的正确代码示例：

```js
/* init-declarations: ["error", "never", { "ignoreForLoopInit": true }] */
for (var i = 0; i < 1; i++) {}
```

## 配置

### 第一个选项

类型：`"always" | "never"`

#### `"always"`

要求变量在声明时初始化。这是默认行为。

#### `"never"`

禁止在声明时初始化。

### 第二个选项

此选项是一个对象，包含以下属性：

#### ignoreForLoopInit

类型：`boolean`

默认值：`false`

当设置为 `true` 时，允许在 `for`、`for-in` 和 `for-of` 循环的初始化表达式中使用未初始化的变量。
仅在模式设置为 `"never"` 时适用。

## 如何使用

<RuleHowToUse />

## 版本

该规则在 v0.15.11 中新增。

## 参考资料

<RuleReferences />
