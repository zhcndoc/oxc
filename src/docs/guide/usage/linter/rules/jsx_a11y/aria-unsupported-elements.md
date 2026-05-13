---
title: "jsx-a11y/aria-unsupported-elements | Oxlint"
rule: "jsx-a11y/aria-unsupported-elements"
category: "正确性"
version: "0.1.1"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/aria_unsupported_elements.rs`;
</script>

<RuleHeader />

### 作用

强制规定保留的 DOM 元素不得包含 ARIA 角色、状态
或属性。

### 为什么这不好？

某些保留的 DOM 元素不支持 ARIA 角色、状态和
属性。这通常是因为它们不可见，例如
`meta`、`html`、`script`、`style`。向这些
元素添加 ARIA 属性没有意义，并且可能会给屏幕阅读器带来困惑。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<meta charset="UTF-8" aria-hidden="false" />
```

以下是此规则的**正确**代码示例：

```jsx
<meta charset="UTF-8" />
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.1.1 中添加。

## 参考资料

<RuleReferences />
