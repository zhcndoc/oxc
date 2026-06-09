---
title: "unicorn/no-unnecessary-array-splice-count | Oxlint"
rule: "unicorn/no-unnecessary-array-splice-count"
category: "Pedantic"
version: "1.20.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-array-splice-count.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_unnecessary_array_splice_count.rs`;
</script>

<RuleHeader />

### 它的作用

禁止将 `.length` 或 `Infinity` 作为 `Array#splice()` 或 `Array#toSpliced()` 的 `deleteCount` 或 `skipCount` 参数传入。

### 为什么这不好？

调用 `Array#splice(start, deleteCount)` 或 `Array#toSpliced(start, skipCount)` 时，
省略 `deleteCount` 或 `skipCount` 参数会删除或跳过 `start` 之后的所有元素。
使用 `.length` 或 `Infinity` 是不必要的，并且会使代码更冗长。

### 示例

以下是此规则的**错误**代码示例：

```js
array.splice(1, array.length);
array.splice(1, Infinity);
array.splice(1, Number.POSITIVE_INFINITY);
array.toSpliced(1, array.length);
```

以下是此规则的**正确**代码示例：

```js
array.splice(1);
array.toSpliced(1);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.20.0 中新增。

## 参考资料

<RuleReferences />
