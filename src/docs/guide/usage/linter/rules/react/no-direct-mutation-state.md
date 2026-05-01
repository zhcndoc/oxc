---
title: "react/no-direct-mutation-state"
category: "正确性"
version: "0.2.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/no_direct_mutation_state.rs`;
</script>

<RuleHeader />

### 它的作用

此规则禁止在 React 组件中直接修改 `this.state`。

请注意，此规则仅适用于类组件，不适用于函数组件。对于现代 React 代码库来说，此规则可能并不必要或不相关。

### 为什么这不好？

React 组件绝不应直接修改 `this.state`，因为之后调用 `setState()` 可能会替换你所做的修改。

`this.state` 应被视为不可变的。

### 示例

以下是此规则的**错误**代码示例：

```jsx
var Hello = createReactClass({
  componentDidMount: function () {
    this.state.name = this.props.name.toUpperCase();
  },
  render: function () {
    return <div>Hello {this.state.name}</div>;
  },
});

class Hello extends React.Component {
  constructor(props) {
    super(props);

    doSomethingAsync(() => {
      this.state = "bad";
    });
  }
}
```

以下是此规则的**正确**代码示例：

```jsx
var Hello = createReactClass({
  componentDidMount: function() {
    this.setState({
      name: this.props.name.toUpperCase();
    });
  },
  render: function() {
    return <div>Hello {this.state.name}</div>;
  }
});

class Hello extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      foo: 'bar',
    }
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.2.0 中添加。

## 参考资料

<RuleReferences />
