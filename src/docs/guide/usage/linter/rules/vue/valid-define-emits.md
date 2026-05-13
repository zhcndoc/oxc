---
title: "vue/valid-define-emits | Oxlint"
rule: "vue/valid-define-emits"
category: "正确性"
version: "1.14.0"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/valid_define_emits.rs`;
</script>

<RuleHeader />

### 作用

此规则检查 `defineEmits` 编译器宏是否有效。

在以下情况下，此规则会报告 `defineEmits` 编译器宏的问题：

- `defineEmits` 引用了在本地声明的变量。
- `defineEmits` 同时具有字面量类型和参数。例如 `defineEmits<(e: 'foo')=>void>(['bar'])`
- `defineEmits` 被调用了多次。
- 自定义事件同时在 `defineEmits` 和 `export default {}` 中定义。
- 自定义事件既没有在 `defineEmits` 中定义，也没有在 `export default {}` 中定义。

### 为什么这不好？

误用 `defineEmits` 可能导致运行时错误、不清晰的组件契约以及类型安全丢失。
Vue 可能仍然会编译代码，但发出的事件可能会静默失效或被错误地类型化。

### 示例

此规则的**不正确**代码示例：

```vue
<script setup>
const def = { notify: null };
defineEmits(def);
</script>
```

```vue
<script setup lang="ts">
defineEmits<(e: "notify") => void>({ submit: null });
</script>
```

```vue
<script setup>
defineEmits({ notify: null });
defineEmits({ submit: null });
</script>
```

```vue
<script>
export default {
  emits: ["notify"],
};
</script>
<script setup>
defineEmits({ submit: null });
</script>
```

此规则的**正确**代码示例：

```vue
<script setup>
defineEmits({ notify: null });
</script>
```

```vue
<script setup>
defineEmits(["notify"]);
</script>
```

```vue
<script setup lang="ts">
defineEmits<(e: "notify") => void>();
</script>
```

```vue
<script>
export default {
  emits: ["notify"],
};
</script>
<script setup>
defineEmits();
</script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.14.0 中添加。

## 参考资料

<RuleReferences />
