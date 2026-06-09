---
title: "vue/no-arrow-functions-in-watch | Oxlint"
rule: "vue/no-arrow-functions-in-watch"
category: "正确性"
version: "1.39.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.vuejs.org/rules/no-arrow-functions-in-watch.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/no_arrow_functions_in_watch.rs`;
</script>

<RuleHeader />

### 作用

此规则不允许在定义 watcher 时使用箭头函数。

### 为什么这不好？

箭头函数会以词法方式绑定 `this`，这意味着它们无法访问 Vue 组件实例。
在 Vue 的 watcher 中，你通常需要访问 `this` 来与组件数据、方法或其他属性交互。
使用普通函数或方法简写可以确保 `this` 正确绑定。

### 示例

此规则的**错误**代码示例：

```vue
<script>
export default {
  watch: {
    foo: () => {},
    bar: {
      handler: () => {},
    },
    baz: [
      (val) => {},
      {
        handler: () => {},
      },
    ],
  },
};
</script>
```

此规则的**正确**代码示例：

```vue
<script>
export default {
  watch: {
    foo() {},
    bar: function () {},
    baz: {
      handler: function () {},
    },
  },
};
</script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v1.39.0 中添加的。

## 参考资料

<RuleReferences />
