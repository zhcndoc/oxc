---
title: "typescript/no-confusing-non-null-assertion | Oxlint"
rule: "typescript/no-confusing-non-null-assertion"
category: "Suspicious"
version: "0.6.1"
default: false
type_aware: false
fix: "pending"
upstream: "https://typescript-eslint.io/rules/no-confusing-non-null-assertion/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_confusing_non_null_assertion.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在可能引起混淆的位置使用非空断言。

### 为什么这很糟糕？

在赋值或相等性检查（`=`、`==` 或 `===`）旁边使用非空断言（`!`），会产生令人困惑的代码，因为它看起来类似于不等性检查（`!=` 或
`!==`）。在 `in` 或 `instanceof` 检查旁边使用非空断言也会令人困惑，因为它看起来可能像是对运算符进行了否定。

### 示例

此规则的**错误**代码示例：

```ts
a! == b; // 非空断言（`!`）和相等性测试（`==`）
a !== b; // 不等性测试（`!==`）
a! === b; // 非空断言（`!`）和全等性测试（`===`）
a! in b;
a! instanceof b;
```

此规则的**正确**代码示例：

```ts
a == b;
a !== b;
a === b;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.6.1 中加入。

## 参考资料

<RuleReferences />
