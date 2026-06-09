---
title: "jsx-a11y/no-static-element-interactions | Oxlint"
rule: "jsx-a11y/no-static-element-interactions"
category: "正确性"
version: "1.37.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-static-element-interactions.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/no_static_element_interactions.rs`;
</script>

<RuleHeader />

### 作用

强制要求带有事件处理器的静态 HTML 元素必须具有适当的 ARIA 角色。

### 为什么这不好？

静态 HTML 元素在可访问性上下文中没有语义含义。
当这些元素接收点击或键盘事件处理器时，它们必须声明一个角色，
以向辅助技术表明其交互目的。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<div onClick={() => {}} />
<span onKeyDown={handleKeyDown} />
```

以下是此规则的**正确**代码示例：

```jsx
<button onClick={() => {}} />
<div onClick={() => {}} role="button" />
<input type="text" onClick={() => {}} />
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowExpressionValues

type: `boolean`

default: `false`

如果为 `true`，则允许 role 属性值为 JSX 表达式（例如 `role={ROLE}`）。
如果为 `false`，则只允许字符串字面量形式的 role 值。

### handlers

type: `string[]`

default: `null`

一个事件处理器名称数组，这些名称会触发此规则（例如 `onClick`、`onKeyDown`）。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.37.0 中添加。

## 参考

<RuleReferences />
