---
title: "typescript/prefer-optional-chain | Oxlint"
rule: "typescript/prefer-optional-chain"
category: "Nursery"
version: "1.39.0"
default: false
type_aware: true
fix: "fixable_dangerous_fix_or_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/prefer_optional_chain.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/prefer_optional_chain/prefer_optional_chain.go`;
</script>

<RuleHeader />

### 它的作用

强制使用简洁的可选链表达式，而不是链式逻辑与运算符、
取反的逻辑或运算符，或空对象。

请注意，此规则属于 nursery 类别，因为我们正在确保它在尽可能多的边缘情况场景中都能正确工作。
其逻辑较为复杂，在某些边缘情况下，自动修复可能会导致逻辑变化。

### 为什么这很糟糕？

TypeScript 3.7 引入了可选链（`?.`），它提供了一种更简洁、
更易读的方式来访问可能为 nullish 的值上的属性。使用可选链代替逻辑与链（`&&`）或其他模式可以提升代码清晰度。

### 示例

以下是此规则的**错误**代码示例：

```ts
foo && foo.bar;
foo && foo.bar && foo.bar.baz;
foo && foo["bar"];
foo && foo.bar && foo.bar.baz && foo.bar.baz.buzz;
foo && foo.bar && foo.bar.baz.buzz;
foo && foo.bar.baz && foo.bar.baz.buzz;
(foo || {}).bar;
```

以下是此规则的**正确**代码示例：

```ts
foo?.bar;
foo?.bar?.baz;
foo?.["bar"];
foo?.bar?.baz?.buzz;
foo?.bar?.baz.buzz;
foo?.bar.baz?.buzz;
foo?.bar;
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowPotentiallyUnsafeFixesThatModifyTheReturnTypeIKnowWhatImDoing

type: `boolean`

default: `false`

允许会更改表达式返回类型的自动修复器。
此选项被视为不安全，因为它可能会破坏构建。

### checkAny

type: `boolean`

default: `true`

在检查“宽松布尔”操作数时，检查类型为 `any` 的操作数。

### checkBigInt

type: `boolean`

default: `true`

在检查“宽松布尔”操作数时，检查类型为 `bigint` 的操作数。

### checkBoolean

type: `boolean`

default: `true`

在检查“宽松布尔”操作数时，检查类型为 `boolean` 的操作数。

### checkNumber

type: `boolean`

default: `true`

在检查“宽松布尔”操作数时，检查类型为 `number` 的操作数。

### checkString

type: `boolean`

default: `true`

在检查“宽松布尔”操作数时，检查类型为 `string` 的操作数。

### checkUnknown

type: `boolean`

default: `true`

在检查“宽松布尔”操作数时，检查类型为 `unknown` 的操作数。

### requireNullish

type: `boolean`

default: `false`

在检查“宽松布尔”操作数时，跳过未使用 `null` 和/或 `undefined` 类型标注的操作数。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.39.0 中添加。

## 参考

<RuleReferences />
