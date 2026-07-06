---
title: "vue/no-async-in-computed-properties | Oxlint"
rule: "vue/no-async-in-computed-properties"
category: "Correctness"
version: "1.71.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.vuejs.org/rules/no-async-in-computed-properties.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/no_async_in_computed_properties.rs`;
</script>

<RuleHeader />

### 作用

禁止在计算属性中使用异步操作。

### 为什么这不好？

计算属性中的异步操作可能会导致意外行为。计算属性的值应该是其依赖项的同步函数。

### 示例

以下是此规则的**错误**代码示例：

```vue
<script>
export default {
  computed: {
    pro() {
      return Promise.all([new Promise((resolve, reject) => {})]);
    },
    foo: async function () {
      return await someFunc();
    },
    bar() {
      return fetch(url).then((response) => {});
    },
    tim() {
      setTimeout(() => {}, 0);
    },
    inst() {
      return new Promise((resolve, reject) => {});
    },
  },
};
</script>
```

以下是此规则的**正确**代码示例：

```vue
<script>
export default {
  computed: {
    foo() {
      return this.bar;
    },
  },
};
</script>
```

## 配置

### ignoredObjectNames

类型：`string[]`

默认值：`[]`

应忽略其成员调用链（`.then` / `.catch` / `.finally`）的标识符名称。适用于像 Zod 这样的库，其中 `.catch(default)` 是构建器 API，而不是 Promise 方法。

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v1.71.0 中添加。

## 参考

<RuleReferences />
