---
title: "typescript/no-confusing-non-null-assertion | Oxlint"
rule: "typescript/no-confusing-non-null-assertion"
category: "Suspicious"
version: "0.6.1"
default: false
type_aware: false
fix: "pending"
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

在赋值或相等判断（=、== 或 ===）旁边使用非空断言（!）会使代码看起来像是不等判断（!= 或 !==），从而造成混淆。

### 示例

此规则的**错误**代码示例：

```ts
a! == b; // a 非空断言(`!`) 和相等测试(`==`)
a !== b; // 不等测试(`!==`)
a! === b; // a 非空断言(`!`) 和全等测试(`===`)
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
