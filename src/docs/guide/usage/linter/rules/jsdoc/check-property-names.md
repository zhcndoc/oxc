---
title: "jsdoc/check-property-names | Oxlint"
rule: "jsdoc/check-property-names"
category: "Correctness"
version: "0.2.18"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsdoc/check_property_names.rs`;
</script>

<RuleHeader />

### 作用

确保 JSDoc 中的属性名称在同一个块内不会重复，并且嵌套属性具有已定义的根属性。

### 为什么这很糟糕？

具有相同名称的 `@property` 标签可能会让人困惑，并且可能表明存在错误。

### 示例

此规则的**错误**代码示例：

```javascript
/**
 * @typedef {object} state
 * @property {number} foo
 * @property {string} foo
 */

/**
 * @typedef {object} state
 * @property {number} foo.bar
 */
```

此规则的**正确**代码示例：

```javascript
/**
 * @typedef {object} state
 * @property {number} foo
 */

/**
 * @typedef {object} state
 * @property {object} foo
 * @property {number} foo.bar
 */
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.18 中新增。

## 参考资料

<RuleReferences />
