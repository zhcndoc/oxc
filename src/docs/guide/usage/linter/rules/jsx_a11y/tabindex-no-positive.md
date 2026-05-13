---
title: "jsx-a11y/tabindex-no-positive | Oxlint"
rule: "jsx-a11y/tabindex-no-positive"
category: "正确性"
version: "0.0.21"
default: false
type_aware: false
fix: "fixable_dangerous_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/tabindex_no_positive.rs`;
</script>

<RuleHeader />

### 它的作用

强制在 JSX 中不要使用 `tabIndex` 属性的正值。

### 为什么这不好？

使用大于 `0` 的 `tabIndex` 值会让键盘用户和辅助技术用户更难进行导航和交互，
从而破坏内容的逻辑顺序。

### 示例

此规则的**错误**代码示例：

```jsx
<span tabIndex="1">foo</span>
```

此规则的**正确**代码示例：

```jsx
<span tabIndex="0">foo</span>
<span tabIndex="-1">bar</span>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.21 中添加的。

## 参考资料

<RuleReferences />
