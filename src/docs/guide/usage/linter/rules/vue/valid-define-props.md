---
title: "vue/valid-define-props"
category: "正确性"
version: "1.15.0"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/valid_define_props.rs`;
</script>

<RuleHeader />

### 它的作用

此规则检查 `defineProps` 编译器宏是否有效。

此规则在以下情况下报告 `defineProps` 编译器宏：

- `defineProps` 引用了本地声明的变量。
- `defineProps` 同时具有字面量类型和参数。例如：`defineProps<{ /*props*/ }>({ /*props*/ })`
- `defineProps` 被调用了多次。
- 属性同时在 `defineProps` 和 `export default {}` 中定义。
- 属性既没有在 `defineProps` 中定义，也没有在 `export default {}` 中定义。

### 为什么这不好？

错误使用 `defineProps` 可能会导致运行时错误，并丢失类型安全性。
Vue 可能仍然会编译代码，但属性可能会静默失效，或者类型标注不正确。

### 示例

此规则的**错误**代码示例如下：

```vue
<script setup>
const def = { msg: String };
defineProps(def);
</script>
```

```vue
<script setup lang="ts">
defineProps<{ msg?: string }>({ msg: String });
</script>
```

```vue
<script setup>
defineProps({ msg: String });
defineProps({ count: Number });
</script>
```

```vue
<script>
export default {
  props: { msg: String },
};
</script>
<script setup>
defineProps({ count: Number });
</script>
```

此规则的**正确**代码示例如下：

```vue
<script setup>
defineProps({ msg: String });
</script>
```

```vue
<script setup>
defineProps(["msg"]);
</script>
```

```vue
<script setup lang="ts">
defineProps<{ msg?: string }>();
</script>
```

```vue
<script>
export default {
  props: { msg: String },
};
</script>
<script setup>
defineProps();
</script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.15.0 中添加。

## 参考资料

<RuleReferences />
