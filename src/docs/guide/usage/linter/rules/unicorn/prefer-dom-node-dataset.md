---
title: "unicorn/prefer-dom-node-dataset | Oxlint"
rule: "unicorn/prefer-dom-node-dataset"
category: "Pedantic"
version: "0.0.18"
default: false
type_aware: false
fix: "conditional_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-dataset.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_dom_node_dataset.rs`;
</script>

<RuleHeader />

### 它的作用

在 DOM 元素上优先使用 [`.dataset`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) ，而不是 `getAttribute(…)`、`.setAttribute(…)`、`.removeAttribute(…)` 和 `.hasAttribute(…)`。

### 为什么这不好？

`dataset` 属性是一个字符串映射，其中包含元素的所有 `data-*` 属性。它是一种一次性访问所有这些属性的便捷方式。

### 示例

以下是此规则的**错误**代码示例：

```javascript
element.setAttribute("data-unicorn", "🦄");
```

以下是此规则的**正确**代码示例：

```javascript
element.dataset.unicorn = "🦄";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.18 中添加。

## 参考资料

<RuleReferences />
