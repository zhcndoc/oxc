---
title: "jsx-a11y/heading-has-content | Oxlint"
rule: "jsx-a11y/heading-has-content"
category: "Correctness"
version: "0.0.19"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/heading-has-content.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/heading_has_content.rs`;
</script>

<RuleHeader />

### 作用

强制要求标题元素（h1、h2 等）具有内容，并且
这些内容可被屏幕阅读器访问。
可访问意味着不会使用 aria-hidden 属性将其隐藏。

### 为什么这很糟糕？

屏幕阅读器会提醒用户注意标题标签的存在。
如果标题为空，或者文本无法被访问，
这可能会让用户感到困惑，甚至可能阻止他们
获取页面结构中的信息。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<h1 />
```

以下是此规则的**正确**代码示例：

```jsx
<h1>Foo</h1>
```

## 配置

此规则接受一个包含以下属性的配置对象：

### components

type: `string[]`

default: `null`

要额外视为标题元素的自定义组件名称。
这些名称将与标准的 h1-h6 元素一起进行验证。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.19 中添加。

## 参考资料

<RuleReferences />
