---
title: "react/immutability | Oxlint"
rule: "react/immutability"
category: "正确性"
version: "next"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/immutability.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/immutability.rs`;
</script>

<RuleHeader />

### 功能

禁止修改 props、state、hook 参数、hook 返回值，以及其他根据 Rules of React 不可变的值。

由 React Compiler 提供支持，该编译器每个文件运行一次，并与其他 React Compiler 规则共享。移植自
[`react-hooks/immutability`](https://react.dev/reference/eslint-plugin-react-hooks/lints/immutability)。

### 为什么这是不好的做法？

React 依赖不可变性来判断何时重新渲染；修改这些值会导致 UI 过时以及更新丢失。

### 示例

此规则的**错误**代码示例：

```jsx
import { useState } from "react";
function Component() {
  const [state] = useState({ a: 0 });
  state.a = 1; // mutates state directly
  return <div>{state.a}</div>;
}
```

此规则的**正确**代码示例：

```jsx
import { useState } from "react";
function Component() {
  const [state, setState] = useState({ a: 0 });
  return <div onClick={() => setState({ a: state.a + 1 })}>{state.a}</div>;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 vnext 中添加。

## 参考

<RuleReferences />
