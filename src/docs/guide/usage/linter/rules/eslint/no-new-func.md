---
title: "eslint/no-new-func | Oxlint"
rule: "eslint/no-new-func"
category: "样式"
version: "0.9.2"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-new-func"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_new_func.rs`;
</script>

<RuleHeader />

### 作用

禁止将 `new` 运算符与 `Function` 对象一起使用。

### 为什么这不好？

使用 `new Function` 或 `Function` 会导致代码难以理解和维护。它可能带来与 `eval` 类似的安全风险，因为它会从字符串代码生成一个新函数，这可能成为注入攻击的载体。此外，这些函数不会被 JavaScript 引擎优化，因此会对性能产生负面影响。

### 示例

以下是此规则的**错误**代码示例：

```js
var x = new Function("a", "b", "return a + b");
var x = Function("a", "b", "return a + b");
var x = Function.call(null, "a", "b", "return a + b");
var x = Function.apply(null, ["a", "b", "return a + b"]);
var x = Function.bind(null, "a", "b", "return a + b")();
var f = Function.bind(null, "a", "b", "return a + b");
```

以下是此规则的**正确**代码示例：

```js
let x = function (a, b) {
  return a + b;
};
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.9.2 中添加。

## 参考资料

<RuleReferences />
