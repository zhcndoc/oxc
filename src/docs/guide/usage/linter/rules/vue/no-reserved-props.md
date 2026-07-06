---
title: "vue/no-reserved-props | Oxlint"
rule: "vue/no-reserved-props"
category: "Correctness"
version: "1.69.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.vuejs.org/rules/no-reserved-props.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/no_reserved_props.rs`;
</script>

<RuleHeader />

### 作用

禁止将保留的属性名（例如 `key`、`ref`）用作
prop 名称。

### 为什么这不好？

Vue 会对一些属性进行特殊处理（Vue 3 中的 `key` 和 `ref`；
此外，Vue 2 中还有 `is`、`slot`、`slot-scope`、`class` 和 `style`）。
使用这些名称之一来声明 prop 会与框架自身的处理发生冲突，
并破坏组件。

### 示例

以下是此规则的**错误**代码示例：

```vue
<script>
export default {
  props: {
    ref: String,
    key: String,
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
  },
};
</script>
```

## 配置

### vueVersion

type: `integer`

default: `3`

用于保留属性集合的 Vue 主版本。Vue 2 保留
更多名称（`is`、`slot`、`class`、`style` 等）而不是 Vue 3。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.69.0 中添加。

## 参考资料

<RuleReferences />
