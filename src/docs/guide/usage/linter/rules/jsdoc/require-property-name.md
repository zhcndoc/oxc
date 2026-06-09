---
title: "jsdoc/require-property-name | Oxlint"
rule: "jsdoc/require-property-name"
category: "Correctness"
version: "0.2.18"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/requirePropertyName.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsdoc/require_property_name.rs`;
</script>

<RuleHeader />

### 它的作用

要求所有 `@property` 标签都包含名称。

### 为什么这不好？

属性类型的名称应该被记录下来。

### 示例

此规则的**错误**代码示例：

```javascript
/**
 * @typedef {SomeType} SomeTypedef
 * @property {number}
 */
```

此规则的**正确**代码示例：

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

## 参考

<RuleReferences />
