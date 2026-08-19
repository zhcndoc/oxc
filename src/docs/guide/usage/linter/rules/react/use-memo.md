---
title: "react/use-memo | Oxlint"
rule: "react/use-memo"
category: "正确性"
version: "next"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/use-memo.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/use_memo.rs`;
</script>

<RuleHeader />

### 功能

验证 `useMemo()` hook 的使用是否存在常见错误，例如传入异步或生成器回调，或错误使用其参数。

由 React Compiler 提供支持，它每个文件运行一次，并与其他 React Compiler 规则共享。移植自 [`react-hooks/use-memo`](https://react.dev/reference/eslint-plugin-react-hooks/lints/use-memo)。

### 为什么这是不好的？

异步或生成器回调会使 `useMemo` 记忆化一个 promise 或迭代器，而不是预期的值；错误使用参数则会导致记忆化功能完全无法工作。

### 示例

此规则的**错误**代码示例：

```jsx
import { useMemo } from "react";
function Component({ a }) {
  const x = useMemo(async () => {
    await a;
  }, [a]);
  return <div>{x}</div>;
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
