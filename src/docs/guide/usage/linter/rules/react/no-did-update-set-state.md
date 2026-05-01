---
title: "react/no-did-update-set-state"
category: "Correctness"
version: "1.62.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/no_did_update_set_state.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在 `componentDidUpdate` 中使用 `setState`。

### 为什么这不好？

在组件更新后再更新状态会触发第二次 `render()` 调用，并可能导致属性/布局抖动。

### 示例

以下是此规则的**错误**代码示例：

```jsx
var Hello = createReactClass({
  componentDidUpdate: function () {
    this.setState({
      name: this.props.name.toUpperCase(),
    });
  },
  render: function () {
    return <div>Hello {this.state.name}</div>;
  },
});
```

以下是此规则的**正确**代码示例：

```jsx
var Hello = createReactClass({
  componentDidUpdate: function () {
    this.props.onUpdate();
  },
  render: function () {
    return <div>Hello {this.props.name}</div>;
  },
});
```

```jsx
var Hello = createReactClass({
  componentDidUpdate: function () {
    this.onUpdate(function callback(newName) {
      this.setState({
        name: newName,
      });
    });
  },
  render: function () {
    return <div>Hello {this.props.name}</div>;
  },
});
```

## 配置

此规则接受以下字符串值之一：

### `"allowed"`

禁止在 `componentDidUpdate` 中、函数外部调用任何 `this.setState`。

### `"disallow-in-func"`

`disallow-in-func` 模式会使该规则更加严格，甚至禁止在函数内部调用
`this.setState`。

使用 `"disallow-in-func"` 选项时，此规则的**错误**代码示例如下：

```jsx
var Hello = createReactClass({
  componentDidUpdate: function () {
    this.setState({
      name: this.props.name.toUpperCase(),
    });
  },
  render: function () {
    return <div>Hello {this.state.name}</div>;
  },
});
```

```jsx
var Hello = createReactClass({
  componentDidUpdate: function () {
    this.onUpdate(function callback(newName) {
      this.setState({
        name: newName,
      });
    });
  },
  render: function () {
    return <div>Hello {this.state.name}</div>;
  },
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v1.62.0。

## 参考

<RuleReferences />
