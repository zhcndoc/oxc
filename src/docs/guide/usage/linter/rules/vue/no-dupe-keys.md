---
title: "vue/no-dupe-keys | Oxlint"
rule: "vue/no-dupe-keys"
category: "正确性"
version: "1.70.0"
default: true
type_aware: false
fix: "none"
upstream: "https://eslint.vuejs.org/rules/no-dupe-keys.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/no_dupe_keys.rs`;
</script>

<RuleHeader />

### 它的作用

禁止字段名重复。

### 为什么这不好？

Vue 组件选项中的重复键（props、data、computed、methods、setup）
可能会导致意外行为，因为它们在运行时可能会相互覆盖，
并且会在模板中造成名称冲突。

### 示例

此规则的**错误**代码示例：

```vue
<script>
export default {
  props: ["foo"],
  computed: {
    foo() {},
  },
};
</script>
```

此规则的**正确**代码示例：

```vue
<script>
export default {
  props: ["foo"],
  computed: {
    bar() {},
  },
};
</script>
```

## 配置

### groups

类型：`string[]`

默认值：`[]`

在内置的 `props`、`computed`、`data`、`methods` 和 `setup` 组之外，
额外添加要搜索重复键的组名。

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v1.70.0 中添加的。

## 参考资料

<RuleReferences />
