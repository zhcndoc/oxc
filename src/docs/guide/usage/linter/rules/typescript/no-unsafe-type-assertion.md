---
title: "typescript/no-unsafe-type-assertion | Oxlint"
rule: "typescript/no-unsafe-type-assertion"
category: "Suspicious"
version: "1.12.0"
default: false
type_aware: true
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_unsafe_type_assertion.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_unsafe_type_assertion/no_unsafe_type_assertion.go`;
</script>

<RuleHeader />

### 功能说明

禁止会缩小类型范围的不安全类型断言。

### 为什么这很糟糕？

会缩小类型范围的类型断言会绕过 TypeScript 的类型检查，并可能导致运行时错误。会扩大类型范围的类型断言是安全的，因为 TypeScript 本质上对某个类型“知道得更少”。与其使用类型断言来缩小类型范围，不如依赖类型守卫，它们有助于避免由不安全类型断言引起的潜在运行时错误。

### 示例

此规则的**错误**代码示例：

```ts
function f() {
  return Math.random() < 0.5 ? 42 : "oops";
}
const z = f() as number;

const items = [1, "2", 3, "4"];
const number = items[0] as number;
```

此规则的**正确**代码示例：

```ts
function f() {
  return Math.random() < 0.5 ? 42 : "oops";
}
const z = f() as number | string | boolean;

const items = [1, "2", 3, "4"];
const number = items[0] as number | string | undefined;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则新增于 v1.12.0。

## 参考资料

<RuleReferences />
