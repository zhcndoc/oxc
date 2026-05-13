---
title: "typescript/no-non-null-assertion | Oxlint"
rule: "typescript/no-non-null-assertion"
category: "Restriction"
version: "0.5.0"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_non_null_assertion.rs`;
</script>

<RuleHeader />

### 作用

禁止使用 `!` 后缀运算符进行非空断言。

### 为什么这不好？

TypeScript 的 `!` 非空断言运算符会向类型系统断言某个表达式是非空的，也就是不是 `null` 或 `undefined`。使用断言向类型系统告知新信息，往往表明代码并非完全类型安全。通常更好的做法是组织程序逻辑，让 TypeScript 能够理解值何时可能为可空。

### 示例

此规则的**错误**代码示例：

```ts
x!;
x!.y;
x.y!;
```

此规则的**正确**代码示例：

```ts
x;
x?.y;
x.y;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.5.0 中添加。

## 参考资料

<RuleReferences />
