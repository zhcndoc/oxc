---
title: "react/no-unstable-nested-components | Oxlint"
rule: "react/no-unstable-nested-components"
category: "可疑"
version: "next"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/no_unstable_nested_components.rs`;
</script>

<RuleHeader />

### 它的作用

不允许在其他组件内部定义 React 组件。

### 为什么这很糟糕？

在协调阶段，React 会通过引用来比较元素类型。在渲染期间定义的组件在每次渲染时都会获得一个新的标识，因此 React 会重新挂载整个嵌套子树，并销毁其 DOM 节点和状态。

### 示例

此规则的 **错误** 代码示例：

```jsx
function Component() {
  function UnstableNestedComponent() {
    return <div />;
  }

  return <UnstableNestedComponent />;
}
```

此规则的 **正确** 代码示例：

```jsx
function StableComponent() {
  return <div />;
}

function Component() {
  return <StableComponent />;
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowAsProps

type: `boolean`

default: `false`

允许在 props 中定义组件。

### customValidators

type: `string[]`

default: `[]`

可选的自定义 propTypes 校验器，用于兼容 eslint-plugin-react。

### propNamePattern

type: `string`

default: `"render*"`

适用于可能接收内联组件定义的 render-prop 名称的 glob 模式。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 vnext 中添加。

## 参考资料

<RuleReferences />
