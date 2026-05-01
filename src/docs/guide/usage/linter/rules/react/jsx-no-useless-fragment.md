---
title: "react/jsx-no-useless-fragment"
category: "Pedantic"
version: "0.0.14"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/jsx_no_useless_fragment.rs`;
</script>

<RuleHeader />

### 它的作用

禁止不必要的 Fragment。

### 为什么这不好？

当你需要将多个子元素分组，而又不想在 DOM 树中添加一个节点时，Fragment 是一个很有用的工具。然而，有时你可能会得到一个只包含单个子元素的 Fragment。当这个子元素是一个元素、字符串或表达式时，就没有必要使用 Fragment。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<>foo</>
<div><>foo</></div>
```

以下是此规则的**正确**代码示例：

```jsx
<>foo <div></div></>
<div>foo</div>
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowExpressions

type: `boolean`

default: `false`

允许包含单个表达式子元素的 Fragment。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.14 中添加。

## 参考资料

<RuleReferences />
