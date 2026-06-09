---
title: "typescript/prefer-literal-enum-member | Oxlint"
rule: "typescript/prefer-literal-enum-member"
category: "Restriction"
version: "0.3.2"
default: false
type_aware: false
fix: "none"
upstream: "https://typescript-eslint.io/rules/prefer-literal-enum-member/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/prefer_literal_enum_member.rs`;
</script>

<RuleHeader />

### 它的作用

显式的枚举值必须只使用字面量值（字符串、数字、布尔值等）。

### 为什么这不好？

TypeScript 允许枚举成员的值是许多不同类型的有效 JavaScript 表达式。
然而，由于枚举会创建自己的作用域，其中每个枚举成员都会成为该作用域中的一个变量，开发者往往会对最终得到的值感到惊讶。

### 示例

以下是此规则的**错误**代码示例：

```ts
const imOutside = 2;
const b = 2;
enum Foo {
  outer = imOutside,
  a = 1,
  b = a,
  c = b,
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowBitwiseExpressions

type: `boolean`

default: `false`

当设置为 `true` 时，允许在枚举成员初始化器中使用位运算表达式。
这包括按位非 (`~`)、与 (`&`)、或 (`|`)、异或 (`^`) 以及移位运算符 (`<<`、`>>`、`>>>`)。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.3.2 中添加。

## 参考资料

<RuleReferences />
