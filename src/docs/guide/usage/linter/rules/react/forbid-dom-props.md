---
title: "react/forbid-dom-props"
category: "限制"
version: "1.24.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/forbid_dom_props.rs`;
</script>

<RuleHeader />

### 它的作用

此规则会阻止向元素传递 props。此规则仅适用于 DOM 节点（例如 <div />），不适用于组件（例如 <Component />）。可通过 forbid 选项自定义被禁止的 props 列表。

### 为什么这不好？

此规则会检查所有 JSX 元素，并验证 DOM 节点上没有使用任何被禁止的 props。此规则默认关闭。

### 示例

以下是此规则的**错误**代码示例：

```jsx
// [1, { "forbid": ["id"] }]
<div id='Joe' />

// [1, { "forbid": ["style"] }]
<div style={{color: 'red'}} />
```

以下是此规则的**正确**代码示例：

```jsx
// [1, { "forbid": ["id"] }]
<Hello id='foo' />

// [1, { "forbid": ["id"] }]
<Hello id={{color: 'red'}} />
```

## 配置

`forbid-dom-props` 规则的配置。

此规则接受一个包含以下属性的配置对象：

### forbid

type: `array`

一个在 DOM 元素上被禁止的 prop 名称或对象数组。

数组中的每个元素可以是一个包含属性名的字符串，或一个包含 `propName`、可选的 `disallowedFor` DOM 节点名称数组，以及可选自定义 `message` 的对象。

示例：

- `["error", { "forbid": ["id", "style"] }]`
- `["error", { "forbid": [{ "propName": "className", "message": "使用 class 代替" }] }]`
- `["error", { "forbid": [{ "propName": "style", "disallowedFor": ["div", "span"] }] }]`

#### forbid[n]

type: `object | string`

一个被禁止的 prop，可以是普通的 prop 名称字符串，也可以带有选项。

##### forbid[n].disallowedFor

type: `string[]`

一个 DOM 元素名称列表（例如 `["div", "span"]`），此 prop 在这些元素上被禁止。如果为空或省略，则该 prop 在所有 DOM 元素上都被禁止。

##### forbid[n].message

type: `string`

当使用此 prop 时显示的自定义消息。

##### forbid[n].propName

type: `string`

要禁止的 prop 名称。

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v1.24.0 中添加的。

## 参考

<RuleReferences />
