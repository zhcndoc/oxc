---
title: "eslint/operator-assignment | Oxlint"
rule: "eslint/operator-assignment"
category: "Style"
version: "0.15.13"
default: false
type_aware: false
fix: "fixable_dangerous_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/operator_assignment.rs`;
</script>

<RuleHeader />

### 它是做什么的

此规则在可能的情况下要求或禁止使用赋值运算符简写。
它鼓励使用 `+=`、`-=`、`*=`、`/=` 等简写赋值运算符，
以使代码更加简洁易读。

### 为什么这不好？

JavaScript 提供了将变量赋值和简单数学运算结合起来的简写运算符。不使用这些简写运算符会导致代码不必要地冗长，也可以被视为错失了提高清晰度和简洁性的机会。

### 示例

在默认 `always` 选项下，此规则的**错误**代码示例：

```js
x = x + y;
x = y * x;
x[0] = x[0] / y;
x.y = x.y << z;
```

在默认 `always` 选项下，此规则的**正确**代码示例：

```js
x = y;
x += y;
x = y * z;
x = x * y * z;
x[0] /= y;
x[foo()] = x[foo()] % 2;
x = y + x; // `+` 并不总是满足交换律（例如 x = "abc"）
```

在 `never` 选项下，此规则的**错误**代码示例：

```js
x *= y;
x ^= (y + z) / foo();
```

在 `never` 选项下，此规则的**正确**代码示例：

```js
x = x + y;
x.y = x.y / a.b;
```

## 配置

此规则接受以下字符串值之一：

### `"always"`

在可能的情况下要求使用赋值运算符简写。

### `"never"`

禁止使用赋值运算符简写。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.15.13 中加入。

## 参考

<RuleReferences />
