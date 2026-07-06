---
title: "jsdoc/require-param-type | Oxlint"
rule: "jsdoc/require-param-type"
category: "Pedantic"
version: "0.4.4"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/requireParamType.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsdoc/require_param_type.rs`;
</script>

<RuleHeader />

### 作用

要求每个 `@param` 标签都有类型值（用花括号括起来）。

### 为什么这不好？

参数的类型应该被文档化。

### 示例

此规则的**错误**代码示例：

```javascript
/** @param foo */
function quux(foo) {}
```

此规则的**正确**代码示例：

```javascript
/** @param {SomeType} foo */
function quux(foo) {}
```

## 配置

此规则接受一个配置对象，包含以下属性：

### defaultDestructuredRootType

type: `string`

default: `"object"`

用于为解构根对象默认设置的类型字符串。默认为 `"object"`。

### setDefaultDestructuredRootType

type: `boolean`

default: `false`

是否设置默认的解构根类型。例如，你可能希望避免手动为对应于解构根对象的 `@param` 设置类型，因为它始终会是一个对象。使用 `defaultDestructuredRootType` 作为类型字符串。默认为 `false`。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.4.4 中添加。

## 参考

<RuleReferences />
