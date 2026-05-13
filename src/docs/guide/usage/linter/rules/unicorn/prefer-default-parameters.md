---
title: "unicorn/prefer-default-parameters | Oxlint"
rule: "unicorn/prefer-default-parameters"
category: "Style"
version: "1.33.0"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 本文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_default_parameters.rs`;
</script>

<RuleHeader />

### 它的作用

应使用默认参数，而不是重新赋值函数参数。当 `foo` 为假值时，`foo = foo || 123` 语句会求值为 `123`，这可能导致令人困惑的行为；而默认参数只会在传入 `undefined` 值时生效。
此规则只会报告对字面量值的重新赋值。

如果你希望函数以处理 `null` 和其他假值的方式与 `undefined` 相同，请禁用此规则。
默认参数仅在 [接收到 `undefined` 时](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters#passing_undefined_vs._other_falsy_values) 应用。
不过，我们建议 [逐步摆脱 `null`](https://github.com/sindresorhus/meta/discussions/7)。

### 为什么这很糟糕？

使用默认参数可以清楚地表明某个参数具有默认值，从而提升代码的可读性和可维护性。

### 示例

以下是此规则的**错误**代码示例：

```js
function abc(foo) {
  foo = foo || "bar";
}

function abc(foo) {
  const bar = foo || "bar";
}
```

以下是此规则的**正确**代码示例：

```js
function abc(foo = "bar") {}

function abc(bar = "bar") {}

function abc(foo) {
  foo = foo || bar();
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v1.33.0 中添加的。

## 参考资料

<RuleReferences />
