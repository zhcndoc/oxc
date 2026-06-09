---
title: "jsx-a11y/no-noninteractive-tabindex | Oxlint"
rule: "jsx-a11y/no-noninteractive-tabindex"
category: "正确性"
version: "0.15.4"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-tabindex.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/no_noninteractive_tabindex.rs`;
</script>

<RuleHeader />

### 作用

此规则检查非交互元素是否带有 tabIndex，因为这会使它们通过键盘导航变为可交互。

### 为什么这不好？

Tab 键导航应仅限于页面中可以交互的元素。
因此，例如，不必为无序列表中的项目添加 tabindex，
来让辅助技术对它们进行导航。

这些应用程序已经基于页面的 HTML 提供了页面遍历机制。
通常，我们应该尽量减小页面的 tab 环大小，而不是增大它。

### 示例

此规则的**错误**代码示例：

```jsx
<div tabIndex="0" />
<div role="article" tabIndex="0" />
<article tabIndex="0" />
<article tabIndex={0} />
```

此规则的**正确**代码示例：

```jsx
<div />
<MyButton tabIndex={0} />
<button />
<button tabIndex="0" />
<button tabIndex={0} />
<div />
<div tabIndex="-1" />
<div role="button" tabIndex="0" />
<div role="article" tabIndex="-1" />
<article tabIndex="-1" />
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowExpressionValues

type: `boolean`

default: `true`

如果为 `true`，则允许 tabIndex 的值为表达式值（例如变量、三元表达式）。如果为 `false`，则只允许字符串字面量值。

### roles

type: `string[]`

default: `["tabpanel"]`

应视为交互式的 ARIA 角色数组。

### tags

type: `string[]`

default: `[]`

应视为交互式的自定义 HTML 元素数组。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.15.4 中添加。

## 参考资料

<RuleReferences />
