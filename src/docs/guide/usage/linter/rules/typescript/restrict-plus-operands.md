---
title: "typescript/restrict-plus-operands | Oxlint"
rule: "typescript/restrict-plus-operands"
category: "谨慎"
version: "1.12.0"
default: false
type_aware: true
fix: "none"
upstream: "https://typescript-eslint.io/rules/restrict-plus-operands/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/restrict_plus_operands.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/restrict_plus_operands/restrict_plus_operands.go`;
</script>

<RuleHeader />

### 它的作用

此规则要求加法运算的两个操作数类型必须相同，并且必须是 number、string 或 any。

### 为什么这很糟糕？

JavaScript 的 + 运算符既可以用于数值加法，也可以用于字符串拼接。当操作数类型不同时，JavaScript 的类型转换规则可能会导致意外结果。此规则通过要求两个操作数具有兼容类型，帮助防止这些问题。

### 示例

此规则的**错误**代码示例：

```ts
declare const num: number;
declare const str: string;
declare const bool: boolean;
declare const obj: object;

// 混合类型
const result1 = num + str; // number + string
const result2 = str + bool; // string + boolean
const result3 = num + bool; // number + boolean
const result4 = obj + str; // object + string

// 不同类型的字面量
const result5 = 42 + "hello"; // number 字面量 + string 字面量
const result6 = true + 5; // boolean 字面量 + number 字面量
```

此规则的**正确**代码示例：

```ts
declare const num1: number;
declare const num2: number;
declare const str1: string;
declare const str2: string;

// 相同类型
const sum = num1 + num2; // number + number
const concat = str1 + str2; // string + string

// 显式转换
const result1 = num1 + String(num2); // 先转换为字符串
const result2 = String(num1) + str1; // 先转换为字符串
const result3 = Number(str1) + num1; // 先转换为数字

// 用模板字面量进行字符串拼接
const result4 = `${num1}${str1}`; // 明确要进行拼接

// 相同类型的字面量
const numResult = 42 + 58; // number + number
const strResult = "hello" + "world"; // string + string
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowAny

type: `boolean`

default: `true`

是否允许在加法运算中使用 `any` 类型。

### allowBoolean

type: `boolean`

default: `true`

是否允许在加法运算中使用 `boolean` 类型。

### allowNullish

type: `boolean`

default: `true`

是否允许在加法运算中使用空值类型（`null` 或 `undefined`）。

### allowNumberAndString

type: `boolean`

default: `true`

是否允许在加法运算中混用 number 和 string 操作数。

### allowRegExp

type: `boolean`

default: `true`

是否允许在加法运算中使用 `RegExp` 类型。

### skipCompoundAssignments

type: `boolean`

default: `false`

是否跳过复合赋值（例如 `a += b`）。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.12.0 中添加。

## 参考资料

<RuleReferences />
