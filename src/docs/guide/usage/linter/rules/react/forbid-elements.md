---
title: "react/forbid-elements | Oxlint"
rule: "react/forbid-elements"
category: "Restriction"
version: "0.16.11"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/forbid_elements.rs`;
</script>

<RuleHeader />

### 它的作用

允许你配置一个被禁止元素列表，并指定它们期望替换成的元素。

### 为什么这很糟糕？

你可能希望禁止使用某些元素，转而使用其他元素，例如：
禁止所有 `<div />`，改用 `<Box />`。

### 示例

以下是此规则的**错误**代码示例：

```jsx
// ["error", { "forbid": ["button"] }]
<button />;
React.createElement("button");

// ["error", { "forbid": ["Modal"] }]
<Modal />;
React.createElement(Modal);

// ["error", { "forbid": ["Namespaced.Element"] }]
<Namespaced.Element />;
React.createElement(Namespaced.Element);

// ["error", { "forbid": [{ "element": "button", "message": "使用 <Button> 代替" }, "input"] }]
<div>
  <button />
  <input />
</div>;
React.createElement("div", {}, React.createElement("button", {}, React.createElement("input")));
```

以下是此规则的**正确**代码示例：

```jsx
// ["error", { "forbid": ["button"] }]
<Button />

// ["error", { "forbid": [{ "element": "button" }] }]
<Button />
```

## 配置

此规则接受一个包含以下属性的配置对象：

### forbid

type: `array`

被禁止元素列表，可选地附带用于在 lint 违规中显示的消息。

示例：

- `["error, { "forbid": ["button"] }]`
- `["error, { "forbid": [{ "element": "button", "message": "使用 <Button> 代替。" }] }]`
- `["error, { "forbid": [{ "element": "input" }] }]`

#### forbid[n]

type: `object | string`

一个被禁止的元素，可以是普通元素名称，也可以带有自定义消息。

##### forbid[n].element

type: `string`

要禁止的元素名称。

##### forbid[n].message

type: `string`

当找到该元素时要显示的消息

## 如何使用

<RuleHowToUse />

## 版本

该规则于 v0.16.11 中添加。

## 参考资料

<RuleReferences />
