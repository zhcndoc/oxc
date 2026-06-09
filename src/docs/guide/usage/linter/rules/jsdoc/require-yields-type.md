---
title: "jsdoc/require-yields-type | Oxlint"
rule: "jsdoc/require-yields-type"
category: "严谨"
version: "1.65.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/requireYieldsType.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsdoc/require_yields_type.rs`;
</script>

<RuleHeader />

### 它的作用

要求 `@yields` 标签带有类型。

### 为什么这不好？

`@yields` 标签应当记录生成器产出的类型。

### 示例

以下是此规则的**错误**代码示例：

```js
/** @yields */
function* quux() {}
```

以下是此规则的**正确**代码示例：

```js
/** @yields {string} */
function* quux() {}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v1.65.0 中添加。

## 参考资料

<RuleReferences />
