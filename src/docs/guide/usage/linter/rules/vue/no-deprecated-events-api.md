---
title: "vue/no-deprecated-events-api"
category: "正确性"
version: "1.62.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/no_deprecated_events_api.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在 Vue.js 3.0.0+ 中使用已弃用的 Events API（`$on`、`$off`、`$once`）。

### 为什么这不好？

在 Vue.js 3.0.0+ 中，内部事件 API `$on`、`$off` 和 `$once` 已被移除。
这些方法曾用于组件之间的事件处理，但现在已不再可用。

### 示例

此规则的**错误**代码示例：

```vue
<script>
export default {
  mounted() {
    this.$on("event", () => {});
    this.$off("event");
    this.$once("event", () => {});
  },
};
</script>
```

此规则的**正确**代码示例：

```vue
<script>
import mitt from "mitt";

const emitter = mitt();

export default {
  mounted() {
    emitter.on("event", () => {});
    emitter.off("event");
    emitter.once("event", () => {});
  },
};
</script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.62.0 中添加。

## 参考资料

<RuleReferences />
