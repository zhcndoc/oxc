---
title: "typescript/no-unsafe-call | Oxlint"
rule: "typescript/no-unsafe-call"
category: "Pedantic"
version: "1.12.0"
default: false
type_aware: true
fix: "none"
upstream: "https://typescript-eslint.io/rules/no-unsafe-call/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_unsafe_call.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_unsafe_call/no_unsafe_call.go`;
</script>

<RuleHeader />

### 它的作用

此规则禁止调用类型为 `any` 的值。

### 为什么这不好？

TypeScript 中的 `any` 类型会禁用类型检查。当你调用一个被类型标注为 `any` 的值时，TypeScript 无法验证它实际上是否是一个函数、它期望哪些参数，或者它会返回什么。这可能导致运行时错误。

### 示例

此规则的**错误**代码示例：

```ts
declare const anyValue: any;

anyValue(); // 不安全的调用

anyValue(1, 2, 3); // 不安全的调用

const result = anyValue("hello"); // 不安全的调用

// 链式不安全调用
anyValue().then().catch(); // 不安全
```

此规则的**正确**代码示例：

```ts
declare const fn: () => void;
declare const fnWithParams: (a: number, b: string) => boolean;
declare const unknownValue: unknown;

fn(); // 安全

const result = fnWithParams(1, "hello"); // 安全

// unknown 的类型守卫
if (typeof unknownValue === "function") {
  unknownValue(); // 在类型守卫后是安全的
}

// 如果你确定，可以显式类型断言
(anyValue as () => void)(); // 明确不安全，但这是有意为之
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v1.12.0 中添加。

## 参考资料

<RuleReferences />
