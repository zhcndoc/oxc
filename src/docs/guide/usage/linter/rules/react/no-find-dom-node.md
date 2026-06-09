---
title: "react/no-find-dom-node | Oxlint"
rule: "react/no-find-dom-node"
category: "Correctness"
version: "0.0.15"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/no_find_dom_node.rs`;
</script>

<RuleHeader />

### 作用

此规则禁止使用 `findDOMNode`，它已于 2018 年被弃用，并在 React 19 中移除。

### 为什么这很糟糕？

`findDOMNode` 是一个用于访问底层 DOM 节点的后门。
在大多数情况下，不建议使用这个后门，因为它破坏了组件抽象。
它已经被弃用多年，并且已
[在 React 19 中被 React 完全移除](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#removed-reactdom-finddomnode)。

不应使用它。

### 示例

以下是此规则的**错误**代码示例：

```jsx
class MyComponent extends Component {
  componentDidMount() {
    findDOMNode(this).scrollIntoView();
  }
  render() {
    return <div />;
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.15 中添加的。

## 参考资料

<RuleReferences />
