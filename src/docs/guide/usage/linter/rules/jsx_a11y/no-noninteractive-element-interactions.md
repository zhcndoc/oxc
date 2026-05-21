---
title: "jsx-a11y/no-noninteractive-element-interactions | Oxlint"
rule: "jsx-a11y/no-noninteractive-element-interactions"
category: "正确性"
version: "1.65.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/no_noninteractive_element_interactions.rs`;
</script>

<RuleHeader />

### 它的作用

阻止将鼠标或键盘事件处理器分配给非交互式 HTML 元素以及具有非交互式 ARIA 角色的元素。

### 为什么这很糟糕？

`<main>`、`<h1>`、`<p>`、`<img>`、`<li>`、`<ul>` 和
`<ol>` 等非交互式元素表示内容或容器。向它们添加交互处理器可能会使
用户界面难以或无法通过辅助技术操作。

将处理器移动到交互式元素上，例如 `<button>` 或 `<a href>`，或者使用
具有适当交互角色和键盘行为的元素。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<li onClick={() => {}} />
<div role="listitem" onKeyDown={() => {}} />
```

以下是此规则的**正确**代码示例：

```jsx
<button onClick={() => {}} />
<div role="button" onClick={() => {}} />
<div onClick={() => {}} role="presentation" />
```

## 配置

此规则接受一个包含以下属性的配置对象：

### handlers

type: `string[]`

default: `null`

应触发此规则的事件处理器名称数组。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.65.0 中添加。

## 参考资料

<RuleReferences />
