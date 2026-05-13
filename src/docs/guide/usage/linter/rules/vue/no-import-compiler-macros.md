---
title: "vue/no-import-compiler-macros | Oxlint"
rule: "vue/no-import-compiler-macros"
category: "Restriction"
version: "1.21.0"
default: false
type_aware: false
fix: "fixable_dangerous_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/no_import_compiler_macros.rs`;
</script>

<RuleHeader />

### 它的作用

禁止导入 Vue 编译器宏。

### 为什么这样不好？

以下编译器宏：

- `defineProps`
- `defineEmits`
- `defineExpose`
- `withDefaults`
- `defineModel`
- `defineOptions`
- `defineSlots`

在 Vue 3 的 `<script setup>` 中是全局可用的，不需要显式导入。

### 示例

以下是此规则的**错误**代码示例：

```vue
<script setup>
import { defineProps, withDefaults } from "vue";
</script>
```

以下是此规则的**正确**代码示例：

```vue
<script setup>
import { ref } from "vue";
</script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则新增于 v1.21.0。

## 参考资料

<RuleReferences />
