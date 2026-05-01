---
title: "vue/no-deprecated-data-object-declaration"
category: "正确性"
version: "1.62.0"
default: false
type_aware: false
fix: "待处理"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/no_deprecated_data_object_declaration.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在 `data` 中声明对象（在 Vue.js 3.0.0+ 中）。

### 为什么这不好？

在 Vue 3 中，将 `data` 声明为对象会导致同一个对象在组件的每个实例之间共享，从而引发跨实例状态污染。`data` 必须是一个函数，返回每个实例各自的新对象。

### 示例

下面是此规则的**错误**代码示例：

```vue
<script>
export default {
  data: {
    foo: "bar",
  },
};
</script>
```

下面是此规则的**正确**代码示例：

```vue
<script>
export default {
  data() {
    return { foo: "bar" };
  },
};
</script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.62.0 中添加。

## 参考资料

<RuleReferences />
