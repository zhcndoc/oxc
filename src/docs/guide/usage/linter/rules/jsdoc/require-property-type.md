---
title: "jsdoc/require-property-type | Oxlint"
rule: "jsdoc/require-property-type"
category: "Correctness"
version: "0.2.18"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsdoc/require_property_type.rs`;
</script>

<RuleHeader />

### 它的作用

要求每个 `@property` 标签都具有类型值（在花括号内）。

### 为什么这很糟糕？

属性的类型应当被文档化。

### 示例

以下是此规则的**不正确**代码示例：

```javascript
/**
 * @typedef {SomeType} SomeTypedef
 * @property foo
 */
```

以下是此规则的**正确**代码示例：

```javascript
/**
 * @typedef {SomeType} SomeTypedef
 * @property {number} foo
 */
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.18 中添加。

## 参考资料

<RuleReferences />
