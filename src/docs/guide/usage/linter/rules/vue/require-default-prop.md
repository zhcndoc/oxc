---
title: "vue/require-default-prop | Oxlint"
rule: "vue/require-default-prop"
category: "Style"
version: "1.70.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.vuejs.org/rules/require-default-prop.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/require_default_prop.rs`;
</script>

<RuleHeader />

### 它的作用

要求未标记为 `required` 的 props 设置默认值。

### 为什么这很糟糕？

既不是必需也没有默认值的 prop，在省略时会隐式变为 `undefined`。强制设置默认值可以让组件行为保持明确，并避免 `undefined` 泄漏到模板和逻辑中。`Boolean` props 是例外，因为它们默认已经是 `false`。

### 示例

以下是此规则的**错误**代码示例：

```vue
<script>
export default {
  props: {
    name: String,
  },
};
</script>
```

以下是此规则的**正确**代码示例：

```vue
<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
  },
};
</script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.70.0 中添加。

## 参考资料

<RuleReferences />
