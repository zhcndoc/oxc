---
title: "unicorn/no-useless-spread | Oxlint"
rule: "unicorn/no-useless-spread"
category: "Correctness"
version: "0.0.19"
default: true
type_aware: false
fix: "fixable_dangerous_fix"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_useless_spread/mod.rs`;
</script>

<RuleHeader />

### 作用

在以下不必要的情况下，禁止使用展开语法：

- 将数组字面量作为数组字面量的元素展开
- 将数组字面量作为函数调用或 `new` 调用的参数展开
- 将对象字面量作为对象字面量的属性展开
- 使用展开语法克隆在内联创建的数组

### 为什么这不好？

以下内建对象接受可迭代对象，因此没有必要将可迭代对象转换为数组：

- `Map` 构造函数
- `WeakMap` 构造函数
- `Set` 构造函数
- `WeakSet` 构造函数
- `TypedArray` 构造函数
- `Array.from(…)`
- `TypedArray.from(…)`
- `Promise.{all,allSettled,any,race}(…)`
- `Object.fromEntries(…)`

`for…of` 循环可以迭代任何可迭代对象，不仅仅是数组，因此没有必要将可迭代对象转换为数组。

`yield*` 可以委托给另一个可迭代对象，因此没有必要将可迭代对象转换为数组。

### 示例

此规则的**错误**代码示例：

```javascript
const array = [firstElement, ...[secondElement], thirdElement];

await Promise.all([...iterable]);

for (const foo of [...set]);

function* foo() {
  yield* [...anotherGenerator()];
}

function foo(bar) {
  return [...bar.map((x) => x * 2)];
}
```

此规则的**正确**代码示例：

```javascript
const array = [firstElement, secondElement, thirdElement];

await Promise.all(iterable);

for (const foo of set);

function* foo() {
  yield* anotherGenerator();
}

function foo(bar) {
  return bar.map((x) => x * 2);
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.19 中添加。

## 参考

<RuleReferences />
