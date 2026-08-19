---
title: "react/static-components | Oxlint"
rule: "react/static-components"
category: "正确性"
version: "next"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/static-components.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/static_components.rs`;
</script>

<RuleHeader />

### 作用

验证组件是否为静态组件——在模块作用域中定义，而不是在每次渲染时重新创建——因为动态重新创建的组件会重置状态，并导致过度重新渲染。

由 React Compiler 提供支持，该编译器每个文件只运行一次，并与其他 React Compiler 规则共享。移植自
[`react-hooks/static-components`](https://react.dev/reference/eslint-plugin-react-hooks/lints/static-components)。

### 为什么这是不好的？

在渲染期间创建的组件在每次渲染时都会获得新的标识，因此 React 每次都会卸载并重新挂载它——重置其全部状态，并重新渲染其整个子树。

### 示例

此规则下的**错误**代码示例：

```jsx
function Example(props) {
  const Component = createComponent();
  return <Component />;
}
```

此规则下的**正确**代码示例：

```jsx
function Inner(props) {
  return <div>{props.text}</div>;
}
function Outer() {
  return <Inner text="hello" />;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 vnext 中添加。

## 参考

<RuleReferences />
