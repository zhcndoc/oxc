---
title: "eslint/no-unneeded-ternary | Oxlint"
rule: "eslint/no-unneeded-ternary"
category: "Suspicious"
version: "0.15.12"
default: false
type_aware: false
fix: "fixable_dangerous_fix"
upstream: "https://eslint.org/docs/latest/rules/no-unneeded-ternary"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_unneeded_ternary.rs`;
</script>

<RuleHeader />

### 它的作用

当存在更简单的替代方案时，禁止使用三元运算符。

### 为什么这不好？

在 JavaScript 中，常见的错误是使用条件表达式在两个布尔值之间进行选择，而不是使用 ! 将测试结果转换为布尔值。

另一个常见错误是将单个变量同时用作条件测试和后果表达式。在这种情况下，可以使用逻辑或来提供相同的功能。

### 示例

以下是此规则的**错误**代码示例：

```js
const isYes = answer === 1 ? true : false;
const isNo = answer === 1 ? false : true;

foo(bar ? bar : 1);
```

以下是此规则的**正确**代码示例：

```js
const isYes = answer === 1;
const isNo = answer !== 1;

foo(bar || 1);
```

## 配置

此规则接受一个配置对象，包含以下属性：

### defaultAssignment

type: `boolean`

default: `true`

是否允许默认赋值模式 `x ? x : y`。

当设置为 `false` 时，该规则也会标记像 `x ? x : y` 这样的情况，并建议改用
逻辑或形式 `x || y`。当为 `true`（默认值）时，这类默认赋值是允许的，不会被报告。

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.15.12 中添加的。

## 参考

<RuleReferences />
