---
title: "jsx-a11y/alt-text | Oxlint"
rule: "jsx-a11y/alt-text"
category: "正确性"
version: "0.0.16"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/alt-text.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/alt_text.rs`;
</script>

<RuleHeader />

### 作用

强制要求所有需要替代文本的元素都具有可传达给最终用户的有意义信息。

### 为什么这很糟糕？

替代文本是屏幕阅读器用户可访问性的重要组成部分，使他们能够理解元素的内容和功能。缺失或不充分的 alt 文本会使依赖辅助技术的用户无法访问内容。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<img src="flower.jpg" />
<img src="flower.jpg" alt="" />
<object />
<area />
```

以下是此规则的**正确**代码示例：

```jsx
<img src="flower.jpg" alt="一朵白色雏菊的特写" />
<img src="decorative.jpg" alt="" role="presentation" />
<object aria-label="交互式图表" />
<area alt="导航链接" />
```

## Configuration

This rule accepts a configuration object with the following properties:

### area

type: `string[]`

default: `[]`

Custom components to check for alt text on `area` elements.

### elements

type: `array`

Custom components to check for alt text on any of the supported elements.

#### elements[n]

type: `"img" | "object" | "area" | "input[type="image"]"`

### img

type: `string[]`

default: `[]`

Custom components to check for alt text on `img` elements.

### input[type="image"]

type: `string[]`

default: `[]`

Custom components to check for alt text on `input[type="image"]` elements.

### object

type: `string[]`

default: `[]`

Custom components to check for alt text on `object` elements.

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.16 中加入。

## 参考资料

<RuleReferences />
