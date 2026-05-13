---
title: "typescript/no-unsafe-argument | Oxlint"
rule: "typescript/no-unsafe-argument"
category: "Pedantic"
version: "1.12.0"
default: false
type_aware: true
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_unsafe_argument.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_unsafe_argument/no_unsafe_argument.go`;
</script>

<RuleHeader />

### 作用

此规则禁止使用类型为 `any` 的参数调用函数。

### 为什么这不好？

TypeScript 中的 `any` 类型是类型系统中一个危险的“逃生出口”。使用 `any` 会禁用大多数类型检查规则，通常是不安全的。当你将一个类型为 `any` 的值传递给函数时，就会失去该函数调用的类型安全。

### 示例

以下是此规则的**错误**代码示例：

```ts
declare const anyValue: any;

function takesString(str: string): void {
  console.log(str.length);
}

takesString(anyValue); // 不安全

declare function takesNumber(num: number): number;
const result = takesNumber(anyValue); // 不安全
```

以下是此规则的**正确**代码示例：

```ts
declare const stringValue: string;
declare const numberValue: number;
declare const unknownValue: unknown;

function takesString(str: string): void {
  console.log(str.length);
}

takesString(stringValue); // 安全

// 安全使用 unknown 的类型守卫
if (typeof unknownValue === "string") {
  takesString(unknownValue); // 经过类型守卫后安全
}

// 如果你确定类型，可使用类型断言
takesString(unknownValue as string); // 明确不安全，但这是有意为之
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.12.0 中添加。

## 参考资料

<RuleReferences />
