---
title: "vue/valid-define-options | Oxlint"
rule: "vue/valid-define-options"
category: "Correctness"
version: "1.67.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.vuejs.org/rules/valid-define-options.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/valid_define_options.rs`;
</script>

<RuleHeader />

### 作用

强制正确使用 `defineOptions` 编译器宏。

### 为什么这很糟糕？

`defineOptions` 是 `<script setup>` 的编译器宏。它必须以一个单独的对象字面量调用，其中包含可在编译时求值的组件选项。诸如引用本地声明的变量、声明 `props`/`emits`/`expose`/`slots`、不传参数调用，或传入类型参数等误用，都会导致编译器无法处理。

### 示例

以下是此规则的**错误**代码示例：

```vue
<script setup>
defineOptions(); // 无选项对象
defineOptions({ name: "A" });
defineOptions({ name: "B" }); // 多次调用
defineOptions({ props: { msg: String } }); // 请改用 `defineProps()`
</script>
```

以下是此规则的**正确**代码示例：

```vue
<script setup>
defineOptions({ name: "foo", inheritAttrs: false });
</script>
```

## How to Use

<RuleHowToUse />

## 版本

此规则添加于 v1.67.0。

## 参考资料

<RuleReferences />
