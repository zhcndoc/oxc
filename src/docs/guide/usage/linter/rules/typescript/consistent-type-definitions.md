---
title: "typescript/consistent-type-definitions | Oxlint"
rule: "typescript/consistent-type-definitions"
category: "Style"
version: "0.2.17"
default: false
type_aware: false
fix: "conditional_dangerous_fix"
upstream: "https://typescript-eslint.io/rules/consistent-type-definitions/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/consistent_type_definitions.rs`;
</script>

<RuleHeader />

### 它的作用

强制类型定义始终一致地使用 `interface` 或 `type` 其中之一。

### 为什么这不好？

TypeScript 提供了两种常见的方式来定义对象类型：`interface` 和 `type`。
这两者通常非常相似，并且经常可以互换使用。
始终使用相同的类型声明风格有助于提高代码可读性。

### 示例

默认情况下，此规则强制使用 `interface` 来定义对象类型。

以下是此规则的**错误**代码示例：

```typescript
type T = { x: number };
```

以下是此规则的**正确**代码示例：

```typescript
type T = string;
type Foo = string | {};

interface T {
  x: number;
}
```

## 配置

此规则接受以下字符串值之一：

### `"interface"`

对象类型定义中优先使用 `interface` 而不是 `type`：

```typescript
interface T {
  x: number;
}
```

### `"type"`

对象类型定义中优先使用 `type` 而不是 `interface`：

```typescript
type T = { x: number };
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.2.17 中添加。

## 参考资料

<RuleReferences />
