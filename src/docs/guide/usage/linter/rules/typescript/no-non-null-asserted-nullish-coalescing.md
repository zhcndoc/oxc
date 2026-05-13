---
title: "typescript/no-non-null-asserted-nullish-coalescing | Oxlint"
rule: "typescript/no-non-null-asserted-nullish-coalescing"
category: "Restriction"
version: "0.5.0"
default: false
type_aware: false
fix: "可修复的建议"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_non_null_asserted_nullish_coalescing.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在空值合并运算符的左操作数中使用非空断言。

### 为什么这不好？

`??` 空值合并运行时运算符允许在处理 `null` 或 `undefined` 时提供默认值。在
空值合并运算符的左操作数中使用 `!` 非空断言类型运算符是多余的，而且很可能表明程序员出错，或者
对这两个运算符存在混淆。

### 示例

以下是此规则的**错误**代码示例：

```ts
foo! ?? bar;
foo.bazz! ?? bar;
foo!.bazz! ?? bar;
foo()! ?? bar;

let x!: string;
x! ?? "";

let x: string;
x = foo();
x! ?? "";
```

以下是此规则的**正确**代码示例：

```ts
foo ?? bar;
foo ?? bar!;
foo!.bazz ?? bar;
foo!.bazz ?? bar!;
foo() ?? bar;
```

```ts
// 由于用户无法满足该条件，因此这被视为正确代码。
let x: string;
x! ?? "";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.5.0 中添加。

## 参考资料

<RuleReferences />
