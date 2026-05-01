---
title: "typescript/no-unsafe-enum-comparison"
category: "Suspicious"
version: "1.12.0"
default: false
type_aware: true
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_unsafe_enum_comparison.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_unsafe_enum_comparison/no_unsafe_enum_comparison.go`;
</script>

<RuleHeader />

### 作用

此规则禁止将枚举值与非枚举值进行比较。

### 为什么这不好？

枚举值应当只与同一枚举类型的其他值，或以类型安全方式与其底层字面量值进行比较。将枚举与无关的值进行比较可能会导致意外行为，并且违背了使用枚举实现类型安全的目的。

### 示例

此规则的**错误**代码示例如下：

```ts
enum Status {
  Open = "open",
  Closed = "closed",
}

enum Color {
  Red = "red",
  Blue = "blue",
}

declare const status: Status;
declare const color: Color;
declare const str: string;

// 将枚举与不同枚举进行比较
if (status === color) {
} // 不安全

// 将枚举与字符串比较（除非它是一个匹配的字面量）
if (status === str) {
} // 不安全

// 与任意值比较
if (status === "unknown") {
} // 不安全
```

此规则的**正确**代码示例如下：

```ts
enum Status {
  Open = "open",
  Closed = "closed",
}

declare const status: Status;

// 与相同枚举值比较
if (status === Status.Open) {
} // 安全

// 与正确的字面量类型比较
if (status === "open") {
} // 安全

// 使用枚举方法
if (Object.values(Status).includes(someValue)) {
} // 一种安全的检查方式
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v1.12.0 中添加的。

## 参考资料

<RuleReferences />
