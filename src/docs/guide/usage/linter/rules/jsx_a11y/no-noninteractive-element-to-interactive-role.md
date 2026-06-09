---
title: "jsx-a11y/no-noninteractive-element-to-interactive-role | Oxlint"
rule: "jsx-a11y/no-noninteractive-element-to-interactive-role"
category: "正确性"
version: "1.64.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-element-to-interactive-role.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/no_noninteractive_element_to_interactive_role.rs`;
</script>

<RuleHeader />

### 它的作用

非交互式 HTML 元素在用户界面中表示_内容_和_容器_。
非交互式元素包括 `<main>`、`<area>`、`<h1>`（到 `<h6>`）、`<p>`、
`<img>`、`<li>`、`<ul>` 和 `<ol>`。

交互式 HTML 元素在用户界面中表示_控件_。
交互式元素包括 `<a href>`、`<button>`、`<input>`、`<select>`、
`<textarea>`。

[WAI-ARIA 角色](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) 不应被用于
将非交互式元素转换为交互式元素。交互式 ARIA 角色包括 `button`、`link`、`checkbox`、`menuitem`、`menuitemcheckbox`、
`menuitemradio`、`option`、`radio`、`searchbox`、`switch` 和 `textbox`。

### 为什么这不好？

用交互式角色覆盖非交互式元素的语义含义会给辅助技术用户带来困惑。该元素缺少交互式元素所提供的预期键盘交互模式和焦点管理。

### 示例

此规则的**错误**代码示例：

```jsx
<h1 role="button">Click me</h1>
<li role="link">Navigate</li>
<article role="button">Submit</article>
```

此规则的**正确**代码示例：

```jsx
<button>Click me</button>
<a href="/page">Navigate</a>
<div role="button">Submit</div>
<ul role="menu"><li role="menuitem">Item</li></ul>
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowed_roles

type: `Record<string, array>`

HTML 元素名称到 ARIA 角色字符串数组的映射，这些角色字符串数组是
允许用于该元素的覆盖值。例如，`{ "ul": ["menu", "tablist"] }`
允许 `<ul role="menu" />` 而不会触发该规则。

默认值为：

```json
{
  "ul": ["menu", "menubar", "radiogroup", "tablist", "tree", "treegrid"],
  "ol": ["menu", "menubar", "radiogroup", "tablist", "tree", "treegrid"],
  "li": ["menuitem", "menuitemcheckbox", "menuitemradio", "row", "tab", "treeitem"],
  "fieldset": ["radiogroup", "presentation"]
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v1.64.0。

## 参考资料

<RuleReferences />
