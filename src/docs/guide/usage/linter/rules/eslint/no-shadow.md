---
title: "eslint/no-shadow | Oxlint"
rule: "eslint/no-shadow"
category: "Suspicious"
version: "1.48.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_shadow/mod.rs`;
</script>

<RuleHeader />

### 它的作用

禁止变量声明遮蔽外层作用域中已声明的变量。

### 为什么这不好？

遮蔽是指局部变量与其所在作用域中的某个变量同名的过程。
这可能会造成混淆，因为不清楚引用的是哪个变量，并且可能导致难以诊断的错误。

### 示例

以下是此规则的**错误**代码示例：

```js
var x = 1;
function foo() {
  var x = 2; // x 遮蔽了外层的 x
}
```

以下是此规则的**正确**代码示例：

```js
var x = 1;
function foo() {
  var y = 2; // 名称不同，没有遮蔽
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allow

type: `string[]`

default: `[]`

允许遮蔽的变量名列表。

### builtinGlobals

type: `boolean`

default: `false`

是否报告对内置全局变量的遮蔽。

### hoist

type: `"all" | "functions" | "functions-and-types" | "never" | "types"`

default: `"functions-and-types"`

控制检查遮蔽时如何处理提升。

#### `"all"`

即使在外层变量声明之前也报告遮蔽（由于提升）。

#### `"functions"`

只报告被提升的函数声明的遮蔽。

#### `"functions-and-types"`

同时报告被提升的函数声明和类型声明的遮蔽。

#### `"never"`

在外层变量声明之前从不报告遮蔽。

#### `"types"`

只报告被提升的类型声明的遮蔽。

### ignoreFunctionTypeParameterNameValueShadow

type: `boolean`

default: `true`

如果为 `true`，则在函数类型参数遮蔽了某个值时忽略。
示例：`const T = 1; function foo<T>() {}`

### ignoreOnInitialization

type: `boolean`

default: `false`

当被遮蔽的变量在推测仍未初始化时，是否忽略变量初始化器。

### ignoreTypeValueShadow

type: `boolean`

default: `true`

如果为 `true`，则在类型和值同名时忽略。
这在 TypeScript 中很常见：`type Foo = ...; const Foo = ...;`

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.48.0 中添加。

## 参考

<RuleReferences />
