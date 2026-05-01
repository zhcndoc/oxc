---
title: "react/prefer-function-component"
category: "Restriction"
version: "1.59.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/prefer_function_component.rs`;
</script>

<RuleHeader />

### 它的作用

强制 React 组件以函数组件的形式编写，
而不是类组件。

### 为什么这不好？

函数组件更简单、更易读，并且支持 React
hooks。类组件是一种遗留模式，在现代 React 中
不被鼓励使用。

此规则基于以下规则：
[eslint-plugin-react-prefer-function-component](https://www.npmjs.com/package/eslint-plugin-react-prefer-function-component)。

### 示例

以下是此规则的**错误**代码示例：

```jsx
class Foo extends React.Component {
  render() {
    return <div>{this.props.foo}</div>;
  }
}

class Bar extends React.PureComponent {
  render() {
    return <div>{this.props.bar}</div>;
  }
}
```

以下是此规则的**正确**代码示例：

```jsx
const Foo = function (props) {
  return <div>{props.foo}</div>;
};

const Bar = ({ bar }) => <div>{bar}</div>;
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowErrorBoundary

type: `boolean`

default: `true`

如果为 `true`，则允许错误边界类（实现了 `componentDidCatch`
或 `static getDerivedStateFromError`）作为类组件使用。

这是因为这些类并不容易转换为函数组件，
因此默认情况下会将其从此规则中排除。

### allowJsxUtilityClass

type: `boolean`

default: `false`

如果为 `true`，则允许包含 JSX 但不扩展 `Component` 或
`PureComponent` 的类。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.59.0 中新增。

## 参考资料

<RuleReferences />
