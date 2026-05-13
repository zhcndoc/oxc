---
title: "vue/no-export-in-script-setup | Oxlint"
rule: "vue/no-export-in-script-setup"
category: "正确性"
version: "1.20.0"
default: false
type_aware: false
fix: "无"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/no_export_in_script_setup.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在 `<script setup>` 中使用 `export`

### 为什么这不好？

旧版本的 `<script setup>` RFC 使用 `export` 来定义在模板中使用的变量，
但新的 `<script setup>` RFC 已更新为不使用 `export` 来定义。
有关更多详情，请参见 [Vue RFCs - 0040-script-setup](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md)。

### 示例

以下是此规则的**错误**代码示例：

```vue
<script setup>
export let msg = "Hello!";
</script>
```

以下是此规则的**正确**代码示例：

```vue
<script setup>
let msg = "Hello!";
</script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则新增于 v1.20.0。

## 参考资料

<RuleReferences />
