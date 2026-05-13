---
title: "import/consistent-type-specifier-style | Oxlint"
rule: "import/consistent-type-specifier-style"
category: "Style"
version: "0.16.11"
default: false
type_aware: false
fix: "conditional_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/consistent_type_specifier_style.rs`;
</script>

<RuleHeader />

### 作用

此规则用于强制或禁止在命名导入中使用行内仅类型标记。

### 为什么这不好？

将顶层的 `import type { Foo } from 'foo'` 与行内的 `{ type Bar }` 混用，
会迫使读者在浏览导入时在不同上下文之间切换。
强制统一一种风格可以让人立刻看出哪些导入是类型，哪些是值导入。

### 示例

默认 `prefer-top-level` 选项下的错误代码示例：

```typescript
import { type Foo } from "Foo";
import Foo, { type Bar } from "Foo";
```

默认选项下的正确代码示例：

```typescript
import type { Foo } from "Foo";
import type Foo, { Bar } from "Foo";
```

`prefer-inline` 选项下的错误代码示例：

```typescript
import type { Foo } from "Foo";
import type Foo, { Bar } from "Foo";
```

`prefer-inline` 选项下的正确代码示例：

```typescript
import { type Foo } from "Foo";
import Foo, { type Bar } from "Foo";
```

## 配置

此规则接受以下字符串值之一：

### `"prefer-top-level"`

类型导入优先使用 `import type { Foo } from 'foo'`。

### `"prefer-inline"`

类型导入优先使用 `import { type Foo } from 'foo'`。

## 使用方法

<RuleHowToUse />

## 版本

此规则于 v0.16.11 中添加。

## 参考资料

<RuleReferences />
