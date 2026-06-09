---
title: "eslint/no-iterator | Oxlint"
rule: "eslint/no-iterator"
category: "正确性"
version: "0.2.15"
default: true
type_aware: false
fix: "fixable_suggestion"
upstream: "https://eslint.org/docs/latest/rules/no-iterator"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_iterator.rs`;
</script>

<RuleHeader />

### 作用

禁止使用 `__iterator__` 属性。

### 为什么这不好？

`__iterator__` 属性是 JavaScript 的一个 SpiderMonkey 扩展，
可用于创建与 JavaScript 的 for in 和 for each 构造兼容的自定义迭代器。
然而，这个属性现在已经过时，因此不应再使用。下面是它
过去的工作方式示例：

```js
Foo.prototype.__iterator__ = function () {
  return new FooIterator(this);
};
```

### 示例

以下是此规则的**错误**代码示例：

```javascript
Foo.prototype.__iterator__ = function () {
  return new FooIterator(this);
};

foo.__iterator__ = function () {};

foo["__iterator__"] = function () {};
```

以下是此规则的**正确**代码示例：

```js
const __iterator__ = 42; // 未使用 __iterator__ 属性

Foo.prototype[Symbol.iterator] = function () {
  return new FooIterator(this);
};
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.2.15。

## 参考资料

<RuleReferences />
