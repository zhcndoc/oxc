---
title: "vue/return-in-emits-validator | Oxlint"
rule: "vue/return-in-emits-validator"
category: "Correctness"
version: "1.67.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.vuejs.org/rules/return-in-emits-validator.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/return_in_emits_validator.rs`;
</script>

<RuleHeader />

### 作用

强制在 `emits` 验证器中存在 `return` 语句
（适用于 Vue.js 3.0.0+）。

### 为什么这不好？

`emits` 验证器必须返回一个布尔值，表示
发出的负载是否有效。忘记返回值（或只返回
假值）会使验证器实际上拒绝每一次 emit，
从而静默地破坏组件契约。

### 示例

以下是此规则的**错误**代码示例：

```vue
<script>
export default {
  emits: {
    foo() {
      // 缺少 return
    },
  },
};
</script>
```

以下是此规则的**正确**代码示例：

```vue
<script>
export default {
  emits: {
    foo(payload) {
      return typeof payload === "string";
    },
  },
};
</script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.67.0 中添加。

## 参考资料

<RuleReferences />
