---
title: "react/void-use-memo | Oxlint"
rule: "react/void-use-memo"
category: "Correctness"
version: "next"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/void-use-memo.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/void_use_memo.rs`;
</script>

<RuleHeader />

### 作用

验证 `useMemo()` 回调是否返回值，以及记忆化的结果是否确实被组件或钩子使用。

由 React Compiler 提供支持，该编译器每个文件运行一次，并与其他 React Compiler 规则共享。移植自
[`react-hooks/void-use-memo`](https://react.dev/reference/eslint-plugin-react-hooks/lints/void-use-memo)。

### 为什么这是不好的？

不返回任何内容的 `useMemo` 回调，或其结果从未被使用的回调，并没有记忆化任何内容——它通常只是伪装成其他形式的副作用，而副作用应该放在事件处理程序或 effect 中。

### 示例

此规则的**错误**代码示例：

```jsx
import { useMemo } from "react";
function Component({ a }) {
  useMemo(() => {
    console.log(a); // returns nothing, result unused
  }, [a]);
  return <div>{a}</div>;
}
```

此规则的**正确**代码示例：

```jsx
import { useMemo } from "react";
function Component({ a }) {
  const x = useMemo(() => a + 1, [a]);
  return <div>{x}</div>;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 vnext 中添加。

## 参考

<RuleReferences />
