---
title: "react/purity | Oxlint"
rule: "react/purity"
category: "正确性"
version: "next"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/purity.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/purity.rs`;
</script>

<RuleHeader />

### 功能

通过检查组件和 Hook 是否在渲染期间调用了已知的非纯函数（例如 `Math.random()`、`Date.now()` 或 `performance.now()`），验证组件和 Hook 是否为纯函数。

此规则由 React Compiler 提供支持，React Compiler 每个文件只运行一次，并与其他 React Compiler 规则共享。移植自
[`react-hooks/purity`](https://react.dev/reference/eslint-plugin-react-hooks/lints/purity)。

### 为什么这很糟糕？

非纯渲染会针对相同的 props 和 state 返回不同的输出，从而破坏记忆化、并发渲染和可重放性。

### 示例

此规则的**错误**代码示例：

```jsx
function Component() {
  const rand = Math.random();
  return <div>{rand}</div>;
}
```

此规则的**正确**代码示例：

```jsx
import { useState } from "react";
function Component() {
  const [rand, setRand] = useState(0);
  return <button onClick={() => setRand(Math.random())}>{rand}</button>;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 vnext 中添加。

## 参考

<RuleReferences />
