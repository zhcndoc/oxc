---
title: "vue/no-deprecated-delete-set | Oxlint"
rule: "vue/no-deprecated-delete-set"
category: "Correctness"
version: "1.62.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/no_deprecated_delete_set.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用已弃用的 `$set` / `$delete`（在 Vue.js 3.0.0+ 中）。

### 为什么这不好？

在 Vue 3 中，实例方法 `$set` / `$delete` 以及全局的
`Vue.set` / `Vue.delete` 已被移除。现在响应性由
Proxy 提供支持，因此直接赋值和 `delete` 运算符可以
按预期工作，这些辅助方法已不再需要。

### 示例

以下是此规则的**错误**代码示例：

```vue
<script>
export default {
  mounted() {
    this.$set(obj, key, value);
    this.$delete(obj, key);
    Vue.set(obj, key, value);
    Vue.delete(obj, key);
  },
};
</script>
```

以下是此规则的**正确**代码示例：

```vue
<script>
export default {
  mounted() {
    obj[key] = value;
    delete obj[key];
  },
};
</script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.62.0 中添加。

## 参考资料

<RuleReferences />
