---
title: "vue/define-props-declaration | Oxlint"
rule: "vue/define-props-declaration"
category: "Style"
version: "1.15.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.vuejs.org/rules/define-props-declaration.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/define_props_declaration.rs`;
</script>

<RuleHeader />

### 它的作用

强制 `defineProps` 在 Vue 中使用一致的声明风格。
此规则仅适用于 `lang="ts"` 的 `<script setup>`。

### 这为什么不好？

不一致的代码风格会令人困惑，并使代码更难
阅读。

### 示例

以下是此规则的**不正确**代码示例：

```vue
// "vue/define-props-declaration": ["error", "type-based"]
<script setup lang="ts">
const props = defineProps({
  kind: { type: String },
});
</script>

// "vue/define-props-declaration": ["error", "runtime"]
<script setup lang="ts">
const props = defineProps<{
  kind: string;
}>();
</script>
```

以下是此规则的**正确**代码示例：

```vue
// "vue/define-props-declaration": ["error", "type-based"]
<script setup lang="ts">
const props = defineProps<{
  kind: string;
}>();
</script>

// "vue/define-props-declaration": ["error", "runtime"]
<script setup lang="ts">
const props = defineProps({
  kind: { type: String },
});
</script>
```

## 配置

此规则接受以下字符串值之一：

### `"type-based"`

强制使用基于类型的声明。

### `"runtime"`

强制使用运行时声明。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.15.0 中新增。

## 参考资料

<RuleReferences />
