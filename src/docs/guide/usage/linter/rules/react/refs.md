---
title: "react/refs | Oxlint"
rule: "react/refs"
category: "正确性"
version: "next"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/refs.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/refs.rs`;
</script>

<RuleHeader />

### 功能

验证 refs 的正确用法：不得在渲染期间读取或写入 `ref.current`，只能在事件处理程序和 effect 中进行。

由 React Compiler 提供支持，该编译器每个文件运行一次，并与其他 React Compiler 规则共享。移植自
[`react-hooks/refs`](https://react.dev/reference/eslint-plugin-react-hooks/lints/refs)。

### 为什么这是不好的？

React 在渲染期间可能尚未附加 ref，并且读取它不会使组件订阅更新——UI 会在不知不觉中过时。

### 示例

此规则中**不正确**的代码示例：

```jsx
import { useRef } from "react";
function Component() {
  const ref = useRef(null);
  const value = ref.current; // read during render
  return <div>{value}</div>;
}
```

此规则中**正确**的代码示例：

```jsx
import { useEffect, useRef } from "react";
function Component() {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  }, []);
  return <input ref={ref} />;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 vnext 中添加。

## 参考

<RuleReferences />
