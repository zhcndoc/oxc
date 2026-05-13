---
title: "typescript/strict-boolean-expressions | Oxlint"
rule: "typescript/strict-boolean-expressions"
category: "Pedantic"
version: "1.25.0"
default: false
type_aware: true
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/strict_boolean_expressions.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/strict_boolean_expressions/strict_boolean_expressions.go`;
</script>

<RuleHeader />

### 它的作用

禁止在布尔表达式中使用某些类型。

### 为什么这不好？

禁止在期望布尔值的表达式中使用非布尔类型。
`boolean` 和 `never` 类型始终允许。可通过选项配置在布尔上下文中被视为安全的其他类型。

会检查以下节点：

- `!`、`&&` 和 `||` 运算符的参数
- 条件表达式中的条件（`cond ? x : y`）
- `if`、`for`、`while` 和 `do-while` 语句的条件。

### 示例

以下是此规则的**错误**代码示例：

```ts
const str = "hello";
if (str) {
  console.log("string");
}

const num = 42;
if (num) {
  console.log("number");
}

const obj = { foo: "bar" };
if (obj) {
  console.log("object");
}

declare const maybeString: string | undefined;
if (maybeString) {
  console.log(maybeString);
}

const result = str && num;
const ternary = str ? "yes" : "no";
```

以下是此规则的**正确**代码示例：

```ts
const str = "hello";
if (str !== "") {
  console.log("string");
}

const num = 42;
if (num !== 0) {
  console.log("number");
}

const obj = { foo: "bar" };
if (obj !== null) {
  console.log("object");
}

declare const maybeString: string | undefined;
if (maybeString !== undefined) {
  console.log(maybeString);
}

const bool = true;
if (bool) {
  console.log("boolean");
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowAny

type: `boolean`

default: `false`

是否允许在布尔上下文中使用 `any` 类型。

### allowNullableBoolean

type: `boolean`

default: `false`

是否允许在布尔上下文中使用可空布尔类型（例如 `boolean | null`）。

### allowNullableEnum

type: `boolean`

default: `false`

是否允许在布尔上下文中使用可空枚举类型。

### allowNullableNumber

type: `boolean`

default: `false`

是否允许在布尔上下文中使用可空数字类型（例如 `number | null`）。

### allowNullableObject

type: `boolean`

default: `true`

是否允许在布尔上下文中使用可空对象类型。

### allowNullableString

type: `boolean`

default: `false`

是否允许在布尔上下文中使用可空字符串类型（例如 `string | null`）。

### allowNumber

type: `boolean`

default: `true`

是否允许在布尔上下文中使用数字类型（检查非零数字）。

### allowString

type: `boolean`

default: `true`

是否允许在布尔上下文中使用字符串类型（检查非空字符串）。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.25.0 中添加。

## 参考资料

<RuleReferences />
