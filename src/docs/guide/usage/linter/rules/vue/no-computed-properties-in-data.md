---
title: "vue/no-computed-properties-in-data | Oxlint"
rule: "vue/no-computed-properties-in-data"
category: "Correctness"
version: "1.67.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.vuejs.org/rules/no-computed-properties-in-data.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/no_computed_properties_in_data.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在 `data()` 内访问计算属性。

### 为什么这不好？

`data()` 会在计算属性初始化**之前**运行，因此
`this.<computedName>` 的值会求值为 `undefined`，并且会在组件实例中悄悄留下损坏的状态。

### 示例

以下是此规则的**错误**代码示例：

```vue
<script>
export default {
  data() {
    const foo = this.foo; // `foo` 是一个计算属性
    return {};
  },
  computed: {
    foo() {},
  },
};
</script>
```

以下是此规则的**正确**代码示例：

```vue
<script>
export default {
  data() {
    const foo = this.foo; // `foo` 是一个 prop，不是计算属性
    return {};
  },
  props: ["foo"],
};
</script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.67.0 中添加。

## 参考资料

<RuleReferences />
