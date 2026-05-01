---
title: "vue/no-required-prop-with-default"
category: "Suspicious"
version: "1.17.0"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/no_required_prop_with_default.rs`;
</script>

<RuleHeader />

### 作用

强制带有默认值的 prop 必须是可选的。

### 为什么这不好？

如果一个 prop 声明了默认值，无论它是否是必需的，
在实际使用中我们总是可以省略它。在这种情况下，就会应用默认值。
因此，带有默认值的必需 prop 本质上与可选 prop 没有区别。

### 示例

此规则的**错误**代码示例：

```vue
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string | number;
    age?: number;
  }>(),
  {
    name: "Foo",
  },
);
</script>
```

此规则的**正确**代码示例：

```vue
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name?: string | number;
    age?: number;
  }>(),
  {
    name: "Foo",
  },
);
</script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v1.17.0 中添加的。

## 参考资料

<RuleReferences />
