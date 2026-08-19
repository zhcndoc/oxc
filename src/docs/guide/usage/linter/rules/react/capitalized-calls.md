---
title: "react/capitalized-calls | Oxlint"
rule: "react/capitalized-calls"
category: "Suspicious"
version: "next"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/capitalized-calls.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/capitalized_calls.rs`;
</script>

<RuleHeader />

### 功能

禁止在渲染期间直接调用首字母大写的函数或方法，而不是使用 JSX 渲染它们，因为首字母大写的名称是为组件保留的。

由 React Compiler 提供支持，该编译器每个文件运行一次，并与其他 React Compiler 规则共享。移植自
[`react-hooks/capitalized-calls`](https://react.dev/reference/eslint-plugin-react-hooks/lints/capitalized-calls)。

### 为什么这是个问题？

将组件作为普通函数调用会使其对 React 不可见：它没有状态隔离，也没有自己的 Hooks 上下文，并且会破坏记忆化。

### 示例

此规则的**错误**代码示例：

```jsx
import Child from "./Child";
function Component() {
  return <div>{Child()}</div>;
}
```

此规则的**正确**代码示例：

```jsx
import Child from "./Child";
function Component() {
  return (
    <div>
      <Child />
    </div>
  );
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 vnext 中添加。

## 参考

<RuleReferences />
