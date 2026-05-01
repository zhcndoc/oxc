---
title: "react/forward-ref-uses-ref"
category: "Correctness"
version: "0.16.9"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/forward_ref_uses_ref.rs`;
</script>

<RuleHeader />

### 它的作用

要求使用 `forwardRef` 包裹的组件必须有一个 `ref` 参数。
省略 `ref` 参数通常是一个 bug，
而且不使用 `ref` 的组件也不需要被 `forwardRef` 包裹。

### 为什么这不好？

省略 `ref` 参数会使 `forwardRef` 包装器变得多余，
并且可能导致混淆。

### 示例

以下是此规则的**不正确**代码示例：

```jsx
var React = require("react");

var Component = React.forwardRef((props) => <div />);
```

以下是此规则的**正确**代码示例：

```jsx
var React = require("react");

var Component = React.forwardRef((props, ref) => <div ref={ref} />);

var Component = React.forwardRef((props, ref) => <div />);

function Component(props) {
  return <div />;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.16.9 中添加。

## 参考资料

<RuleReferences />
