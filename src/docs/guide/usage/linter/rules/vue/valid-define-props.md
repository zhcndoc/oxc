---
title: "vue/valid-define-props | Oxlint"
rule: "vue/valid-define-props"
category: "正确性"
version: "1.15.0"
default: false
type_aware: false
fix: "待定"
upstream: "https://eslint.vuejs.org/rules/valid-define-props.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/valid_define_props.rs`;
</script>

<RuleHeader />

### 它的作用

在 Vue 中强制正确使用 `defineProps` 编译器宏。

此规则在以下情况下会报告 `defineProps` 编译器宏：

- `defineProps` 引用了本地声明的变量。
- `defineProps` 同时具有类型参数和参数。例如：`defineProps<{ /*props*/ }>({ /*props*/ })`
- `defineProps` 被调用了多次。
- 属性同时在 `defineProps` 和 `export default {}` 中定义。
- 属性既没有在 `defineProps` 中定义，也没有在 `export default {}` 中定义。

### 为什么这不好？

错误使用 `defineProps` 可能会导致运行时错误和类型安全性丧失。
Vue 仍然可能编译通过，但 props 可能会静默失败，或者类型注解可能不正确。

### 示例

以下代码示例对这个规则来说是**错误**的：

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

以下代码示例对这个规则来说是**正确**的：

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

## How to Use

<RuleHowToUse />

## 版本

此规则在 v1.15.0 中加入。

## 参考资料

<RuleReferences />
