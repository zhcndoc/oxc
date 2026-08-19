---
title: "react/incompatible-library | Oxlint"
rule: "react/incompatible-library"
category: "正确性"
version: "next"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/incompatible-library.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/incompatible_library.rs`;
</script>

<RuleHeader />

### 功能

警告使用已知与记忆化（手动或自动）不兼容的库 API，例如 `react-hook-form` 的
`watch()`、TanStack Table 的 `useReactTable()` 和 TanStack Virtual 的
`useVirtualizer()`。

由 React Compiler 提供支持，该编译器每个文件运行一次，并与其他 React Compiler 规则共享。移植自
[`react-hooks/incompatible-library`](https://react.dev/reference/eslint-plugin-react-hooks/lints/incompatible-library)。

### 为什么这是不好的？

这些 API 依赖组件在每次更改时重新渲染；
由编译器或手动执行的记忆化会破坏其更新模型，
因此 UI 将不再反映新数据。

### 示例

此规则的**错误**代码示例：

```jsx
import { useReactTable } from "@tanstack/react-table";
function Component({ columns, data }) {
  const table = useReactTable({ columns, data });
  return <div>{table.getRowModel().rows.length}</div>;
}
```

此规则的**正确**代码示例：

```jsx
function Component({ rows }) {
  return <div>{rows.length}</div>;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 vnext 中添加。

## 参考

<RuleReferences />
