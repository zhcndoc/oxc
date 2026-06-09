---
title: "jsx-a11y/autocomplete-valid | Oxlint"
rule: "jsx-a11y/autocomplete-valid"
category: "正确性"
version: "0.2.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/autocomplete-valid.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/autocomplete_valid.rs`;
</script>

<RuleHeader />

### 作用

强制要求元素的 autocomplete 属性必须是有效值。

### 为什么这不好？

错误使用 autocomplete 属性可能会降低网站对用户的可访问性。

### 示例

以下是此规则的**不正确**代码示例：

```jsx
<input autocomplete="invalid-value" />
```

以下是此规则的**正确**代码示例：

```jsx
<input autocomplete="name" />
```

## 配置

此规则接受一个包含以下属性的配置对象：

### inputComponents

type: `string[]`

default: `["input"]`

应被视为输入元素的自定义组件名称列表。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.2.0 中添加。

## 参考资料

<RuleReferences />
