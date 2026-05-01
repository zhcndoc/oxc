---
title: "unicorn/no-array-sort"
category: "Suspicious"
version: "1.15.0"
default: false
type_aware: false
fix: "fixable_fix"
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
