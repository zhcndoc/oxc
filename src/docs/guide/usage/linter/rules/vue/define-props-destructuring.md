---
title: "vue/define-props-destructuring"
category: "Style"
version: "1.20.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/define_props_destructuring.rs`;
</script>

<RuleHeader />

### 它的作用

此规则强制对 Vue 3 Composition API 的 props 处理采用一致的风格，
允许你在要求解构或禁止解构之间进行选择。

### 为什么这不好？

默认情况下，该规则要求在使用 `defineProps` 时使用解构语法，
而不是将 props 存储到变量中，并且会警告不要将 `withDefaults` 与解构结合使用。

### 示例

以下是此规则下**错误**代码的示例：

```vue
<script setup lang="ts">
const props = defineProps(["foo"]);
const propsWithDefaults = withDefaults(defineProps(["foo"]), { foo: "default" });
const { baz } = withDefaults(defineProps(["baz"]), { baz: "default" });
const props = defineProps<{ foo?: string }>();
const propsWithDefaults = withDefaults(defineProps<{ foo?: string }>(), { foo: "default" });
</script>
```

以下是此规则下**正确**代码的示例：

```vue
<script setup lang="ts">
const { foo } = defineProps(["foo"]);
const { bar = "default" } = defineProps(["bar"]);
const { foo } = defineProps<{ foo?: string }>();
const { bar = "default" } = defineProps<{ bar?: string }>();
</script>
```

## 配置

此规则接受一个包含以下属性的配置对象：

### destructure

type: `"always" | "never"`

default: `"always"`

要求或禁止解构。

#### `"always"`

在使用 `defineProps` 时要求解构，并警告不要将 `withDefaults` 与解构一起使用

#### `"never"`

要求使用变量存储 props，并禁止解构

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.20.0 中新增。

## 参考资料

<RuleReferences />
