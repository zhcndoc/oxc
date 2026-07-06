---
title: "vue/require-prop-types | Oxlint"
rule: "vue/require-prop-types"
category: "Style"
version: "1.69.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.vuejs.org/rules/require-prop-types.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/require_prop_types.rs`;
</script>

<RuleHeader />

### 它的作用

此规则强制要求 props 声明包含类型定义。

### 为什么这不好？

在已提交的代码中，prop 定义应尽可能详细，至少要指定类型。

### 示例

此规则的**错误**代码示例：

```vue
<script setup>
const props = defineProps({
  name: String,
});
</script>
```

此规则的**正确**代码示例：

```vue
<script setup>
const props = defineProps({
  name: { type: String },
});
</script>

// 或者带验证器
<script setup>
const props = defineProps({
  name: {
    validator: (value) => value.length > 0,
  },
});
</script>
```

## 如何使用

<RuleHowToUse />

## 版本

该规则已在 v1.69.0 中添加。

## 参考资料

<RuleReferences />
