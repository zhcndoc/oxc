---
title: "react/void-dom-elements-no-children | Oxlint"
rule: "react/void-dom-elements-no-children"
category: "Correctness"
version: "0.2.11"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/void-dom-elements-no-children.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/void_dom_elements_no_children.rs`;
</script>

<RuleHeader />

### 它的作用

禁止空的 DOM 元素（例如 `<img />`、`<br />`）接收子元素。

### 为什么这不好？

有一些 HTML 元素只能是自闭合的（例如 img、br、hr）。这些统称为空的 DOM 元素。
此规则检查是否将子元素传递给空的 DOM 元素。

### 示例

此规则的**错误**代码示例：

```jsx
<br>Children</br>
<br children='Children' />
<br dangerouslySetInnerHTML={{ __html: 'HTML' }} />
React.createElement('br', undefined, 'Children')
React.createElement('br', { children: 'Children' })
React.createElement('br', { dangerouslySetInnerHTML: { __html: 'HTML' } })
```

此规则的**正确**代码示例：

```jsx
<div>Children</div>
<div children='Children' />
<div dangerouslySetInnerHTML={{ __html: 'HTML' }} />
React.createElement('div', undefined, 'Children')
React.createElement('div', { children: 'Children' })
React.createElement('div', { dangerouslySetInnerHTML: { __html: 'HTML' } })
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.2.11 中添加。

## 参考

<RuleReferences />
