---
title: "react/set-state-in-effect | Oxlint"
rule: "react/set-state-in-effect"
category: "正确性"
version: "next"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/set-state-in-effect.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/set_state_in_effect.rs`;
</script>

<RuleHeader />

### 功能

禁止在 effect 主体内同步调用 `setState`。

由 React Compiler 提供支持，该编译器每个文件运行一次，并与其他 React Compiler 规则共享。移植自
[`react-hooks/set-state-in-effect`](https://react.dev/reference/eslint-plugin-react-hooks/lints/set-state-in-effect)。

### 为什么这不好？

在 effect 中同步调用 `setState` 会触发立即的额外渲染过程，并且通常表示非局部派生数据、派生事件模式或不正确的外部数据同步。可以根据 props 和 state 计算出的值应在渲染期间计算。

### 示例

此规则的**错误**代码示例：

```jsx
import { useEffect, useState } from "react";
function Component() {
  const [state, setState] = useState(0);
  useEffect(() => {
    setState((s) => s + 1);
  });
  return state;
}
```

此规则的**正确**代码示例：

```jsx
function Component({ value }) {
  const doubled = value * 2;
  return <div>{doubled}</div>;
}
```

## 使用方法

<RuleHowToUse />

## 版本

此规则在 vnext 中添加。

## 参考

<RuleReferences />
