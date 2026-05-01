---
title: "eslint/no-empty-pattern"
category: "Correctness"
version: "0.0.3"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_empty_pattern.rs`;
</script>

<RuleHeader />

### 作用

禁止空解构模式。

### 为什么不好？

使用解构时，可能会创建一个无效的模式。
当在大括号内嵌对象解构模式的右侧使用空花括号时，就会发生这种情况，例如：

```JavaScript
// 不创建任何变量
var {a: {}} = foo;
```

在此代码中，不会创建新变量，因为 a 只是一个位置辅助，而 `{}` 应该包含要创建的变量，例如：

```JavaScript
// 创建变量 b
var {a: { b }} = foo;
```

在许多情况下，空对象模式是一个错误，作者本意是使用默认值，例如：

```JavaScript
// 创建变量 a
var {a = {}} = foo;
```

这两种模式之间的区别很微妙，尤其是有问题的空模式看起来就像对象字面量。

### 此规则的 **错误** 代码示例：

```JavaScript
var {} = foo;
var [] = foo;
var {a: {}} = foo;
var {a: []} = foo;
function foo({}) {}
function foo([]) {}
function foo({a: {}}) {}
function foo({a: []}) {}
```

### 此规则的 **正确** 代码示例：

```JavaScript
var {a = {}} = foo;
var {a = []} = foo;
function foo({a = {}}) {}
function foo({a = []}) {}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowObjectPatternsAsParameters

type: `boolean`

default: `false`

设置为 `true` 时，此规则允许直接作为函数参数使用的空对象模式，包括默认值为空对象字面量的参数。

## 如何使用

<RuleHowToUse />

## Version

此规则于 v0.0.3 中添加。

## References

<RuleReferences />
