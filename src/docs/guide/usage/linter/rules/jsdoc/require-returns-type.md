---
title: "jsdoc/require-returns-type | Oxlint"
rule: "jsdoc/require-returns-type"
category: "Pedantic"
version: "0.4.3"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/requireReturnsType.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsdoc/require_returns_type.rs`;
</script>

<RuleHeader />

### 它的作用

要求 `@returns` 标签具有类型值（用花括号包裹）。

### 为什么这不好？

`@returns` 标签应当具有类型值。

### 示例

以下是此规则的**错误**代码示例：

```javascript
/** @returns */
function quux(foo) {}
```

以下是此规则的**正确**代码示例：

```javascript
/** @returns {string} */
function quux(foo) {}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.4.3 中加入。

## 参考资料

<RuleReferences />
