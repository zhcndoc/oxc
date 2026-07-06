---
title: "react/require-render-return | Oxlint"
rule: "react/require-render-return"
category: "Nursery"
version: "0.2.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-render-return.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/require_render_return.rs`;
</script>

<RuleHeader />

### 说明

要求 ES5 和 ES2015 React 组件中的 render 方法返回一个值。

此规则与函数组件无关，因此对于现代 React 代码库可以考虑禁用。

### 为什么这不好？

在组件中编写 `render` 方法时，很容易忘记返回 JSX 内容。若缺少 `return` 语句，此规则会发出警告。

### 示例

此规则的**错误**代码示例：

```jsx
var Hello = createReactClass({
  render() {
    <div>Hello</div>;
  },
});

class Hello extends React.Component {
  render() {
    <div>Hello</div>;
  }
}
```

此规则的**正确**代码示例：

```jsx
var Hello = createReactClass({
  render() {
    return <div>Hello</div>;
  },
});

class Hello extends React.Component {
  render() {
    return <div>Hello</div>;
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.0 中添加。

## 参考资料

<RuleReferences />
