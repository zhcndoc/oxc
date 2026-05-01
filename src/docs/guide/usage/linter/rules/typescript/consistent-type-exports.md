---
title: "typescript/consistent-type-exports"
category: "Style"
version: "0.0.8"
default: false
type_aware: true
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/consistent_type_exports.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/consistent_type_exports/consistent_type_exports.go`;
</script>

<RuleHeader />

### 作用

强制对仅作为类型使用的导出使用 `export type`。

### 为什么这不好？

在不使用 `export type` 的情况下将仅类型导出与值导出混合在一起，会使模块意图更难阅读，并可能导致不必要的运行时导出表面。

### 示例

以下是此规则的**错误**代码示例：

```ts
type Foo = { bar: string };
export { Foo };

export { TypeOnly, value } from "./mod";
```

以下是此规则的**正确**代码示例：

```ts
type Foo = { bar: string };
export type { Foo };

export type { TypeOnly } from "./mod";
export { value } from "./mod";
```

## 配置

此规则接受一个包含以下属性的配置对象：

### fixMixedExportsWithInlineTypeSpecifier

type: `boolean`

default: `false`

启用一种自动修复策略，使用内联 `type` 说明符重写混合导出。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.8 中添加。

## 参考资料

<RuleReferences />
