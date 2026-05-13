---
title: "typescript/no-for-in-array | Oxlint"
rule: "typescript/no-for-in-array"
category: "正确性"
version: "1.12.0"
default: true
type_aware: true
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_for_in_array.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_for_in_array/no_for_in_array.go`;
</script>

<RuleHeader />

### 它的作用

此规则禁止使用 for-in 循环遍历数组。

### 为什么这不好？

for-in 循环会遍历对象的可枚举属性，这不仅包括数组索引，还包括添加到数组原型或数组实例上的任何可枚举属性。在遍历数组时，这几乎从来不是你想要的行为。

### 示例

此规则的**错误**代码示例：

```ts
const arr = [1, 2, 3];

for (const i in arr) {
  console.log(arr[i]);
}

for (const i in arr) {
  console.log(i, arr[i]);
}
```

此规则的**正确**代码示例：

```ts
const arr = [1, 2, 3];

// 使用 for-of 遍历数组值
for (const value of arr) {
  console.log(value);
}

// 使用带索引的普通 for 循环
for (let i = 0; i < arr.length; i++) {
  console.log(i, arr[i]);
}

// 使用 forEach
arr.forEach((value, index) => {
  console.log(index, value);
});

// for-in 适用于对象
const obj = { a: 1, b: 2 };
for (const key in obj) {
  console.log(key, obj[key]);
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.12.0 中添加。

## 参考资料

<RuleReferences />
