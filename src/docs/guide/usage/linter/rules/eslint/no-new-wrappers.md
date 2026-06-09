---
title: "eslint/no-new-wrappers | Oxlint"
rule: "eslint/no-new-wrappers"
category: "Pedantic"
version: "0.2.10"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://eslint.org/docs/latest/rules/no-new-wrappers"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_new_wrappers.rs`;
</script>

<RuleHeader />

### 它的作用

禁止对 `String`、`Number` 和 `Boolean` 对象使用 `new` 运算符。

### 这为什么不好？

第一个问题是，原始值包装对象实际上就是对象。这意味着 `typeof` 会返回 `"object"`，而不是 `"string"`、`"number"` 或 `"boolean"`。第二个问题出在布尔对象上。每个对象都是真值，这意味着 `Boolean` 的实例即使其实际值为 `false`，也总会解析为 `true`。

https://eslint.org/docs/latest/rules/no-new-wrappers

### 示例

以下是此规则的**错误**代码示例：

```js
var stringObject = new String("Hello world");
var numberObject = new Number(33);
var booleanObject = new Boolean(false);
var symbolObject = new Symbol("foo"); // symbol 不是构造函数
```

以下是此规则的**正确**代码示例：

```js
var stringObject = "Hello world";
var stringObject2 = String(value);
var numberObject = Number(value);
var booleanObject = Boolean(value);
var symbolObject = Symbol("foo");
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.10 中添加。

## 参考资料

<RuleReferences />
