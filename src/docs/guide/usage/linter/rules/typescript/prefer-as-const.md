---
title: "typescript/prefer-as-const"
category: "Correctness"
version: "0.0.8"
default: true
type_aware: false
fix: "conditional_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/prefer_as_const.rs`;
</script>

<RuleHeader />

### 作用

强制优先使用 `as const`，而不是字面量类型。

### 为什么这不好？

有两种常见方式可以告诉 TypeScript，一个字面量值应当被解释为
其字面量类型（例如 `2`），而不是通用的基本类型（例如 `number`）；

`as const`：告诉 TypeScript 自动推断字面量类型
`as` 加字面量类型：显式告诉 TypeScript 该字面量类型

通常更推荐使用 `as const`，因为它不需要重新输入字面量值。
当显式字面量类型的 `as` 可以被 `as const` 替换时，此规则会报告。

### 示例

此规则的**错误**代码示例：

```ts
let bar: 2 = 2;
let foo = { bar: "baz" as "baz" };
```

此规则的**正确**代码示例：

```ts
let foo = "bar";
let foo = "bar" as const;
let foo: "bar" = "bar" as const;
let bar = "bar" as string;
let foo = { bar: "baz" };
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.8 中添加的。

## 参考

<RuleReferences />
