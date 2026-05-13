---
title: "typescript/no-array-delete | Oxlint"
rule: "typescript/no-array-delete"
category: "Correctness"
version: "1.12.0"
default: true
type_aware: true
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_array_delete.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_array_delete/no_array_delete.go`;
</script>

<RuleHeader />

### 它的作用

此规则不允许在数组值上使用 delete 运算符。

### 为什么这不好？

当在数组上使用 delete 运算符时，元素实际上并不会被移除，而是会将数组槽位变为 `undefined`。这通常不是预期行为。相反，你应该使用诸如 `Array.prototype.splice()` 之类的方法来正确地从数组中移除元素。

### 示例

此规则的**错误**代码示例：

```ts
declare const arr: number[];
delete arr[0];
```

此规则的**正确**代码示例：

```ts
declare const arr: number[];
arr.splice(0, 1);

// 或者使用 filter
const filteredArr = arr.filter((_, index) => index !== 0);

// 对对象使用 delete 是允许的
declare const obj: { a?: number };
delete obj.a;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v1.12.0。

## 参考资料

<RuleReferences />
