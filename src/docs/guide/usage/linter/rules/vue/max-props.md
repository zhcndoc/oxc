---
title: "vue/max-props"
category: "Restriction"
version: "1.19.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/max_props.rs`;
</script>

<RuleHeader />

### 它的作用

强制限制为给定的 Vue 组件定义的 props 最大数量。

### 为什么这不好？

组件上过多的 props 可能表明它试图做太多事情，因此可能难以维护或理解。

通过限制 props 的数量，开发者会被鼓励避免过于复杂的组件，而是创建更小、更专注的组件，从而更容易推理。

### 示例

对于默认 `{ "maxProps": 1 }` 选项，此规则的**错误**代码示例：

```js
<script setup>
defineProps({
  prop1: String,
  prop2: String,
})
</script>
```

对于默认 `{ "maxProps": 1 }` 选项，此规则的**正确**代码示例：

```js
<script setup>
defineProps({
  prop1: String,
})
</script>
```

## 配置

此规则接受一个包含以下属性的配置对象：

### maxProps

类型：`integer`

默认值：`1`

允许在 Vue SFC 中使用的 props 最大数量。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.19.0 中添加。

## 参考资料

<RuleReferences />
