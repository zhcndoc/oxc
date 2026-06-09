---
title: "typescript/no-unsafe-unary-minus | Oxlint"
rule: "typescript/no-unsafe-unary-minus"
category: "正确性"
version: "1.12.0"
default: true
type_aware: true
fix: "none"
upstream: "https://typescript-eslint.io/rules/no-unsafe-unary-minus/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_unsafe_unary_minus.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_unsafe_unary_minus/no_unsafe_unary_minus.go`;
</script>

<RuleHeader />

### 它的作用

此规则不允许对类型不是 'number' | 'bigint' 的值使用一元负号运算符。

### 为什么这不好？

一元负号运算符只应用于数值。对其他类型使用它可能会由于 JavaScript 的类型强制转换规则而导致意外行为。

### 示例

以下是此规则的**错误**代码示例：

```ts
declare const value: any;
const result1 = -value; // 对 any 不安全

declare const str: string;
const result2 = -str; // 对 string 不安全

declare const bool: boolean;
const result3 = -bool; // 对 boolean 不安全

declare const obj: object;
const result4 = -obj; // 对 object 不安全

declare const arr: any[];
const result5 = -arr; // 对数组不安全
```

以下是此规则的**正确**代码示例：

```ts
declare const num: number;
const result1 = -num; // 安全

declare const bigint: bigint;
const result2 = -bigint; // 安全

const literal = -42; // 安全

const bigintLiteral = -42n; // 安全

declare const union: number | bigint;
const result3 = -union; // 安全

// 如有需要，先转换为 number
declare const str: string;
const result4 = -Number(str); // 安全转换
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v1.12.0 中添加的。

## 参考资料

<RuleReferences />
