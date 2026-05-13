---
title: "vue/no-deprecated-destroyed-lifecycle | Oxlint"
rule: "vue/no-deprecated-destroyed-lifecycle"
category: "Correctness"
version: "1.35.0"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/no_deprecated_destroyed_lifecycle.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在 Vue.js 3.0.0+ 中使用已废弃的 `destroyed` 和 `beforeDestroy` 生命周期钩子。

### 为什么这不好？

在 Vue.js 3.0.0+ 中，`destroyed` 和 `beforeDestroy` 生命周期钩子分别已更名为
`unmounted` 和 `beforeUnmount`。使用旧名称已被弃用，
并且可能会导致混淆或兼容性问题。

### 示例

此规则的**错误**代码示例：

```vue
<script>
export default {
  beforeDestroy() {},
  destroyed() {},
};
</script>
```

此规则的**正确**代码示例：

```vue
<script>
export default {
  beforeUnmount() {},
  unmounted() {},
};
</script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.35.0 中添加。

## 参考资料

<RuleReferences />
