---
title: "eslint/no-unexpected-multiline | Oxlint"
rule: "eslint/no-unexpected-multiline"
category: "Suspicious"
version: "0.9.7"
default: false
type_aware: false
fix: "fixable_dangerous_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_unexpected_multiline.rs`;
</script>

<RuleHeader />

### 它的作用

在大多数情况下，JavaScript 中并不需要分号，代码也能按预期被解析并执行。通常这是因为分号会根据一组固定规则自动插入。此规则用于检测那些分号不会被自动插入、并且可能会被解析得与预期不同的情况。

### 为什么这很糟糕？

带有意外换行的代码，其解析和执行结果可能与开发者的意图不同。这会导致难以追踪的错误。

### 示例

此规则的**错误**代码示例：

```js
var a = b(x || y).doSomething();

var a = b[(a, b, c)].forEach(doSomething);

let x = (function () {})`hello`;

foo / bar / g.test(baz);
```

此规则的**正确**代码示例：

```js
var a = b;
(x || y).doSomething();

var a = b;
[a, b, c].forEach(doSomething);

let x = function () {};
`hello`;

foo;
/bar/g.test(baz);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.9.7 中添加。

## 参考资料

<RuleReferences />
