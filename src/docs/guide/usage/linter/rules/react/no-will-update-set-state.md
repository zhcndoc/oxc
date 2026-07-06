---
title: "react/no-will-update-set-state | Oxlint"
rule: "react/no-will-update-set-state"
category: "正确性"
version: "1.37.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-will-update-set-state.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/no_will_update_set_state.rs`;
</script>

<RuleHeader />

### 作用

禁止在 `componentWillUpdate` 生命周期方法中使用 `setState`。

### 为什么这不好？

在组件更新阶段更新状态可能会导致组件状态不确定，因此是不被允许的。
这可能会导致你的 React 应用出现意外行为和 bug。

### 示例

以下是此规则的**错误**代码示例：

```jsx
var Hello = createReactClass({
  componentWillUpdate: function () {
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
  componentWillUpdate: function () {
    this.props.prepareHandler();
  },
  render: function () {
    return <div>Hello {this.state.name}</div>;
  },
});
```

## 配置

此规则接受以下字符串值之一：

type: `"允许" | "在函数中禁用"`

## How to Use

<RuleHowToUse />

## 版本

此规则是在 v1.37.0 中添加的。

## 参考资料

<RuleReferences />
