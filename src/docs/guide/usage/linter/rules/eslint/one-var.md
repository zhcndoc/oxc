---
title: "eslint/one-var | Oxlint"
rule: "eslint/one-var"
category: "样式"
version: "1.78.0"
default: false
type_aware: false
fix: "conditional_fix"
upstream: "https://eslint.org/docs/latest/rules/one-var"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/one_var.rs`;
</script>

<RuleHeader />

### 作用

强制变量以合并或分开的方式进行声明。

### 为什么这不好？

一致的声明分组方式可以让变量生命周期和初始化模式更易于浏览。此规则可以要求每个作用域使用一个声明、每条语句使用一个声明器，或仅对连续的声明进行分组。

### 示例

此规则的**错误**代码示例：

```js
var foo = 1;
var bar = 2;
```

此规则的**正确**代码示例：

```js
var foo = 1,
  bar = 2;
```

## 配置

强制变量声明采用一致的分组方式。

类型：`object`

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.78.0 中新增。

## 参考

<RuleReferences />
