---
title: "react/self-closing-comp"
category: "Style"
version: "0.9.3"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/self_closing_comp.rs`;
</script>

<RuleHeader />

### 作用

检测没有子元素的组件，以便将其自闭合，避免
不必要的额外闭合标签。

### 为什么这不好？

没有子元素的组件不需要显式的闭合标签。使用
自闭合语法可以让代码更简洁，并减少视觉杂乱。
这也符合空元素常见的 React 和 JSX 约定。

包含空白符的自闭合组件是允许的，除非
它同时包含换行符。

### 示例

以下是此规则的**错误**代码示例：

```jsx
const elem = <Component linter="oxlint"></Component>;
const dom_elem = <div id="oxlint"></div>;
const welem = <div id="oxlint"></div>;
```

以下是此规则的**正确**代码示例：

```jsx
const elem = <Component linter="oxlint" />;
const welem = <Component linter="oxlint"> </Component>;
const dom_elem = <div id="oxlint" />;
```

## 配置

此规则接受一个包含以下属性的配置对象：

### component

type: `boolean`

default: `true`

是否强制自定义组件使用自闭合形式。

### html

type: `boolean`

default: `true`

是否强制原生 HTML 元素使用自闭合形式。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.9.3 中添加。

## 参考

<RuleReferences />
