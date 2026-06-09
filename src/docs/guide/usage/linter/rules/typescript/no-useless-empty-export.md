---
title: "typescript/no-useless-empty-export | Oxlint"
rule: "typescript/no-useless-empty-export"
category: "正确性"
version: "0.4.4"
default: true
type_aware: false
fix: "fixable_fix"
upstream: "https://typescript-eslint.io/rules/no-useless-empty-export/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_useless_empty_export.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在模块文件中不会改变任何内容的空导出。

### 为什么这有问题？

空的 `export {}` 语句在 TypeScript 代码中有时很有用，
可以把原本会被当作脚本文件的文件变成模块文件。
根据 [TypeScript Handbook Modules 页面](https://www.typescriptlang.org/docs/handbook/modules/introduction.html)：

在 TypeScript 中，就像在 ECMAScript 2015 中一样，任何包含
顶层 import 或 export 的文件都被视为模块。相反，不包含任何顶层 import 或 export 声明的文件会被当作
脚本处理，其内容可在全局作用域中使用（因此模块也可以使用）。

然而，如果文件中已经有其他顶层 import 或 export 语句，`export {}` 语句就不会起任何作用。

此规则会报告在已经使用 ES 模块的文件中没有任何作用的 `export {}`。

### 示例

以下是此规则的**错误**代码示例：

```ts
export const value = "Hello, world!";
export {};
```

以下是此规则的**正确**代码示例：

```ts
export const value = "Hello, world!";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.4.4 中添加。

## 参考资料

<RuleReferences />
