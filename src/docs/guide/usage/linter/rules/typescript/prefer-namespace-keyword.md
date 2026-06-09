---
title: "typescript/prefer-namespace-keyword | Oxlint"
rule: "typescript/prefer-namespace-keyword"
category: "正确性"
version: "0.7.0"
default: true
type_aware: false
fix: "fixable_fix"
upstream: "https://typescript-eslint.io/rules/prefer-namespace-keyword/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/prefer_namespace_keyword.rs`;
</script>

<RuleHeader />

### 作用

当使用 module 关键字而不是 namespace 时，此规则会报告。
此规则不会报告使用 TypeScript 模块声明来描述外部 API 的情况（declare module 'foo' {}）。

::: warning
此规则已弃用，并将在未来的版本中移除。

在未来版本的 TypeScript 和 Oxlint 中，这将由解析器生成一个硬错误。

参见：https://github.com/microsoft/TypeScript/issues/54500、https://github.com/microsoft/TypeScript/issues/62211 和 https://github.com/microsoft/TypeScript/pull/62876。
:::

### 为什么这不好？

命名空间是一种过时的组织 TypeScript 代码的方式。现在更推荐使用 ES2015 模块语法（`import`/`export`）。
对于仍在使用自定义模块 / 命名空间的项目，最好将其称为命名空间。

### 示例

此规则的**错误**代码示例：

```typescript
module Example {}
```

此规则的**正确**代码示例：

```typescript
namespace Example {}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.7.0 中添加。

## 参考

<RuleReferences />
