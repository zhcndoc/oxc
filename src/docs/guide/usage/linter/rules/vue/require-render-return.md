---
title: "vue/require-render-return | Oxlint"
rule: "vue/require-render-return"
category: "Correctness"
version: "1.67.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.vuejs.org/rules/require-render-return.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/require_render_return.rs`;
</script>

<RuleHeader />

### 作用

强制 `render` 函数始终返回一个值。

### 为什么这很糟糕？

Vue 组件的 `render` 函数必须生成一个 VNode 树。如果某条
代码路径在没有返回的情况下继续执行，Vue 会收到 `undefined`
并且静默地什么也不渲染。

### 示例

此规则的**错误**代码示例：

```vue
<script>
export default {
  render() {
    if (foo) {
      return h("div");
    }
    // 在没有返回的情况下继续执行
  },
};
</script>
```

此规则的**正确**代码示例：

```vue
<script>
export default {
  render() {
    return h("div");
  },
};
</script>
```

## 如何使用

<RuleHowToUse />

## 版本

该规则于 v1.67.0 中添加。

## 参考资料

<RuleReferences />
