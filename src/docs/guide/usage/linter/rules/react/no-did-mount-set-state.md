---
title: "react/no-did-mount-set-state | Oxlint"
rule: "react/no-did-mount-set-state"
category: "正确性"
version: "1.36.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/no_did_mount_set_state.rs`;
</script>

<RuleHeader />

### 作用

禁止在 `componentDidMount` 生命周期方法中使用 `setState`。

此规则与函数组件无关，因此对于现代 React 代码库可以考虑将其禁用。

### 为什么这不好？

组件挂载后更新状态会触发第二次 `render()` 调用，并可能导致属性/布局抖动。
这会引发性能问题和非预期行为。

### 示例

以下是此规则的**错误**代码示例：

```jsx
var Hello = createReactClass({
  componentDidMount: function () {
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
  componentDidMount: function () {
    this.onMount(function callback(newName) {
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

## 配置

此规则接受以下字符串值之一：

类型：`"allowed" | "disallow-in-func"`

## How to Use

<RuleHowToUse />

## 版本

此规则是在 v1.36.0 中添加的。

## 参考资料

<RuleReferences />
