---
title: "vue/no-deprecated-model-definition | Oxlint"
rule: "vue/no-deprecated-model-definition"
category: "Correctness"
version: "1.63.0"
default: false
type_aware: false
fix: "pending"
upstream: "https://eslint.vuejs.org/rules/no-deprecated-model-definition.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/no_deprecated_model_definition.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用已弃用的 `model` 定义（在 Vue.js 3.0.0+ 中）。

### 为什么这很糟糕？

Vue 3 移除了每个组件的 `model` 选项。取而代之，`v-model`
通过 `modelValue` prop 和 `update:modelValue` 事件工作，
因此不再需要 `model: { prop, event }` 块。

使用 `{ "allowVue3Compat": true }` 时，如果 `model` 块
已经使用与 Vue 3 兼容的 `modelValue` / `update:modelValue`
（或短横线命名法 `model-value` / `update:model-value`）配对，
则允许使用，以便更顺畅地迁移。

### 示例

以下是此规则的**错误**代码示例：

```vue
<script>
export default {
  model: {
    prop: "foo",
    event: "update",
  },
};
</script>
```

以下是启用
`{ "allowVue3Compat": true }` 选项时，此规则的**正确**代码示例：

```vue
<script>
export default {
  model: {
    prop: "modelValue",
    event: "update:modelValue",
  },
};
</script>
```

## 配置

### allowVue3Compat

type: `boolean`

default: `false`

允许 `model: { prop: 'modelValue', event: 'update:modelValue' }`（或
短横线命名法的 `model-value` 变体），它与 Vue 3 的 `v-model`
向前兼容。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.63.0 中添加。

## 参考资料

<RuleReferences />
