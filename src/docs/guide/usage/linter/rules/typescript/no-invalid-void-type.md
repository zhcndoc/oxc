---
title: "typescript/no-invalid-void-type | Oxlint"
rule: "typescript/no-invalid-void-type"
category: "限制"
version: "1.47.0"
default: false
type_aware: false
fix: "none"
upstream: "https://typescript-eslint.io/rules/no-invalid-void-type/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_invalid_void_type.rs`;
</script>

<RuleHeader />

### 作用

禁止在返回类型和已配置的泛型上下文之外使用 `void` 类型。

### 为什么这不好？

在 TypeScript 中，`void` 主要在返回位置上才有意义。在其他类型位置中使用 `void`
（参数、属性、别名以及大多数联合类型）通常会造成混淆，
并且往往表明类型设计有误。

### 示例

以下是此规则的**错误**代码示例：

```ts
function takeVoid(arg: void) {}
type Alias = void;
type Union = string | void;
```

以下是此规则的**正确**代码示例：

```ts
function f(): void {}
type P = Promise<void>;
type U = void | never;
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowAsThisParameter

type: `boolean`

default: `false`

是否允许函数的 `this` 参数为 `void`。

### allowInGenericTypeArguments

type: `array | boolean`

#### allowInGenericTypeArguments[n]

type: `string`

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v1.47.0 中添加。

## 参考

<RuleReferences />
