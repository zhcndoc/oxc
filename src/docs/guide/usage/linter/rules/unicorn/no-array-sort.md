---
title: "unicorn/no-array-sort | Oxlint"
rule: "unicorn/no-array-sort"
category: "可疑"
version: "1.15.0"
default: false
type_aware: false
fix: "可修复建议"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-sort.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_array_sort.rs`;
</script>

<RuleHeader />

### 作用

优先使用 `Array#toSorted()` 而不是 `Array#sort()`。

### 为什么这是不好的？

`Array#sort()` 会原地修改原始数组，这可能导致意外的副作用——尤其是当原始数组在代码的其他地方被使用时。

### 示例

以下是此规则的**错误**代码示例：

```js
const sorted = [...array].sort();
```

以下是此规则的**正确**代码示例：

```js
const sorted = [...array].toSorted();
```

## 配置

此规则接受一个配置对象，包含以下属性：

### allowAfterSpread

type: `boolean`

default: `false`

当设置为 `true` 时，允许对通过展开运算符创建的新数组进行排序，例如 `[...iterable].sort()`。
在对 `Set` 等可迭代对象进行排序时，这可以避免使用 `toSorted()` 产生的双重内存分配。

当 `allowAfterSpread` 设置为 `true` 时，此规则的**正确**代码示例如下：

```js
const sorted = [...mySet].sort();
```

### allowExpressionStatement

type: `boolean`

default: `true`

当设置为 `true`（默认）时，允许将 `array.sort()` 作为表达式语句使用。
设置为 `false` 可禁止 `Array#sort()`，即使它是一个表达式语句。

将 `allowExpressionStatement` 设置为 `false` 时，此规则的**错误**代码示例如下：

```js
array.sort();
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.15.0 中添加。

## 参考资料

<RuleReferences />
