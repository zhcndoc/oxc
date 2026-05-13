---
title: "jsdoc/require-property-description | Oxlint"
rule: "jsdoc/require-property-description"
category: "Correctness"
version: "0.2.18"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsdoc/require_property_description.rs`;
</script>

<RuleHeader />

### 功能说明

要求所有 `@property` 标签都包含描述。

### 为什么这很糟糕？

属性的描述应该被记录下来。

### 示例

以下是此规则的**错误**代码示例：

```javascript
/**
 * @typedef {SomeType} SomeTypedef
 * @property {number} foo
 */
```

以下是此规则的**正确**代码示例：

```javascript
/**
 * @typedef {SomeType} SomeTypedef
 * @property {number} foo Foo.
 */
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.18 中添加。

## 参考资料

<RuleReferences />
