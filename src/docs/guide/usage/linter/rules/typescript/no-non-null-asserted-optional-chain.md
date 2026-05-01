---
title: "typescript/no-non-null-asserted-optional-chain"
category: "正确性"
version: "0.0.6"
default: true
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_non_null_asserted_optional_chain.rs`;
</script>

<RuleHeader />

### 作用

禁止在可选链表达式后使用非空断言。

### 为什么这不好？

按照设计，如果被访问的对象是 `null` 或 `undefined`，可选链表达式（`?.`）会返回 `undefined` 作为表达式的值，而不会抛出错误。使用非空断言（`!`）去断言可选链表达式的结果是自相矛盾且很可能是错误的，因为这表示代码既期望该值可能为 `null` 或 `undefined`，又同时期望它非空。

在大多数情况下，要么：

1. 该对象不是可空的，因此其属性查找并不需要 `?.`
2. 非空断言是错误的，并引入了类型安全漏洞。

### 示例

以下是此规则的**错误**代码示例：

```ts
foo?.bar!;
foo?.bar()!;
```

以下是此规则的**正确**代码示例：

```ts
foo?.bar;
foo.bar!;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.6 中添加。

## 参考资料

<RuleReferences />
