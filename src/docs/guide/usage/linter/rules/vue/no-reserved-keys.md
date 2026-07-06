---
title: "vue/no-reserved-keys | Oxlint"
rule: "vue/no-reserved-keys"
category: "Correctness"
version: "1.69.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.vuejs.org/rules/no-reserved-keys.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/no_reserved_keys.rs`;
</script>

<RuleHeader />

### 作用

禁止覆盖保留的 Vue 实例键（例如 `$data`、`$emit`）
或在 `data` / `asyncData` 中使用以下划线 `_` 开头的键。

### 为什么这很糟糕？

Vue 暴露了多个实例属性（`$emit`、`$data`、`$props` 等）。
使用同名的 prop、computed、data、method 或 setup 返回键会覆盖底层 Vue API，并悄然破坏组件（例如 `methods: { $emit() {} }` 会破坏事件触发）。
Vue 也会在其响应式系统中保留下划线 `_` 开头的名称，因此 `data() { return { _foo: 1 } }` 可能会与内部状态冲突。

### 示例

以下是此规则的**错误**代码示例：

```vue
<script>
export default {
  props: ["$data"],
  methods: {
    $emit() {},
  },
};
</script>
```

以下是此规则的**正确**代码示例：

```vue
<script>
export default {
  props: ["fooData"],
  methods: {
    send() {},
  },
};
</script>
```

## 配置

### groups

type: `string[]`

default: `[]`

除内置的 `props` / `computed` / `data` / `asyncData` / `methods` / `setup` 之外，额外要检查的组件选项分组。

### reserved

type: `string[]`

default: `[]`

除内置列表外，额外要禁止的保留键名。

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v1.69.0 中添加。

## 参考

<RuleReferences />
