---
title: "unicorn/prefer-structured-clone | Oxlint"
rule: "unicorn/prefer-structured-clone"
category: "Style"
version: "0.9.0"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_structured_clone.rs`;
</script>

<RuleHeader />

### 它的作用

建议使用 `structuredClone` 来创建深拷贝。

### 为什么这不好？

`structuredClone` 是创建值的深拷贝的现代方式。

### 示例

以下是此规则的**错误**代码示例：

```js
const clone = JSON.parse(JSON.stringify(foo));

const clone = _.cloneDeep(foo);
```

以下是此规则的**正确**代码示例：

```js
const clone = structuredClone(foo);
```

## 配置

此规则接受一个包含以下属性的配置对象：

### functions

type: `string[]`

default: `["cloneDeep", "utils.clone"]`

允许用于深拷贝、而不是 structuredClone 的函数列表。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.9.0 中添加。

## 参考

<RuleReferences />
