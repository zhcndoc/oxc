---
title: "eslint/arrow-body-style"
category: "Style"
version: "1.4.0"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/arrow_body_style.rs`;
</script>

<RuleHeader />

### 作用

此规则可以强制或禁止在箭头函数体周围使用花括号。
箭头函数可以使用以下任一形式：

- 块体 `() => { ... }`
- 或简洁体 `() => expression`，带有隐式返回。

### 为什么不好？

不一致地使用块体与简洁体会使代码更难阅读。
简洁体仅限于单个表达式，其值会被隐式返回。

### 选项

第一个选项：

- 类型：`string`
- 枚举：`"always"`, `"as-needed"`, `"never"`
- 默认：`"as-needed"`

可能的值：

- `never` 强制函数体周围不使用花括号（限制箭头函数仅用于返回表达式）
- `always` 强制函数体周围使用花括号
- `as-needed` 强制在可以省略花括号的地方不使用（默认）

第二个选项：

- 类型：`object`
- 属性：
  - `requireReturnForObjectLiteral`: `boolean`（默认：`false`）- 要求对象字面量使用花括号和显式返回。

注意：此选项仅在第一个选项为 `"as-needed"` 时适用。

示例配置：

```json
{
  "arrow-body-style": ["error", "as-needed", { "requireReturnForObjectLiteral": true }]
}
```

### 示例

#### `"never"`

使用 `never` 选项时，此规则的**错误**代码示例：

```js
/* arrow-body-style: ["error", "never"] */

/* ✘ 不好： */
const foo = () => {
  return 0;
};
```

使用 `never` 选项时，此规则的**正确**代码示例：

```js
/* arrow-body-style: ["error", "never"] */

/* ✔ 好： */
const foo = () => 0;
const bar = () => ({ foo: 0 });
```

#### `"always"`

使用 `always` 选项时，此规则的**错误**代码示例：

```js
/* arrow-body-style: ["error", "always"] */

/* ✘ 不好： */
const foo = () => 0;
```

使用 `always` 选项时，此规则的**正确**代码示例：

```js
/* arrow-body-style: ["error", "always"] */

/* ✔ 好： */
const foo = () => {
  return 0;
};
```

#### `"as-needed"`（默认）

使用 `as-needed` 选项时，此规则的**错误**代码示例：

```js
/* arrow-body-style: ["error", "as-needed"] */

/* ✘ 不好： */
const foo = () => {
  return 0;
};
```

使用 `as-needed` 选项时，此规则的**正确**代码示例：

```js
/* arrow-body-style: ["error", "as-needed"] */

/* ✔ 好： */
const foo1 = () => 0;

const foo2 = (retv, name) => {
  retv[name] = true;
  return retv;
};

const foo3 = () => {
  bar();
};
```

#### `"as-needed"` 配合 `requireReturnForObjectLiteral`

使用 `{ "requireReturnForObjectLiteral": true }` 选项时，此规则的**错误**代码示例：

```js
/* arrow-body-style: ["error", "as-needed", { "requireReturnForObjectLiteral": true }] */

/* ✘ 不好： */
const foo = () => ({});
const bar = () => ({ bar: 0 });
```

使用 `{ "requireReturnForObjectLiteral": true }` 选项时，此规则的**正确**代码示例：

```js
/* arrow-body-style: ["error", "as-needed", { "requireReturnForObjectLiteral": true }] */

/* ✔ 好： */
const foo = () => {};
const bar = () => {
  return { bar: 0 };
};
```

## 配置

### 第一个选项

类型：`"as-needed" | "always" | "never"`

### 第二个选项

此选项是一个对象，包含以下属性：

#### requireReturnForObjectLiteral

类型：`boolean`

默认：`false`

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.4.0 中添加。

## 参考

<RuleReferences />
