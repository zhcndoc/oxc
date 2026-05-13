---
title: "oxc/no-accumulating-spread | Oxlint"
rule: "oxc/no-accumulating-spread"
category: "Perf"
version: "0.0.19"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/no_accumulating_spread.rs`;
</script>

<RuleHeader />

### 作用

禁止在 `Array.prototype.reduce()` 和循环中对累加器使用对象或数组展开语法。

### 为什么这不好？

对象和数组展开语法会在每次迭代时创建一个新的对象或数组。
在最坏情况下，它们还会导致 O(n) 次拷贝（包括内存和时间复杂度）。
当用于累加器时，这可能会导致 `O(n^2)` 的内存复杂度和
`O(n^2)` 的时间复杂度。

如需更深入的解释，请参阅这篇由 Prateek Surana 撰写的
[博客文章](https://prateeksurana.me/blog/why-using-object-spread-with-reduce-bad-idea/)。

### 示例

以下是此规则的**错误**代码示例：

```javascript
arr.reduce((acc, x) => ({ ...acc, [x]: fn(x) }), {});
Object.keys(obj).reduce((acc, el) => ({ ...acc, [el]: fn(el) }), {});

let foo = [];
for (let i = 0; i < 10; i++) {
  foo = [...foo, i];
}
```

以下是此规则的**正确**代码示例：

```javascript
function fn(x) {
  // ...
}

arr.reduce((acc, x) => acc.push(fn(x)), []);
Object.keys(obj).reduce((acc, el) => {
  acc[el] = fn(el);
}, {});
// 对非累加器使用展开语法应尽可能避免，但本规则不禁止
Object.keys(obj).reduce((acc, el) => {
  acc[el] = { ...obj[el] };
  return acc;
}, {});

let foo = [];
for (let i = 0; i < 10; i++) {
  foo.push(i);
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则新增于 v0.0.19。

## 参考资料

<RuleReferences />
