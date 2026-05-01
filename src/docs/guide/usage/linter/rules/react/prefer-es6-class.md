---
title: "react/prefer-es6-class"
category: "Style"
version: "0.5.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/prefer_es6_class.rs`;
</script>

<RuleHeader />

### 它的作用

React 为你提供了两种创建传统组件的方式：使用
`create-react-class` 包，或者使用更新的 ES2015 类系统。

请注意，在现代 React 中，更推荐使用函数组件而不是类组件，
并且尤其不建议在现代 React 中使用 `createReactClass`。

### 为什么这不好？

此规则强制执行一致的 React 类风格。

### 示例

默认情况下，此规则的**错误**代码示例如下：

```jsx
var Hello = createReactClass({
  render: function () {
    return <div>Hello {this.props.name}</div>;
  },
});
```

## 配置

此规则接受以下字符串值之一：

### `"always"`

始终优先使用 ES2015 类风格组件。

### `"never"`

不允许 ES2015 类风格，优先使用 `createReactClass`。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.5.0 中添加。

## 参考资料

<RuleReferences />
