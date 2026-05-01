---
title: "typescript/prefer-nullish-coalescing"
category: "Pedantic"
version: "1.33.0"
default: false
type_aware: true
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/prefer_nullish_coalescing.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/prefer_nullish_coalescing/prefer_nullish_coalescing.go`;
</script>

<RuleHeader />

### 作用

强制在左操作数可能为 `null` 或 `undefined` 时，使用空值合并运算符（`??`）而不是逻辑或（`||`）
或条件表达式。

### 为什么这不好？

当左侧为任何假值（`false`、`0`、`''`、`null`、`undefined`、`NaN`）时，`||` 运算符会返回右侧值。
这可能会导致你只是想为 `null`
或 `undefined` 提供默认值时出现意外行为。

空值合并运算符（`??`）只会在左侧为 `null` 或 `undefined` 时返回右侧值，使意图更清晰，并避免与其他假值相关的错误。

### 示例

以下是此规则的**错误**代码示例：

```ts
declare const x: string | null;

// 当 ?? 更合适时使用 ||
const foo = x || "default";

// 可以使用 ?? 的三元表达式
const bar = x !== null && x !== undefined ? x : "default";
const baz = x != null ? x : "default";

// 可以使用 ?? 的 if 语句
let value = "default";
if (x !== null && x !== undefined) {
  value = x;
}
```

以下是此规则的**正确**代码示例：

```ts
declare const x: string | null;

// 使用空值合并
const foo = x ?? "default";

// 当你希望有假值行为时，|| 是可以的
declare const y: string;
const bar = y || "default";

// 布尔强制转换（可通过 ignoreBooleanCoercion 忽略）
const bool = Boolean(x || y);
```

## 配置

此规则接受一个包含以下属性的配置对象：

### ignoreBooleanCoercion

type: `boolean`

default: `false`

是否忽略传给 `Boolean` 构造函数的参数。

### ignoreConditionalTests

type: `boolean`

default: `true`

是否忽略位于条件测试中的案例。

### ignoreIfStatements

type: `boolean`

default: `false`

是否忽略任何可以通过使用空值合并运算符简化的 if 语句。

### ignoreMixedLogicalExpressions

type: `boolean`

default: `false`

是否忽略任何属于混合逻辑表达式（与 `&&` 组合）的逻辑或表达式。

### ignorePrimitives

type: `object | boolean`

表示在 JSON 中指定 `ignorePrimitives` 的不同方式。
可以是：

- `true` - 忽略所有原始类型
- 一个指定要忽略哪些原始类型的对象

#### ignorePrimitives.bigint

type: `boolean`

default: `false`

忽略 bigint 原始类型。

#### ignorePrimitives.boolean

type: `boolean`

default: `false`

忽略 boolean 原始类型。

#### ignorePrimitives.number

type: `boolean`

default: `false`

忽略 number 原始类型。

#### ignorePrimitives.string

type: `boolean`

default: `false`

忽略 string 原始类型。

### ignoreTernaryTests

type: `boolean`

default: `false`

是否忽略任何可以通过使用空值合并运算符简化的三元表达式。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.33.0 中添加。

## 参考资料

<RuleReferences />
