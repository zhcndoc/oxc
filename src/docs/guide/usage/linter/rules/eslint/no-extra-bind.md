---
title: "eslint/no-extra-bind | Oxlint"
rule: "eslint/no-extra-bind"
category: "Suspicious"
version: "1.1.0"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_extra_bind.rs`;
</script>

<RuleHeader />

### 它的作用

禁止不必要地调用 `.bind()`。

### 为什么这不好？

该规则旨在避免不必要地使用 `bind()`，
因此，当立即调用函数表达式（IIFE）使用了 `bind()`
并且没有合适的 `this` 值时，它会发出警告。
该规则不会标记包含函数参数绑定的 `bind()` 用法。

### 示例

以下是此规则的**错误**代码示例：

```js
const x = function () {
  foo();
}.bind(bar);

const z = (() => {
  this.foo();
}).bind(this);
```

以下是此规则的**正确**代码示例：

```js
const x = function () {
  this.foo();
}.bind(bar);
const y = function (a) {
  return a + 1;
}.bind(foo, bar);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v1.1.0 中添加的。

## 参考资料

<RuleReferences />
