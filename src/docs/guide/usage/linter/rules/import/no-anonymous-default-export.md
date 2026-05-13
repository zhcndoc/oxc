---
title: "import/no-anonymous-default-export | Oxlint"
rule: "import/no-anonymous-default-export"
category: "样式"
version: "0.15.14"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/no_anonymous_default_export.rs`;
</script>

<RuleHeader />

### 它的作用

如果模块的默认导出没有名称，则会报告。
这包括几种无名的数据类型；
字面量、对象表达式、数组、匿名函数、箭头函数，
以及匿名类声明。

### 为什么这不好？

确保默认导出具有名称，有助于提升
代码库的可 grep 性，因为它鼓励在
模块默认导出的声明位置和导入位置重复使用同一个标识符。

### 示例

此规则的**错误**代码示例：

```js
export default [];
export default () => {};
export default class {};
export default function() {};
export default foo(bar);
export default 123;
export default {};
export default new Foo();
export default `foo`;
export default /^123/;
```

此规则的**正确**代码示例：

```js
const foo = 123;
export default foo;
export default function foo() {};
export default class MyClass {};
export default function foo() {};
export default foo(bar);
/* import/no-anonymous-default-export: ["error", { "allowLiteral": true }] */
export default 123;
/* import/no-anonymous-default-export: ["error", { "allowArray": true }] */
export default []
/* import/no-anonymous-default-export: ["error", { "allowArrowFunction": true }] */
export default () => {};
/* import/no-anonymous-default-export: ["error", { "allowAnonymousClass": true }] */
export default class {};
/* import/no-anonymous-default-export: ["error", { "allowAnonymousFunction": true }] */
export default function() {};
/* import/no-anonymous-default-export: ["error", { "allowObject": true }] */
export default {};
/* import/no-anonymous-default-export: ["error", { "allowNew": true }] */
export default new Foo();
/* import/no-anonymous-default-export: ["error", { "allowCallExpression": true }] */
export default foo(bar);
```

默认情况下，所有类型的匿名默认导出都被禁止，
但可以通过在选项中启用它们来有选择地允许任意类型。

## 配置

此规则接受一个具有以下属性的配置对象：

### allowAnonymousClass

type: `boolean`

default: `false`

允许将匿名类作为默认导出。

### allowAnonymousFunction

type: `boolean`

default: `false`

允许将匿名函数作为默认导出。

### allowArray

type: `boolean`

default: `false`

允许将匿名数组作为默认导出。

### allowArrowFunction

type: `boolean`

default: `false`

允许将匿名箭头函数作为默认导出。

### allowCallExpression

type: `boolean`

default: `true`

允许将匿名调用表达式作为默认导出。

### allowLiteral

type: `boolean`

default: `false`

允许将匿名字面量作为默认导出。

### allowNew

type: `boolean`

default: `false`

允许将匿名 new 表达式作为默认导出。

### allowObject

type: `boolean`

default: `false`

允许将匿名对象作为默认导出。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.15.14 中添加。

## 参考

<RuleReferences />
