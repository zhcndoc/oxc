---
title: "react/error-boundaries | Oxlint"
rule: "react/error-boundaries"
category: "正确性"
version: "next"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/error-boundaries.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/error_boundaries.rs`;
</script>

<RuleHeader />

### 功能

验证是否使用错误边界，而不是在 JSX 周围使用 `try`/`catch` 来处理子组件中的错误。

由 React Compiler 提供支持，该编译器每个文件运行一次，并与其他 React Compiler 规则共享。移植自
[`react-hooks/error-boundaries`](https://react.dev/reference/eslint-plugin-react-hooks/lints/error-boundaries)。

### 为什么这是不好的？

React 会延迟渲染组件——在 `try` 块中，子组件尚未完成渲染，因此 `catch` 永远无法捕获其错误；只有错误边界才能捕获这些错误。

### 示例

此规则的**错误**代码示例：

```jsx
function Component(props) {
  let el;
  try {
    el = <Child />;
  } catch {
    return null;
  }
  return el;
}
```

此规则的**正确**代码示例：

```jsx
function Component(props) {
  return (
    <ErrorBoundary fallback={null}>
      <Child />
    </ErrorBoundary>
  );
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 vnext 中添加。

## 参考

<RuleReferences />
