---
title: "eslint/no-unused-expressions | Oxlint"
rule: "eslint/no-unused-expressions"
category: "正确性"
version: "0.14.0"
default: true
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-unused-expressions"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_unused_expressions.rs`;
</script>

<RuleHeader />

### 它的作用

此规则禁止未使用的表达式。

### 为什么这不好？

未使用的表达式通常是一个错误。它们可能是 bug 的症状，或者是对代码的误解。

### 示例

此规则的**错误**代码示例：

```ts
Set<number>;
1 as number;
window!;
```

此规则的**正确**代码示例：

```ts
const foo = new Set<number>();
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowShortCircuit

type: `boolean`

default: `false`

设置为 `true` 时，允许表达式中的短路求值。

### allowTaggedTemplates

type: `boolean`

default: `false`

设置为 `true` 时，允许表达式中的带标签模板字面量。

### allowTernary

type: `boolean`

default: `false`

设置为 `true` 时，允许表达式中的三元运算符。

### enforceForJSX

type: `boolean`

default: `false`

设置为 `true` 时，也会对未使用的 JSX 表达式强制执行此规则。

### ignoreDirectives

type: `boolean`

default: `false`

设置为 `true` 时，允许指令前导。

## How to use

<RuleHowToUse />

## 版本

此规则在 v0.14.0 中添加。

## 参考资料

<RuleReferences />
