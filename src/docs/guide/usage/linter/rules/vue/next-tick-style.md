---
title: "vue/next-tick-style | Oxlint"
rule: "vue/next-tick-style"
category: "Style"
version: "1.69.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://eslint.vuejs.org/rules/next-tick-style.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/next_tick_style.rs`;
</script>

<RuleHeader />

### 它的作用

强制在 `nextTick` 中使用 Promise 或回调风格。

### 为什么这很糟糕？

在 Vue.js 中，`nextTick` 既可以通过传入回调函数使用，也可以通过使用返回的 Promise 来使用。混用这些风格会让代码更难阅读，也不够一致。请始终保持使用同一种风格。

### 示例

以下是此规则在默认 `"promise"` 选项下的**错误**代码示例：

```js
this.$nextTick(() => {});
Vue.nextTick(() => {});
import { nextTick } from "vue";
nextTick(() => {});
```

以下是此规则在默认 `"promise"` 选项下的**正确**代码示例：

```js
this.$nextTick().then(() => {});
await Vue.nextTick();
import { nextTick } from "vue";
await nextTick();
```

以下是此规则在 `"callback"` 选项下的**错误**代码示例：

```js
await this.$nextTick();
Vue.nextTick().then(() => {});
```

以下是此规则在 `"callback"` 选项下的**正确**代码示例：

```js
this.$nextTick(() => {});
Vue.nextTick(() => {});
```

## 配置

此规则接受以下字符串值之一：

### `"promise"`

要求使用 `nextTick` 返回的 Promise。

### `"callback"`

要求向 `nextTick` 传入一个回调函数。

## 使用方法

<RuleHowToUse />

## 版本

此规则已在 v1.69.0 中添加。

## 参考资料

<RuleReferences />
