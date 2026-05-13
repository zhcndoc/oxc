---
title: "vue/no-this-in-before-route-enter | Oxlint"
rule: "vue/no-this-in-before-route-enter"
category: "Correctness"
version: "1.37.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/no_this_in_before_route_enter.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在 `beforeRouteEnter` 方法中使用 `this`。

此规则仅在使用 `vue-router` 时相关。

### 为什么这不好？

在 `beforeRouteEnter` 方法内部，无法访问 `this`。
参见 [vue-router 文档](https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards)。
这种行为并不明显，因此在某些情况下，这条 lint 规则可以帮助防止运行时错误。

### 示例

以下是此规则的**错误**代码示例：

```js
export default {
  beforeRouteEnter(to, from, next) {
    this.a; // 错误：'this' 不可用
    next();
  },
};
```

以下是此规则的**正确**代码示例：

```js
export default {
  beforeRouteEnter(to, from, next) {
    // 不使用 `this` 的任何内容
  },
};
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v1.37.0 中添加的。

## 参考

<RuleReferences />
