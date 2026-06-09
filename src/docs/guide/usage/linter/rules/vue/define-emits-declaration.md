---
title: "vue/define-emits-declaration | Oxlint"
rule: "vue/define-emits-declaration"
category: "Style"
version: "1.15.0"
default: false
type_aware: false
fix: "pending"
upstream: "https://eslint.vuejs.org/rules/define-emits-declaration.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/define_emits_declaration.rs`;
</script>

<RuleHeader />

### 作用

此规则强制规范 `defineEmits` 的类型声明风格，你应当使用 `type-based`、严格的 `type-literal`（引入于 Vue 3.3），或 `runtime` 声明。
此规则仅在 setup script 和 `lang="ts"` 中生效。

### 为什么这不好？

不一致的代码风格会让人困惑，并使代码更难阅读。

### 示例

以下是此规则的**错误**代码示例：

```vue
// "vue/define-emits-declaration": ["error", "type-based"]
<script setup lang="ts">
const emit = defineEmits(["change", "update"]);
const emit2 = defineEmits({
  change: (id) => typeof id === "number",
  update: (value) => typeof value === "string",
});
</script>

// "vue/define-emits-declaration": ["error", "type-literal"]
<script setup lang="ts">
const emit = defineEmits<{
  (e: "change", id: number): void;
  (e: "update", value: string): void;
}>();
</script>

// "vue/define-emits-declaration": ["error", "runtime"]
<script setup lang="ts">
const emit = defineEmits<{
  (e: "change", id: number): void;
  (e: "update", value: string): void;
}>();
</script>
```

以下是此规则的**正确**代码示例：

```vue
// "vue/define-emits-declaration": ["error", "type-based"]
<script setup lang="ts">
const emit = defineEmits<{
  (e: "change", id: number): void;
  (e: "update", value: string): void;
}>();
const emit2 = defineEmits<{
  change: [id: number];
  update: [value: string];
}>();
</script>

// "vue/define-emits-declaration": ["error", "type-literal"]
<script setup lang="ts">
const emit = defineEmits<{
  change: [id: number];
  update: [value: string];
}>();
</script>

// "vue/define-emits-declaration": ["error", "runtime"]
<script setup lang="ts">
const emit = defineEmits<{
  (e: "change", id: number): void;
  (e: "update", value: string): void;
}>();
const emit2 = defineEmits({
  change: (id) => typeof id === "number",
  update: (value) => typeof value === "string",
});
</script>
```

## 配置

此规则接受以下字符串值之一：

### `"type-based"`

强制使用命名的 TypeScript 类型或接口作为 `defineEmits` 的参数，例如 `defineEmits<MyEmits>()`。

### `"type-literal"`

强制使用内联类型字面量作为 `defineEmits` 的参数，例如 `defineEmits<{ (event: string): void }>()`。

### `"runtime"`

强制使用运行时声明，即通过数组或对象声明 emits，例如 `defineEmits(['event1', 'event2'])`。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.15.0 中添加。

## 参考资料

<RuleReferences />
