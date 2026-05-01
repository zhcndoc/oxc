---
title: "react/state-in-constructor"
category: "Style"
version: "1.26.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/state_in_constructor.rs`;
</script>

<RuleHeader />

### 作用

强制状态初始化风格只能是在
构造函数中，或作为类属性。

该规则与函数组件无关，因此对于现代 React 代码库来说，可以
考虑禁用。

### 为什么这不好？

不一致的状态初始化风格会让代码库更难维护和理解。
此规则在 React 类组件中强制统一的模式。

### 示例

默认情况下，此规则在 `"always"` 模式下的**错误**代码示例：

```jsx
class Foo extends React.Component {
  state = { bar: 0 };
  render() {
    return <div>Foo</div>;
  }
}
```

默认情况下，此规则在 `"always"` 模式下的**正确**代码示例：

```jsx
class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bar: 0 };
  }
  render() {
    return <div>Foo</div>;
  }
}
```

#### `"never"` 模式

将强制状态初始化风格必须使用类属性。

此规则在 `"never"` 模式下的**错误**代码示例：

```jsx
class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bar: 0 };
  }
  render() {
    return <div>Foo</div>;
  }
}
```

此规则在 `"never"` 模式下的**正确**代码示例：

```jsx
class Foo extends React.Component {
  state = { bar: 0 };
  render() {
    return <div>Foo</div>;
  }
}
```

## 配置

此规则接受以下字符串值之一：

### `"always"`

强制在构造函数中初始化 state。
这是默认模式。

### `"never"`

强制使用类属性初始化 state。

## 使用方法

<RuleHowToUse />

## 版本

此规则于 v1.26.0 中添加。

## 参考

<RuleReferences />
