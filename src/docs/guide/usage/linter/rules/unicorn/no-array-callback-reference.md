---
title: "unicorn/no-array-callback-reference | Oxlint"
rule: "unicorn/no-array-callback-reference"
category: "Pedantic"
version: "1.19.0"
default: false
type_aware: false
fix: "pending"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-callback-reference.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_array_callback_reference.rs`;
</script>

<RuleHeader />

### 它的作用

阻止将函数引用直接传递给迭代器方法。

### 为什么这不好？

将函数传递给迭代器方法可能会引发问题，因为函数在不知不觉中被修改了，而迭代器会向它额外传递 2 个参数（索引和数组）。
当函数签名发生变化时，这可能导致意外行为。

### 示例

以下是此规则的**错误**代码示例：

```js
const foo = array.map(callback);
array.forEach(callback);
const result = array.filter(lib.method);
```

以下是此规则的**正确**代码示例：

```js
const foo = array.map((element) => callback(element));
array.forEach((element) => {
  callback(element);
});
const result = array.filter((element) => lib.method(element));

// 内置函数是允许的
const foo = array.map(String);
const bar = array.filter(Boolean);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.19.0 中新增。

## 参考资料

<RuleReferences />
