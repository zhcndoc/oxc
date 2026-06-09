---
title: "unicorn/prefer-array-index-of | Oxlint"
rule: "unicorn/prefer-array-index-of"
category: "样式"
version: "0.16.12"
default: false
type_aware: false
fix: "pending"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-index-of.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_array_index_of.rs`;
</script>

<RuleHeader />

### 它的作用

当回调函数只是进行简单的严格相等比较时，强制使用 `indexOf` 或 `lastIndexOf`，而不是 `findIndex` 或 `findLastIndex`

### 为什么这不好？

当 `indexOf(value)` 能以更简洁、更清晰的方式完成同样的事情时，使用 `findIndex(x => x === value)` 就显得不必要地冗长。它还避免了创建回调函数的开销。

### 示例

以下是此规则的**错误**代码示例：

```js
values.findIndex((x) => x === "foo");
values.findLastIndex((x) => x === "bar");
```

以下是此规则的**正确**代码示例：

```js
values.indexOf("foo");
values.lastIndexOf("bar");
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.16.12 中添加的。

## 参考资料

<RuleReferences />
