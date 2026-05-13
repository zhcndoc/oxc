---
title: "eslint/prefer-const | Oxlint"
rule: "eslint/prefer-const"
category: "Style"
version: "1.43.0"
default: false
type_aware: false
fix: "conditional_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/prefer_const.rs`;
</script>

<RuleHeader />

### 作用

要求对在初始声明后从未被重新赋值的变量使用 `const` 声明。

### 为什么这不好？

如果一个变量从未被重新赋值，使用 `const` 声明会更好。
`const` 声明会告诉读者：“这个变量从未被重新赋值”，从而减少认知负担并提高可维护性。

### 示例

以下是此规则的**错误**代码示例：

```js
let a = 3;
console.log(a);

let b;
b = 0;
console.log(b);

for (let i in [1, 2, 3]) {
  console.log(i);
}
```

以下是此规则的**正确**代码示例：

```js
const a = 0;

let a;
a = 0;
a = 1;

let a;
if (true) {
  a = 0;
}

for (const i in [1, 2, 3]) {
  console.log(i);
}
```

## 配置

### destructuring

type: `"any" | "all"`

配置解构赋值的处理方式。

#### `"any"`

如果解构赋值中的任意变量应当使用 `const`，则发出警告。

#### `"all"`

仅当解构赋值中的所有变量都应当使用 `const` 时才发出警告。否则，忽略它们。

### ignoreReadBeforeAssign

type: `boolean`

default: `false`

如果为 `true`，该规则将不会报告在初始赋值之前被读取的变量。
这主要用于防止与 `typescript/no-use-before-define` 规则冲突。

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v1.43.0 中添加的。

## 参考

<RuleReferences />
