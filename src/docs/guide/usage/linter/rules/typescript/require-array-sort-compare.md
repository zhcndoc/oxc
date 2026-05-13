---
title: "typescript/require-array-sort-compare | Oxlint"
rule: "typescript/require-array-sort-compare"
category: "正确性"
version: "1.12.0"
default: true
type_aware: true
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/require_array_sort_compare.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/require_array_sort_compare/require_array_sort_compare.go`;
</script>

<RuleHeader />

### 它的作用

此规则要求调用 `Array#sort()` 时必须传入一个比较函数。

### 为什么这很糟糕？

当调用 `Array#sort()` 时如果不提供比较函数，它会将元素转换为字符串并按字典序排序。这通常会导致意外结果，尤其是对于数字，例如 `[1, 10, 2].sort()` 返回的是 `[1, 10, 2]`，而不是 `[1, 2, 10]`。

### 示例

以下是此规则的**错误**代码示例：

```ts
const numbers = [3, 1, 4, 1, 5];
numbers.sort(); // 按字典序排序，不是按数值排序

const mixedArray = ["10", "2", "1"];
mixedArray.sort(); // 这可能是有意为之，但显式传入 compareFn 更清晰

[3, 1, 4].sort(); // 将按字符串排序：['1', '3', '4']
```

以下是此规则的**正确**代码示例：

```ts
const numbers = [3, 1, 4, 1, 5];

// 数值排序
numbers.sort((a, b) => a - b);

// 反向数值排序
numbers.sort((a, b) => b - a);

// 字符串排序（显式）
const strings = ["banana", "apple", "cherry"];
strings.sort((a, b) => a.localeCompare(b));

// 自定义对象排序
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
];

people.sort((a, b) => a.age - b.age);
people.sort((a, b) => a.name.localeCompare(b.name));
```

## 配置

此规则接受一个包含以下属性的配置对象：

### ignoreStringArrays

type: `boolean`

default: `true`

是否忽略所有元素均为字符串的数组。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.12.0 中添加。

## 参考

<RuleReferences />
