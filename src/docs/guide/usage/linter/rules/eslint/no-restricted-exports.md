---
title: "eslint/no-restricted-exports | Oxlint"
rule: "eslint/no-restricted-exports"
category: "Nursery"
version: "1.59.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_restricted_exports.rs`;
</script>

<RuleHeader />

### 作用

此规则不允许将指定名称用作导出名称。

默认情况下，此规则不会禁止任何名称。只有你在配置中指定的名称才会被禁止。

### 这为什么不好？

在项目中，某些名称可能由于各种原因不允许被用作导出名称。

## 配置

此规则接受一个包含以下属性的配置对象：

### hasDefaultRestrictedNamedExport

type: `boolean`

### restrictDefaultExports

type: `object`

一个带有布尔属性的对象，用于限制某些默认导出声明。只有当 `restrictedNamedExports` 选项不包含 `"default"` 值时，此选项才有效。

#### restrictDefaultExports.defaultFrom

type: `boolean`

default: `false`

是否限制 `export { default } from` 声明。

针对 `"restrictDefaultExports": { "defaultFrom": true }` 的**错误**代码示例：

```js
export { default } from "foo";
```

#### restrictDefaultExports.direct

type: `boolean`

default: `false`

是否限制 `export default` 声明。

针对 `"restrictDefaultExports": { "direct": true }` 的**错误**代码示例：

```js
const foo = 123;
export default foo;
```

#### restrictDefaultExports.named

type: `boolean`

default: `false`

是否限制 `export { foo as default }` 声明。

针对 `"restrictDefaultExports": { "named": true }` 的**错误**代码示例：

```js
const foo = 123;
export { foo as default };
```

#### restrictDefaultExports.namedFrom

type: `boolean`

default: `false`

是否限制 `export { foo as default } from` 声明。

针对 `"restrictDefaultExports": { "namedFrom": true }` 的**错误**代码示例：

```js
export { foo as default } from "foo";
```

#### restrictDefaultExports.namespaceFrom

type: `boolean`

default: `false`

是否限制 `export * as default from` 声明。

针对 `"restrictDefaultExports": { "namespaceFrom": true }` 的**错误**代码示例：

```js
export * as default from "foo";
```

### restrictedNamedExports

type: `string[]`

default: `[]`

一个字符串数组，其中每个字符串都是一个要被限制的名称。

针对 `"restrictedNamedExports": ["foo"]` 的**错误**代码示例：

```ts
export const foo = 1;
```

针对 `"restrictedNamedExports": ["foo"]` 的**正确**代码示例：

```ts
export const bar = 1;
```

按照设计，此选项不会禁止 `export default` 声明。如果你将 `default` 配置为受限名称，那么该限制只会应用于命名导出声明。

针对 `"restrictedNamedExports": ["default"]` 的**错误**代码示例：

```ts
function foo() {}
export { foo as default };

export { default } from "some_module";
```

### restrictedNamedExportsPattern

type: `string`

一个表示正则表达式模式的字符串。匹配此模式的命名导出将被限制。此选项不适用于默认命名导出。

针对 `"restrictedNamedExportsPattern": "bar$"` 的**错误**代码示例：

```ts
export const foobar = 1;
```

针对 `"restrictedNamedExportsPattern": "bar$"` 的**正确**代码示例：

```ts
export const foo = 1;
```

## 使用方法

<RuleHowToUse />

## Version

该规则于 v1.59.0 中添加。

## References

<RuleReferences />
