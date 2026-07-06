---
title: "eslint/sort-vars | Oxlint"
rule: "eslint/sort-vars"
category: "Pedantic"
version: "0.9.3"
default: false
type_aware: false
fix: "conditional_fix"
upstream: "https://eslint.org/docs/latest/rules/sort-vars"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/sort_vars.rs`;
</script>

<RuleHeader />

### 作用

强制对同一块作用域内的变量声明进行排序。

### 为什么这不好？

在同一块作用域内声明多个变量时，对变量名进行排序可以让以后更容易找到所需的变量。

未排序的变量声明会让代码更难阅读和维护。

### 示例

以下是此规则的**错误**代码示例：

```js
var b, a;
var a, B, c;
```

以下是此规则的**正确**代码示例：

```js
var a, b, c, d;
var B, a, c;
```

## Configuration

This rule accepts a configuration object containing the following properties:

### ignoreCase

type: `boolean`

default: `false`

When `true`, this rule will ignore case when sorting variables.

## 如何使用

<RuleHowToUse />

## 版本

此规则自 v0.9.3 起添加。

## 参考资料

<RuleReferences />
