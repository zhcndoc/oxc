---
title: "vue/require-default-export"
category: "Suspicious"
version: "1.21.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/require_default_export.rs`;
</script>

<RuleHeader />

### 它的作用

要求组件使用默认导出。

### 为什么这不好？

在 Vue 3 中，不支持不使用默认导出的 SFC（单文件组件）。组件应当作为默认导出进行导出。

### 示例

以下是此规则的**错误**代码示例：

```vue
<script>
const foo = "foo";
</script>
```

以下是此规则的**正确**代码示例：

```vue
<script>
export default {
  data() {
    return {
      foo: "foo",
    };
  },
};
</script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.21.0 中添加。

## 参考资料

<RuleReferences />
