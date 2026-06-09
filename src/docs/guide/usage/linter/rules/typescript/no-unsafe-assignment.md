---
title: "typescript/no-unsafe-assignment | Oxlint"
rule: "typescript/no-unsafe-assignment"
category: "教育性"
version: "1.12.0"
default: false
type_aware: true
fix: "none"
upstream: "https://typescript-eslint.io/rules/no-unsafe-assignment/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_unsafe_assignment.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_unsafe_assignment/no_unsafe_assignment.go`;
</script>

<RuleHeader />

### 它的作用

此规则不允许将类型为 `any` 的值赋给变量和属性。

### 为什么这很糟糕？

TypeScript 中的 `any` 类型会禁用类型检查，并且可能导致运行时错误。当你将一个 `any` 值赋给一个有类型的变量时，本质上是在绕过 TypeScript 的类型安全，而对实际值没有任何保证。

### 示例

以下是此规则的**错误**代码示例：

```ts
declare const anyValue: any;

const str: string = anyValue; // 不安全的赋值

let num: number;
num = anyValue; // 不安全的赋值

const obj = {
  prop: anyValue as any, // 不安全的赋值
};

interface User {
  name: string;
  age: number;
}

const user: User = anyValue; // 不安全的赋值
```

以下是此规则的**正确**代码示例：

```ts
declare const stringValue: string;
declare const numberValue: number;
declare const unknownValue: unknown;

const str: string = stringValue; // 安全

let num: number;
num = numberValue; // 安全

// 对 unknown 使用类型守卫
if (typeof unknownValue === "string") {
  const str2: string = unknownValue; // 类型守卫之后安全
}

// 显式 any 赋值（仍不推荐，但这是有意为之）
const anything: any = unknownValue;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v1.12.0。

## 参考资料

<RuleReferences />
