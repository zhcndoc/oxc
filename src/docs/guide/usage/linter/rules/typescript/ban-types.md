---
title: "typescript/ban-types | Oxlint"
rule: "typescript/ban-types"
category: "Pedantic"
version: "0.0.14"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/ban_types.rs`;
</script>

<RuleHeader />

### 作用

此规则禁止某些特定类型，并且可以建议替代方案。请注意，它并不禁止使用对应的运行时对象。

::: warning
此规则已弃用，并将在未来版本中移除。

请优先使用以下替代规则：

- `typescript/no-empty-object-type`
- `typescript/no-unsafe-function-type`
- `typescript/no-wrapper-object-types`
- `typescript/no-restricted-types`（用于自定义类型禁止）
  :::

### 为什么这不好？

某些内置类型有别名，而某些类型则被认为是危险或有害的。通常，禁止某些类型有助于保持一致性和安全性。

### 示例

以下是此规则的**错误**代码示例：

```typescript
let foo: String = "foo";

let bar: Boolean = true;
```

以下是此规则的**正确**代码示例：

```typescript
let foo: string = "foo";

let bar: boolean = true;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.14 中添加。

## 参考资料

<RuleReferences />
