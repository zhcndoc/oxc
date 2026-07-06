---
title: "vue/require-slots-as-functions | Oxlint"
rule: "vue/require-slots-as-functions"
category: "正确性"
version: "1.67.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.vuejs.org/rules/require-slots-as-functions.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/require_slots_as_functions.rs`;
</script>

<RuleHeader />

### 作用

强制将 `$slots` 的属性作为函数使用。

### 为什么这不好？

在 Vue.js 3 中，`this.$slots.<name>` 是一个函数（插槽渲染函数），
而不是像 Vue.js 2 中那样的 vnode 数组。将插槽属性当作
值来处理（例如 `this.$slots.default.filter(...)`）会在运行时出错。

### 示例

以下是此规则的**错误**代码示例：

```vue
<script>
export default {
  render(h) {
    var children = this.$slots.default
    return h('div', children.filter(...))
  }
}
</script>
```

以下是此规则的**正确**代码示例：

```vue
<script>
export default {
  render(h) {
    var children = this.$slots.default();
    return h("div", children);
  },
};
</script>
```

## How to Use

<RuleHowToUse />

## 版本

此规则新增于 v1.67.0。

## 参考资料

<RuleReferences />
