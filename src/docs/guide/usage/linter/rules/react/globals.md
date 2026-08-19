---
title: "react/globals | Oxlint"
rule: "react/globals"
category: "正确性"
version: "next"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/globals.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/globals.rs`;
</script>

<RuleHeader />

### 功能

禁止在渲染期间对组件或 Hook 外部声明的变量进行赋值或修改；副作用必须在渲染之外运行。

由 React Compiler 提供支持，该编译器每个文件只运行一次，并与其他 React Compiler 规则共享。移植自
[`react-hooks/globals`](https://react.dev/reference/eslint-plugin-react-hooks/lints/globals)。

### 为什么这是不好的做法？

组件必须是纯函数，这样 React 才能随时以任意顺序渲染它们。在渲染期间写入全局变量会使输出取决于组件的渲染次数，并且在 Strict Mode 和并发渲染下会失效。

### 示例

此规则下的**错误**代码示例：

```jsx
let someGlobal = false;
function Component() {
  someGlobal = true; // assignment during render
  return <div>{String(someGlobal)}</div>;
}
```

此规则下的**正确**代码示例：

```jsx
import { useEffect } from "react";
let someGlobal = false;
function Component() {
  useEffect(() => {
    someGlobal = true;
  }, []);
  return <div />;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 vnext 中添加。

## 参考

<RuleReferences />
