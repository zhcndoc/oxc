---
title: "jsdoc/no-defaults | Oxlint"
rule: "jsdoc/no-defaults"
category: "正确性"
version: "0.3.2"
default: false
type_aware: false
fix: "pending"
upstream: "https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/noDefaults.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsdoc/no_defaults.rs`;
</script>

<RuleHeader />

### 它的作用

此规则会报告在 `@param` 或 `@default` 的相关部分中使用了默认值。
它还可以选择性地报告方括号形式的可选参数的存在。

### 这为什么不好？

该规则旨在防止在这些标签上标注默认值，
因为这在 ES2015 默认参数中会显得多余。

### 示例

此规则的**错误**代码示例：

```javascript
/** @param {number} [foo="7"] */
function quux(foo) {}
```

此规则的**正确**代码示例：

```javascript
/** @param {number} foo */
function quux(foo) {}

/** @param foo */
function quux(foo) {}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### noOptionalParamNames

type: `boolean`

default: `false`

如果为 true，则报告 `@param` 标签中可选参数名称（方括号）的存在。

## 使用方法

<RuleHowToUse />

## 版本

此规则是在 v0.3.2 中添加的。

## 参考资料

<RuleReferences />
