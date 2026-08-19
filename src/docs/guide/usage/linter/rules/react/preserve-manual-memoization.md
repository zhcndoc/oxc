---
title: "react/preserve-manual-memoization | Oxlint"
rule: "react/preserve-manual-memoization"
category: "正确性"
version: "next"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/preserve-manual-memoization.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/preserve_manual_memoization.rs`;
</script>

<RuleHeader />

### 功能

验证现有的手动记忆化（`useMemo`、`useCallback`、`React.memo`）是否会被 React Compiler 保留：编译器只会编译推断出的依赖项与手动指定的依赖项相匹配或更多的代码。

由 React Compiler 提供支持，它会针对每个文件运行一次，并与其他 React Compiler 规则共享。移植自 [`react-hooks/preserve-manual-memoization`](https://react.dev/reference/eslint-plugin-react-hooks/lints/preserve-manual-memoization)。

### 为什么这很糟糕？

当编译器无法证明现有的手动记忆化会被保留时，它会跳过对该代码的优化。

### 示例

此规则的**错误**代码示例：

```jsx
import { useCallback } from "react";
function useFoo(props) {
  const values = [];
  values.push(props);
  return useCallback(() => values, [values]);
}
```

此规则的**正确**代码示例：

```jsx
import { useMemo } from "react";
function Component({ propA }) {
  return useMemo(() => propA.x, [propA]);
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 vnext 中添加。

## 参考

<RuleReferences />
