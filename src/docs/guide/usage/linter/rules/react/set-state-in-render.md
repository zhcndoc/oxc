---
title: "react/set-state-in-render | Oxlint"
rule: "react/set-state-in-render"
category: "正确性"
version: "next"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/set-state-in-render.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/set_state_in_render.rs`;
</script>

<RuleHeader />

### 功能

禁止在渲染期间无条件设置状态（包括在
`useMemo` 回调中），因为这会触发额外的渲染，并可能
导致无限渲染循环。

由 React Compiler 提供支持，该编译器每个文件运行一次，并与其他 React Compiler 规则共享。移植自
[`react-hooks/set-state-in-render`](https://react.dev/reference/eslint-plugin-react-hooks/lints/set-state-in-render)。

### 为什么这是不好的？

每次渲染时调用 `setState` 都会安排另一次渲染；无条件调用会无限循环，有条件调用仍会导致两次渲染。

### 示例

此规则的**错误**代码示例：

```jsx
import { useState } from "react";
function Component() {
  const [state, setState] = useState(0);
  setState(state + 1); // schedules another render on every render
  return <div>{state}</div>;
}
```

此规则的**正确**代码示例：

```jsx
import { useState } from "react";
function Component() {
  const [state, setState] = useState(0);
  return <button onClick={() => setState(state + 1)}>{state}</button>;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 vnext 中添加。

## 参考

<RuleReferences />
