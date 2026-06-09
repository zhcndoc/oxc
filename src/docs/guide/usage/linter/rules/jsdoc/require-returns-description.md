---
title: "jsdoc/require-returns-description | Oxlint"
rule: "jsdoc/require-returns-description"
category: "Pedantic"
version: "0.4.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/requireReturnsDescription.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsdoc/require_returns_description.rs`;
</script>

<RuleHeader />

### 它的作用

要求 `@returns` 标签带有描述。
如果返回值是 `void`、`undefined`，或者是 `Promise<void>` 或 `Promise<undefined>`，则不会报告该错误。

### 为什么这很糟糕？

`@returns` 标签应该有描述。

### 示例

以下是此规则的**错误**代码示例：

```javascript
/** @returns */
function quux(foo) {}
```

以下是此规则的**正确**代码示例：

```javascript
/** @returns Foo. */
function quux(foo) {}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.4.0 中添加。

## 参考资料

<RuleReferences />
