---
title: "vue/no-shared-component-data | Oxlint"
rule: "vue/no-shared-component-data"
category: "Correctness"
version: "1.67.0"
default: false
type_aware: false
fix: "pending"
upstream: "https://eslint.vuejs.org/rules/no-shared-component-data.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/no_shared_component_data.rs`;
</script>

<RuleHeader />

### 它的作用

强制 Vue 组件定义中的 `data` 属性必须是一个函数。

### 为什么这不好？

当 `data` 以对象字面量形式声明时，同一个对象会在组件的每个实例之间共享，这会导致跨实例的状态污染。通过函数返回一个新的对象可以避免这一点。

此规则适用于通过
`Vue.component(...)`、`Vue.extend(...)`、`Vue.mixin(...)`、
`app.component(...)`、`app.mixin(...)`、`component(...)`、
`createApp(...)`、`defineComponent(...)`、`defineNuxtComponent(...)`，
以及 `.vue` 文件中的 `export default {}` 到达的组件定义。`new Vue({...})` 不在覆盖范围内（该实例不会在组件之间共享 `data`）。

### 示例

以下是此规则的**错误**代码示例：

```vue
<script>
Vue.component("some-comp", {
  data: {
    foo: "bar",
  },
});
</script>
```

以下是此规则的**正确**代码示例：

```vue
<script>
Vue.component("some-comp", {
  data() {
    return { foo: "bar" };
  },
});
</script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.67.0 中添加。

## 参考资料

<RuleReferences />
