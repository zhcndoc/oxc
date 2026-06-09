---
title: "typescript/no-unsafe-return | Oxlint"
rule: "typescript/no-unsafe-return"
category: "Pedantic"
version: "1.12.0"
default: false
type_aware: true
fix: "none"
upstream: "https://typescript-eslint.io/rules/no-unsafe-return/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_unsafe_return.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_unsafe_return/no_unsafe_return.go`;
</script>

<RuleHeader />

### 它的作用

此规则不允许从函数中返回类型为 `any` 的值。

### 为什么这很糟糕？

TypeScript 中的 `any` 类型会禁用类型检查。当你从函数中返回一个标注为 `any` 的值时，本质上就是把类型安全问题转移给调用者，而没有对函数实际返回内容提供任何保证。

### 示例

此规则的**错误**代码示例：

```ts
declare const anyValue: any;

function getString(): string {
  return anyValue; // 不安全的返回
}

const getNumber = (): number => anyValue; // 不安全的返回

function processData(): { name: string; age: number } {
  return anyValue; // 不安全的返回
}
```

此规则的**正确**代码示例：

```ts
declare const stringValue: string;
declare const numberValue: number;
declare const unknownValue: unknown;

function getString(): string {
  return stringValue; // 安全
}

const getNumber = (): number => numberValue; // 安全

function processUnknown(): unknown {
  return unknownValue; // 安全 - 显式返回 unknown
}

// 用于安全返回的类型守卫
function safeGetString(): string | null {
  if (typeof unknownValue === "string") {
    return unknownValue; // 类型守卫后安全
  }
  return null;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v1.12.0 中添加的。

## 参考资料

<RuleReferences />
