---
title: "vue/require-prop-type-constructor | Oxlint"
rule: "vue/require-prop-type-constructor"
category: "正确性"
version: "1.68.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://eslint.vuejs.org/rules/require-prop-type-constructor.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/require_prop_type_constructor.rs`;
</script>

<RuleHeader />

### 它的作用

要求 `props` 的类型值使用构造函数（例如 `String`、
`Number`、`Boolean`），而不是字符串、数字或其他字面量。

### 为什么这不好？

Vue 会使用 prop 类型进行运行时校验和开发时警告。像 `'String'`
这样的字符串看起来像构造函数，但永远不会与实际值匹配，
从而静默地禁用了检查。

### 示例

以下是此规则的**错误**代码示例：

```vue
<script>
export default {
  props: {
    foo: "String",
    bar: { type: "Number" },
  },
};
</script>
```

以下是此规则的**正确**代码示例：

```vue
<script>
export default {
  props: {
    foo: String,
    bar: { type: Number },
  },
};
</script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.68.0 中添加。

## 参考资料

<RuleReferences />
