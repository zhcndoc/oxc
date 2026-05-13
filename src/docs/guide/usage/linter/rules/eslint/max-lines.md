---
title: "eslint/max-lines | Oxlint"
rule: "eslint/max-lines"
category: "Pedantic"
version: "0.2.14"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/max_lines.rs`;
</script>

<RuleHeader />

### 作用

强制限制每个文件的最大行数。

### 为什么不好？

有些人认为大文件是一种代码异味。大文件往往包含过多功能，导致难以理解代码逻辑。虽然文件中可接受的最大行数没有客观标准，但大多数人会同意不应达到数千行。建议通常在 100 到 500 行之间。

## 配置

此规则接受一个包含以下属性的配置对象：

### max

type: `integer`

default: `300`

每个文件允许的最大行数。

### skipBlankLines

type: `boolean`

default: `false`

计数时是否忽略空行。

### skipComments

type: `boolean`

default: `false`

计数时是否忽略注释。

## 使用方法

<RuleHowToUse />

## 版本

此规则已在 v0.2.14 中添加。

## 参考资料

<RuleReferences />
