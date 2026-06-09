---
title: "jsdoc/require-yields-description | Oxlint"
rule: "jsdoc/require-yields-description"
category: "Style"
version: "1.68.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/requireYieldsDescription.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsdoc/require_yields_description.rs`;
</script>

<RuleHeader />

### 它的作用

要求 `@yields` 标签提供描述。

### 为什么这很糟糕？

`@yields` 标签应该说明生成器会产出什么。

### 示例

以下是此规则的**错误**代码示例：

```js
/**
 * @yields {string}
 */
function* quux() {
  yield "value";
}
```

以下是此规则的**正确**代码示例：

```js
/**
 * @yields {string} 下一个值。
 */
function* quux() {
  yield "value";
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则自 v1.68.0 起加入。

## 参考资料

<RuleReferences />
