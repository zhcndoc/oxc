---
title: "unicorn/prefer-array-some | Oxlint"
rule: "unicorn/prefer-array-some"
category: "Pedantic"
version: "0.0.18"
default: false
type_aware: false
fix: "fixable_suggestion"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-some.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_array_some.rs`;
</script>

<RuleHeader />

### 它的作用

优先使用 [`Array#some()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) 而不是 [`Array#find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)、与 `undefined` 比较的 [`Array#findLast()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast)，
或 [`Array#findIndex()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)、[`Array#findLastIndex()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex)
以及对 [`Array#filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 结果进行非零长度检查

### 为什么这不好？

使用 `.some()` 更符合惯用写法，也更容易阅读。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const foo = array.find(fn) ? bar : baz;
const foo = array.findLast((elem) => hasRole(elem)) !== null;
foo.findIndex(bar) < 0;
foo.findIndex((element) => element.bar === 1) !== -1;
foo.findLastIndex((element) => element.bar === 1) !== -1;
array.filter(fn).length === 0;
```

以下是此规则的**正确**代码示例：

```javascript
const foo = array.some(fn) ? bar : baz;
foo.some((element) => element.bar === 1);
!array.some(fn);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.18 中加入。

## 参考资料

<RuleReferences />
