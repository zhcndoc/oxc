---
title: "react/no-this-in-sfc | Oxlint"
rule: "react/no-this-in-sfc"
category: "Correctness"
version: "1.37.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-this-in-sfc.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/no_this_in_sfc.rs`;
</script>

<RuleHeader />

### 作用

阻止在无状态函数组件中使用 `this`。

### 为什么不好？

在 React 中，无状态函数组件（SFC）通过函数参数接收 props 和 context，
而不是通过 `this`。在 SFC 中使用 `this` 通常表示在从类组件转换时出错，
或者对这两种组件风格不熟悉。

### 示例

以下是此规则的**错误**代码示例：

```jsx
function Foo(props) {
  return <div>{this.props.bar}</div>;
}

function Foo(props) {
  const { bar } = this.props;
  return <div>{bar}</div>;
}

const Foo = (props) => (this.props.foo ? <span>{props.bar}</span> : null);
```

以下是此规则的**正确**代码示例：

```jsx
function Foo(props) {
  return <div>{props.bar}</div>;
}

function Foo({ bar }) {
  return <div>{bar}</div>;
}

class Foo extends React.Component {
  render() {
    return <div>{this.props.bar}</div>;
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.37.0 中添加。

## 参考资料

<RuleReferences />
