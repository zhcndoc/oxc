---
title: "eslint/valid-typeof | Oxlint"
rule: "eslint/valid-typeof"
category: "正确性"
version: "0.0.3"
default: true
type_aware: false
fix: "conditional_fix"
upstream: "https://eslint.org/docs/latest/rules/valid-typeof"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/valid_typeof.rs`;
</script>

<RuleHeader />

### 作用

强制将 `typeof` 表达式与有效字符串进行比较。

### 为什么这不好？

对于绝大多数用例，`typeof` 运算符的结果是以下字符串字面量之一：`"undefined"`、`"object"`、`"boolean"`、`"number"`、`"string"`、
`"function"`、`"symbol"` 和 `"`bigint"`。将 `typeof` 运算符的结果与其他字符串字面量进行比较通常是一个类型错误。

### 示例

以下是此规则的**错误**代码示例：

```js
typeof foo === "strnig";
typeof foo == "undefimed";
typeof bar != "nunber"; // spellchecker:disable-line
typeof bar !== "fucntion"; // spellchecker:disable-line
```

以下是此规则的**正确**代码示例：

```js
typeof foo === "string";
typeof bar == "undefined";
typeof foo === baz;
typeof bar === typeof qux;
```

## 配置

此规则接受一个包含以下属性的配置对象：

### requireStringLiterals

type: `boolean`

default: `false`

当 `requireStringLiterals` 选项设置为 `true` 时，只允许将 `typeof`
表达式与字符串字面量或其他 `typeof` 表达式进行比较，并禁止与任何其他值进行比较。默认值为 `false`。

当 `requireStringLiterals` 设置为 `true` 时，以下是**错误**代码示例：

```js
typeof foo === undefined;
typeof bar == Object;
typeof baz === "strnig";
typeof qux === "some invalid type";
typeof baz === anotherVariable;
typeof foo == 5;
```

当 `requireStringLiterals` 设置为 `true` 时，以下是**正确**代码示例：

```js
typeof foo === "undefined";
typeof bar == "object";
typeof baz === "string";
typeof bar === typeof qux;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.3 中加入。

## 参考

<RuleReferences />
