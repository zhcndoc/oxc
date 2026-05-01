---
title: "import/prefer-default-export"
category: "Style"
version: "1.4.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/prefer_default_export.rs`;
</script>

<RuleHeader />

### 作用

在导出文件时，此规则会检查是否存在默认导出。

### 为什么这不好？

此规则旨在通过在模块只有一个导出时优先使用默认导出来标准化模块导出，从而提升可读性和可维护性。

### 示例

对于 `{ target: "single" }` 选项，下面是**错误**代码示例：

```js
export const foo = "foo";
```

对于 `{ target: "single" }` 选项，下面是**正确**代码示例：

```js
export const foo = "foo";
const bar = "bar";
export default bar;
```

对于 `{ target: "any" }` 选项，下面是**错误**代码示例：

```js
export const foo = "foo";
export const baz = "baz";
```

对于 `{ target: "any" }` 选项，下面是**正确**代码示例：

```js
export default function bar() {}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### target

类型: `"single" | "any"`

默认值: `"single"`

用于指定优先使用默认导出的目标类型的配置选项。

#### `"single"`

当模块中只有一个导出时，优先使用默认导出。

#### `"any"`

在任何有导出的模块中都优先使用默认导出。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.4.0 中添加。

## 参考资料

<RuleReferences />
