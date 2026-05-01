---
title: "typescript/prefer-for-of"
category: "Style"
version: "0.2.16"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/prefer_for_of.rs`;
</script>

<RuleHeader />

### 它的作用

强制使用 for-of 循环，而不是用于简单迭代的 for 循环。

### 为什么这不好？

在数组上使用用于简单迭代的 for 循环，可以替换为更简洁、
更易读的 for-of 循环。for-of 循环更容易阅读，也更不容易出错，因为它们
消除了对索引变量和手动数组访问的需要。

### 示例

此规则的**错误**代码示例：

```typescript
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

此规则的**正确**代码示例：

```typescript
for (const item of arr) {
  console.log(item);
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.16 中添加。

## 参考资料

<RuleReferences />
