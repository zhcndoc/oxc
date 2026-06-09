---
title: "jsdoc/require-yields | Oxlint"
rule: "jsdoc/require-yields"
category: "Correctness"
version: "0.3.2"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/requireYields.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsdoc/require_yields.rs`;
</script>

<RuleHeader />

### 它的作用

要求记录 yields。
如果存在多个 `@yields` 标签，也会报告。

### 为什么这不好？

该规则旨在防止在需要 `@yields` 标签时遗漏它们。

### 示例

此规则的**错误**代码示例：

```javascript
function* quux(foo) {
  yield foo;
}

/**
 * @yields {undefined}
 * @yields {void}
 */
function* quux(foo) {}
```

此规则的**正确**代码示例：

```javascript
/** * @yields Foo */
function* quux(foo) {
  yield foo;
}
```

## 配置

此规则接受一个具有以下属性的配置对象：

### exemptedBy

type: `string[]`

default: `["inheritdoc"]`

带有这些标签的函数将被此 lint 规则豁免。

### forceRequireYields

type: `boolean`

default: `false`

当为 `true` 时，所有生成器函数都必须有 `@yields` 标签，即使它们不产出值或主体为空。

### withGeneratorTag

type: `boolean`

default: `false`

当为 `true` 时，在存在 `@generator` 标签时要求提供 `@yields`。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.3.2 中添加。

## 参考

<RuleReferences />
