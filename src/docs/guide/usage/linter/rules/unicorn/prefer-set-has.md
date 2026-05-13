---
title: "unicorn/prefer-set-has | Oxlint"
rule: "unicorn/prefer-set-has"
category: "Perf"
version: "0.13.2"
default: false
type_aware: false
fix: "fixable_dangerous_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_set_has.rs`;
</script>

<RuleHeader />

### 它的作用

在检查某个值是否存在或不存在时，优先使用 `Set#has()` 而不是 `Array#includes()`。

### 为什么这不好？

`Set#has()` 比 `Array#includes()` 更快。

### 示例

以下是此规则的**不正确**代码示例：

```js
const array = [1, 2, 3];
const hasValue = (value) => array.includes(value);
```

以下是此规则的**正确**代码示例：

```js
const set = new Set([1, 2, 3]);
const hasValue = (value) => set.has(value);
```

```js
const array = [1, 2, 3];
const hasOne = array.includes(1);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.13.2 中添加的。

## 参考资料

<RuleReferences />
