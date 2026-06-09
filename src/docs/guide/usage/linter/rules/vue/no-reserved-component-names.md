---
title: "vue/no-reserved-component-names | Oxlint"
rule: "vue/no-reserved-component-names"
category: "正确性"
version: "1.68.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.vuejs.org/rules/no-reserved-component-names.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/no_reserved_component_names.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用与 HTML / SVG 元素名称冲突的 Vue 组件名称
（以及可选的 Vue 内置组件名称）。

### 为什么这不好？

使用保留名称会悄悄遮蔽标准元素 / 内置组件，
从而在运行时产生令人困惑的行为。

### 示例

以下是此规则的**错误**代码示例：

```vue
<script>
export default {
  name: "div",
};
</script>
```

以下是此规则的**正确**代码示例：

```vue
<script>
export default {
  name: "MyComponent",
};
</script>
```

## 配置

此规则接受一个包含以下属性的配置对象：

### disallowVue3BuiltInComponents

type: `boolean`

default: `false`

禁止 Vue 3 内置组件名称（例如 `Teleport`、`Suspense`）。
注意：这也会捕获 Vue 2 的内置组件，因为 Vue 3 的集合包含它们。

### disallowVueBuiltInComponents

type: `boolean`

default: `false`

禁止 Vue 2 内置组件名称（例如 `Transition`、`KeepAlive`）。

### htmlElementCaseSensitive

type: `boolean`

default: `false`

以区分大小写的方式匹配 HTML / SVG 元素名称。当为 `false`（默认值）时，
HTML 元素的首字母大写形式（例如 `Div`）也会被报告。

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v1.68.0。

## 参考资料

<RuleReferences />
