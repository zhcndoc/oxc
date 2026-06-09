---
title: "jsx-a11y/anchor-ambiguous-text | Oxlint"
rule: "jsx-a11y/anchor-ambiguous-text"
category: "Restriction"
version: "0.13.2"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-ambiguous-text.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/anchor_ambiguous_text.rs`;
</script>

<RuleHeader />

### 它的作用

检查锚点链接文本中是否使用了含糊不清的词语。

此规则会检查锚点元素的 `aria-label` 文本（如果可用）。
如果锚点没有 `aria-label`，则会组合其子元素中的以下文本：

- `aria-label`（如果可用）
- 如果子元素是图片，则使用其 `alt` 文本
- HTML 元素的文本内容

### 这为什么不好？

屏幕阅读器用户依赖链接文本来获取上下文，而像“click here”这样的含糊词语并不能提供足够的上下文。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<a>link</a>
<a>click here</a>
```

以下是此规则的**正确**代码示例：

```jsx
<a>read this tutorial</a>
<a aria-label="oxc linter documentation">click here</a>
```

## 配置

此规则接受一个包含以下属性的配置对象：

### words

type: `string[]`

default: `["click here", "here", "link", "a link", "learn more"]`

需要在锚点文本中标记出来的含糊词语或短语列表。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.13.2 中添加。

## 参考资料

<RuleReferences />
