---
title: "jsx-a11y/no-aria-hidden-on-focusable | Oxlint"
rule: "jsx-a11y/no-aria-hidden-on-focusable"
category: "Correctness"
version: "0.0.22"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-aria-hidden-on-focusable.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/no_aria_hidden_on_focusable.rs`;
</script>

<RuleHeader />

### 作用

强制不要在可聚焦元素上设置 `aria-hidden="true"`。

### 为什么这很糟糕？

在可聚焦元素上设置 `aria-hidden="true"` 可能会让屏幕阅读器用户感到困惑，或导致意外行为。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<div aria-hidden="true" tabIndex="0" />
```

以下是此规则的**正确**代码示例：

```jsx
<div aria-hidden="true" />
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.22 中添加。

## 参考资料

<RuleReferences />
