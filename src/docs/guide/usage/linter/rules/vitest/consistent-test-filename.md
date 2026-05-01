---
title: "vitest/consistent-test-filename"
category: "Style"
version: "1.36.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/consistent_test_filename.rs`;
</script>

<RuleHeader />

### 它的作用

当文件被视为测试文件，但其名称不符合预期的文件名格式时，此规则会触发错误。

### 为什么这很糟糕？

作为测试的文件如果文件名不符合预期，会很难区分源代码文件和测试文件。

### 示例

对于按 `{"allTestPattern": "__tests__",  "pattern": ".*\.spec\.ts$"}` 配置的此规则，一个**不正确**的文件路径示例是：

`__tests__/2.ts`

对于按 `{"allTestPattern": "__tests__",  "pattern": ".*\.spec\.ts$"}` 配置的此规则，一个**正确**的文件路径示例是：

`__tests__/2.spec.ts`

## 配置

此规则接受一个包含以下属性的配置对象：

### allTestPattern

type: `string`

用于确保我们只对测试文件名进行 lint 的正则表达式模式。
用于判断一个文件是否为测试文件。

### pattern

type: `string`

用于检查测试文件名是否具有有效格式的必需正则表达式。
该模式没有默认值，您必须提供一个。

## 使用方法

<RuleHowToUse />

## 版本

此规则于 v1.36.0 中添加。

## 参考资料

<RuleReferences />
