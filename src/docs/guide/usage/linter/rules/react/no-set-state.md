---
title: "react/no-set-state | Oxlint"
rule: "react/no-set-state"
category: "Style"
version: "0.5.2"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/no_set_state.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在 React 组件中使用 `this.setState`。

### 为什么这不好？

当使用将应用状态与 UI 组件分离的架构时
（例如 Flux），可能希望禁止使用本地组件状态。此规则
在只读应用程序（不使用表单）中尤其有用，因为在这种情况下通常不需要本地组件状态。

### 示例

以下是此规则的**错误**代码示例：

```jsx
var Hello = createReactClass({
  getInitialState: function () {
    return {
      name: this.props.name,
    };
  },
  handleClick: function () {
    this.setState({
      name: this.props.name.toUpperCase(),
    });
  },
  render: function () {
    return <div onClick={this.handleClick.bind(this)}>Hello {this.state.name}</div>;
  },
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.5.2 中添加。

## 参考资料

<RuleReferences />
