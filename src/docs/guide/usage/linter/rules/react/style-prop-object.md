---
title: "react/style-prop-object | Oxlint"
rule: "react/style-prop-object"
category: "Suspicious"
version: "0.11.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/style_prop_object.rs`;
</script>

<RuleHeader />

### 它的作用

要求 `style` 属性的值必须是一个对象，或者是一个指向对象的变量。

### 为什么这不好？

在使用 JSX 时，`style` 属性期望的是一个从样式属性到值的对象映射。

### 示例

此规则的**错误**代码示例：

```jsx
<div style="color: 'red'" />
<div style={true} />
<Hello style={true} />
const styles = true;
<div style={styles} />

React.createElement("div", { style: "color: 'red'" });
React.createElement("div", { style: true });
React.createElement("Hello", { style: true });
const styles = true;
React.createElement("div", { style: styles });
```

此规则的**正确**代码示例：

```jsx
<div style={{ color: "red" }} />
<Hello style={{ color: "red" }} />
const styles = { color: "red" };
<div style={styles} />

React.createElement("div", { style: { color: 'red' }});
React.createElement("Hello", { style: { color: 'red' }});
const styles = { height: '100px' };
React.createElement("div", { style: styles });
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allow

type: `string[]`

default: `[]`

允许 `style` 属性使用任意类型值的组件名称列表。

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.11.0 中添加的。

## 参考资料

<RuleReferences />
