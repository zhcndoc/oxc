---
title: "jsdoc/check-access | Oxlint"
rule: "jsdoc/check-access"
category: "Restriction"
version: "0.2.16"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsdoc/check_access.rs`;
</script>

<RuleHeader />

### 它的作用

检查 `@access` 标签是否使用以下值之一：

- "package"、"private"、"protected"、"public"

此外还会报告：

- 在同一个文档块中将 `@access` 与 `@public`、`@private`、`@protected` 或 `@package` 混用。
- 在同一个文档块中使用多个 `@access`（或 `@public` 等）实例。

### 这为什么不好？

在 JSDoc 注释中保持一种一致的方式来指定访问级别非常重要。使用无效的访问级别标签或多个访问级别标签会让人对文档元素预期的可见性产生混淆，并可能导致 API 文档生成中的不一致。混用不同的访问标签或使用无效值会使文档变得不清晰，并可能具有误导性。

### 示例

以下是此规则的**错误**代码示例：

```javascript
/** @access private @public */

/** @access invalidlevel */
```

以下是此规则的**正确**代码示例：

```javascript
/** @access private */

/** @private */
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.2.16 中添加。

## 参考资料

<RuleReferences />
