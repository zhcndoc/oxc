---
title: "vue/prop-name-casing | Oxlint"
rule: "vue/prop-name-casing"
category: "Style"
version: "next"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.vuejs.org/rules/prop-name-casing.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/prop_name_casing.rs`;
</script>

<RuleHeader />

### 它的作用

强制 Vue 组件的 prop 名称使用特定的命名方式（camelCase 或 snake_case）。

### 这为什么不好？

不一致的 prop 命名会让模板更难阅读，也更难通过 grep 搜索。将整个代码库中的 props 固定为一种命名方式，可以让声明处和调用处保持一致。

### 示例

以下是此规则的**错误**代码示例（默认 `camelCase`）：

```vue
<script>
export default {
  props: {
    greeting_text: String,
  },
};
</script>
```

以下是此规则的**正确**代码示例（默认 `camelCase`）：

```vue
<script>
export default {
  props: {
    greetingText: String,
  },
};
</script>
```

## 配置

### 第 1 个选项

type: `"camelCase" | "snake_case"`

### 第 2 个选项

此选项是一个包含以下属性的对象：

#### ignoreProps

type: `string[]`

default: `[]`

## 如何使用

<RuleHowToUse />

## 版本

此规则从 vnext 版本开始加入。

## 参考

<RuleReferences />
