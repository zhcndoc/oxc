---
title: "typescript/no-wrapper-object-types | Oxlint"
rule: "typescript/no-wrapper-object-types"
category: "Correctness"
version: "0.8.0"
default: true
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_wrapper_object_types.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用包装对象类型。

### 为什么这不好？

包装对象类型是在全局作用域中定义的、不是原始类型的类型。这些类型不建议在 TypeScript 代码中使用。

### 示例

以下是此规则的**错误**代码示例：

```ts
let myBigInt: BigInt;
let myBoolean: Boolean;
let myNumber: Number;
let myString: String;
let mySymbol: Symbol;

let myObject: Object = "由 TypeScript 允许";
```

以下是此规则的**正确**代码示例：

```ts
let myBigint: bigint;
let myBoolean: boolean;
let myNumber: number;
let myString: string;
let mySymbol: symbol;

let myObject: object = "Type 'string' is not assignable to type 'object'.";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.8.0 中添加。

## 参考资料

<RuleReferences />
