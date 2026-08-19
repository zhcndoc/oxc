---
title: "react/unsupported-syntax | Oxlint"
rule: "react/unsupported-syntax"
category: "限制"
version: "next"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/unsupported-syntax.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/unsupported_syntax.rs`;
</script>

<RuleHeader />

### 功能

警告 React Compiler 不计划支持的语法，例如
`eval`；使用该语法的组件和钩子会被跳过，不会进行优化。

由 React Compiler 提供支持，该编译器每个文件运行一次，并与其他 React Compiler 规则共享。移植自
[`react-hooks/unsupported-syntax`](https://react.dev/reference/eslint-plugin-react-hooks/lints/unsupported-syntax)。

### 为什么这是个问题？

像 `eval` 这样的构造会使数据流无法分析，因此组件会永久放弃编译器优化。

### 示例

此规则中**不正确**的代码示例：

```jsx
function Component(props) {
  eval("props.x = true");
  return <div />;
}
```

此规则中**正确**的代码示例：

```jsx
function Component(props) {
  return <div>{props.x}</div>;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 vnext 中添加。

## 参考

<RuleReferences />
