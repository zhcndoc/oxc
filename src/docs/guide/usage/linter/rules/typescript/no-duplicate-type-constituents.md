---
title: "typescript/no-duplicate-type-constituents | Oxlint"
rule: "typescript/no-duplicate-type-constituents"
category: "正确性"
version: "1.12.0"
default: true
type_aware: true
fix: "fixable_fix"
upstream: "https://typescript-eslint.io/rules/no-duplicate-type-constituents/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_duplicate_type_constituents.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_duplicate_type_constituents/no_duplicate_type_constituents.go`;
</script>

<RuleHeader />

### 作用

此规则不允许联合类型或交叉类型中存在重复的组成项。

### 为什么这不好？

联合类型和交叉类型中的重复组成项没有任何意义，并且会使代码更难阅读。它们很可能是一个错误。

### 示例

此规则的**错误**代码示例：

```ts
type T1 = "A" | "A";

type T2 = A | A | B;

type T3 = { a: string } & { a: string };

type T4 = [A, A];

type T5 = "foo" | "bar" | "foo";
```

此规则的**正确**代码示例：

```ts
type T1 = "A" | "B";

type T2 = A | B | C;

type T3 = { a: string } & { b: string };

type T4 = [A, B];

type T5 = "foo" | "bar" | "baz";
```

## 配置

此规则接受一个包含以下属性的配置对象：

### ignoreIntersections

type: `boolean`

default: `false`

是否忽略交叉类型中的重复类型。
当为 true 时，允许 `type T = A & A`。

### ignoreUnions

type: `boolean`

default: `false`

是否忽略联合类型中的重复类型。
当为 true 时，允许 `type T = A | A`。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.12.0 中添加。

## 参考资料

<RuleReferences />
