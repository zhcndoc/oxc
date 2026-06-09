---
title: "react/forbid-component-props | Oxlint"
rule: "react/forbid-component-props"
category: "Restriction"
version: "1.62.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/forbid-component-props.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/forbid_component_props.rs`;
</script>

<RuleHeader />

### 它的作用

此规则用于阻止向组件传递 props。此规则仅适用于组件（例如 `<Foo />`），不适用于 DOM 节点（例如 `<div />`）。
默认情况下，此规则会阻止向组件传递会增加大量复杂性的 props（`className`、`style`）。
可通过 forbid 选项自定义被禁止的 props 列表。

### 为什么这不好？

此规则会检查所有 JSX 元素，并验证组件上没有使用任何被禁止的 props。此规则默认关闭。

### 示例

此规则的**错误**代码示例：

```jsx
<Hello className='foo' />
<Hello style={{color: 'red'}} />
```

此规则的**正确**代码示例：

```jsx
<Hello name='Joe' />
<div className='foo' />
<div style={{color: 'red'}} />
```

## 配置

此规则接受一个包含以下属性的配置对象：

### forbid

type: `array`

一个用于指定被禁止 props 名称的数组。

默认值为 `["className", "style"]`。

数组中的每个元素都可以是一个字符串（属性名称），或者是一个包含 `propName` / `propNamePattern`、
`allowedFor` / `allowedForPatterns`、`disallowedFor` / `disallowedForPatterns`、可选自定义 `message` 的对象。

**模式匹配**：使用 glob 模式匹配 prop 名称和组件名称。
例如，`propNamePattern` 为 `"**-**"` 时，会匹配任何包含连字符的 prop 名称，而 `allowedForPatterns` 中的 `"*Icon"` 会匹配诸如 `SomeIcon` 和 `AnotherIcon` 这样的组件名称。
请注意，模式匹配是在 Rust 中使用 fast-glob 库完成的，因此可能与原始 ESLint 规则使用的 JavaScript glob 库有所不同。

示例：

- `["error", { "forbid": ["className", "style"] }]`
- `["error", { "forbid": [{ "propName": "className", "message": "请改用 variant" }] }]`
- `["error", { "forbid": [{ "propName": "className", "allowedFor": ["ReactModal"] }] }]`
- `["error", { "forbid": [{ "propNamePattern": "**-**", "disallowedFor": ["Foo"] }] }]`

#### forbid[n]

type: `object | string`

一个被禁止的 prop，可以是普通的 prop 名称字符串，也可以带有选项。

##### forbid[n].allowedFor

type: `string[]`

允许使用此 prop 的组件名称（其他所有组件都被禁止）。

##### forbid[n].allowedForPatterns

type: `string[]`

允许使用此 prop 的组件名称的 glob 模式。

##### forbid[n].disallowedFor

type: `string[]`

禁止使用此 prop 的组件名称（其他所有组件都被允许）。

##### forbid[n].disallowedForPatterns

type: `string[]`

禁止使用此 prop 的组件名称的 glob 模式。

##### forbid[n].message

type: `string`

要显示的自定义消息。

##### forbid[n].propName

type: `string`

要禁止的精确 prop 名称。

##### forbid[n].propNamePattern

type: `string`

用于匹配 prop 名称的 glob 模式。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.62.0 中新增。

## 参考资料

<RuleReferences />
