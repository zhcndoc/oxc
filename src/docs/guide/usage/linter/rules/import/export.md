---
title: "import/export | Oxlint"
rule: "import/export"
category: "Nursery"
version: "0.0.21"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/export.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/export.rs`;
</script>

<RuleHeader />

### 它的作用

报告与导出相关的异常行为，例如重复导出名称或默认导出。

### 为什么这不好？

同名的多个导出会在代码库中导致歧义和混乱。  
这会使得跟踪正在使用哪个导出变得困难，并且如果引用了错误的导出，可能会导致运行时错误。

### 示例

以下是此规则的**不正确**代码示例：

```javascript
let foo;
export { foo }; // 名称 'foo' 被重复导出。
export * from "./export-all"; // 如果 export-all.js 也导出 foo，则会冲突
```

以下是此规则的**正确**代码示例：

```javascript
let foo;
export { foo as foo1 }; // 重命名导出以避免冲突
export * from "./export-all"; // 如果 export-all.js 也导出 foo，则不会冲突
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.21 中加入。

## 参考资料

<RuleReferences />
