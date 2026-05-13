---
title: "typescript/no-empty-object-type | Oxlint"
rule: "typescript/no-empty-object-type"
category: "Restriction"
version: "0.12.0"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_empty_object_type.rs`;
</script>

<RuleHeader />

### 它的作用

为了避免关于 `{}` 类型允许任何非空值的混淆，此规则禁止使用 `{}` 类型。这包括没有字段的接口和对象类型别名。

### 为什么这不好？

在 TypeScript 中，`{}` 或“空对象”类型是不了解 TypeScript 结构化类型系统的开发者常见的困惑来源。`{}` 表示任何非 `null`/`undefined` 的值，包括像 `0` 和 `""` 这样的字面量。

通常，编写 `{}` 的开发者实际上想表达以下之一：

- object：表示任意对象值
- unknown：表示任意值，包括 `null` 和 `undefined`
  换句话说，“空对象”类型 `{}` 实际上表示“任何已定义的值”。这包括数组、类实例、函数，以及字符串和 symbol 等原始类型。

请注意，此规则不会报告以下情况：

- 在交叉类型中作为类型组成部分的 `{}`（例如 TypeScript 内置的 `type NonNullable<T> = T & {}` 这类类型），因为这在类型系统操作中可能很有用。
- 继承自多个其他接口的接口。

### 示例

此规则的**错误**代码示例：

```ts
let anyObject: {};
let anyValue: {};
interface AnyObjectA {}
interface AnyValueA {}
type AnyObjectB = {};
type AnyValueB = {};
```

此规则的**正确**代码示例：

```ts
let anyObject: object;
let anyValue: unknown;
type AnyObjectA = object;
type AnyValueA = unknown;
type AnyObjectB = object;
type AnyValueB = unknown;
let objectWith: { property: boolean };
interface InterfaceWith {
  property: boolean;
}
type TypeWith = { property: boolean };
```

## 配置

此规则接受一个具有以下属性的配置对象：

### allowInterfaces

type: `"never" | "always" | "with-single-extends"`

default: `"never"`

是否允许空接口。

#### `"never"`

从不允许没有字段的接口。

#### `"always"`

始终允许没有字段的接口。

#### `"with-single-extends"`

允许从单个基础接口 `extend` 而来的空接口。

此规则在 `{ allowInterfaces: 'with-single-extends' }` 配置下的**正确**代码示例：

```ts
interface Base {
  value: boolean;
}
interface Derived extends Base {}
```

### allowObjectTypes

type: `"never" | "always"`

default: `"never"`

是否允许空对象类型字面量。

#### `"never"`

从不允许没有字段的对象类型字面量。

#### `"always"`

始终允许没有字段的对象类型字面量。

### allowWithName

type: `string`

一个字符串化的正则表达式，用于允许使用配置名称的接口和对象类型别名。

如果你现有的代码风格中包含使用 `{}` 而不是 `object` 来声明空类型的模式，这会很有用。

此规则在 `{ allowWithName: 'Props$' }` 配置下的**错误**代码示例：

```ts
interface InterfaceValue {}
type TypeValue = {};
```

此规则在 `{ allowWithName: 'Props$' }` 配置下的**正确**代码示例：

```ts
interface InterfaceProps {}
type TypeProps = {};
```

## 如何使用

<RuleHowToUse />

## Version

此规则于 v0.12.0 中添加。

## References

<RuleReferences />
