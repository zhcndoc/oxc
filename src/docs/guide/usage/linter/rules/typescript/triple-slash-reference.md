---
title: "typescript/triple-slash-reference | Oxlint"
rule: "typescript/triple-slash-reference"
category: "Correctness"
version: "0.2.0"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/triple_slash_reference.rs`;
</script>

<RuleHeader />

### 其作用

禁止某些三斜杠指令，改用 ES 模块导入声明。

### 为什么这不好？

通常不建议使用三斜杠引用类型指令，而应使用 ECMAScript 模块导入。

### 示例

此规则的**错误**代码示例如下：

```ts
/// <reference lib="code" />
globalThis.value;
```

## 配置

此规则接受一个包含以下属性的配置对象：

### lib

type: `"always" | "never"`

default: `"always"`

对 `/// <reference lib="..." />` 引用的约束方式。

#### `"always"`

允许三斜杠 `lib` 引用。

#### `"never"`

禁止三斜杠 `lib` 引用。

### path

type: `"always" | "never"`

default: `"never"`

对 `/// <reference path="..." />` 引用的约束方式。

#### `"always"`

允许三斜杠 `path` 引用。

#### `"never"`

禁止三斜杠 `path` 引用。

### types

type: `"always" | "never" | "prefer-import"`

default: `"prefer-import"`

对 `/// <reference types="..." />` 引用的约束方式。

#### `"always"`

允许三斜杠 `types` 引用。

#### `"never"`

禁止三斜杠 `types` 引用。

#### `"prefer-import"`

优先使用 ES 模块导入声明，而不是三斜杠 `types` 引用。
此选项仅在同一模块已存在 `import` 声明时报告问题。

例如，以下代码在 `prefer-import` 下会被报告为 lint 违规：

```ts
/// <reference types="foo" />
import { bar } from "foo";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.0 中添加。

## 参考

<RuleReferences />
