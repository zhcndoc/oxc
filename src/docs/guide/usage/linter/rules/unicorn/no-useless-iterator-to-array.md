---
title: "unicorn/no-useless-iterator-to-array | Oxlint"
rule: "unicorn/no-useless-iterator-to-array"
category: "Nursery"
version: "1.59.0"
default: false
type_aware: false
fix: "fixable_safe_fix_or_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_useless_iterator_to_array.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在迭代器上不必要地使用 `.toArray()`。

### 为什么这很糟糕？

[`Iterator.prototype.toArray()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/toArray)
会将迭代器转换为数组。然而，在许多情况下，这种转换是不必要的：

- 以下内建对象可直接接受可迭代对象：
  - `Map` 构造函数
  - `WeakMap` 构造函数
  - `Set` 构造函数
  - `WeakSet` 构造函数
  - `TypedArray` 构造函数
  - `Array.from(…)`
  - `TypedArray.from(…)`
  - `Object.fromEntries(…)`
- `for…of` 可以遍历任何可迭代对象，因此先转换为数组是不必要的。
- `yield*` 可以委托给任何可迭代对象，因此先转换为数组是不必要的。
- `Promise.{all,allSettled,any,race}(…)` 接受可迭代对象，因此 `.toArray()` 是不必要的。
  这里移除 `.toArray()` 可能会在迭代失败时将同步抛出改为异步拒绝，
  因此这些情况被视为建议，而不是自动修复。
- 展开运算符（`...`）可用于任何可迭代对象，因此先转换为数组是不必要的。
- 某些 `Array` 方法在 `Iterator` 上也存在，因此先转换为数组再调用它们是不必要的：
  - `.every()`
  - `.find()`
  - `.forEach()`
  - `.reduce()`
  - `.some()`

`Array` 回调会接收额外参数（例如第 3 个 `array` 参数），而 `Iterator` 回调不会。
如果回调依赖这些额外参数，移除 `.toArray()` 可能会改变行为，因此这些情况会被报告为建议。

此规则不会标记 `.filter()`、`.map()` 或 `.flatMap()`，因为它们在 `Iterator` 上的版本返回的是迭代器，而不是数组，因此语义不同。

### 示例

以下是此规则的**错误**代码示例：

```js
const set = new Set(iterator.toArray());

const results = await Promise.all(iterator.toArray());

for (const item of iterator.toArray());

function* foo() {
  yield* iterator.toArray();
}

const items = [...iterator.toArray()];

call(...iterator.toArray());

iterator.toArray().every(fn);
```

以下是此规则的**正确**代码示例：

```js
const set = new Set(iterator);

const results = await Promise.all(iterator);

for (const item of iterator);

function * foo() {
	yield * iterator;
}

const items = [...iterator];

call(...iterator);

iterator.every(fn);

`.filter()` 在 Array 上返回数组，但在 Iterator 上返回迭代器
iterator.toArray().filter(fn);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v1.59.0 中添加的。

## 参考资料

<RuleReferences />
