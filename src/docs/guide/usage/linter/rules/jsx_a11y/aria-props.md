---
title: "jsx-a11y/aria-props | Oxlint"
rule: "jsx-a11y/aria-props"
category: "Correctness"
version: "0.0.22"
default: false
type_aware: false
fix: "conditional_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/aria_props.rs`;
</script>

<RuleHeader />

### 作用

强制元素不要使用无效的 ARIA 属性。

### 为什么这很糟糕？

使用无效的 ARIA 属性可能会误导屏幕阅读器和其他辅助技术。
这可能导致网站的无障碍功能失效，使残障用户难以有效使用该网站。

此规则包含对一些常见拼写错误的修复。

### 示例

此规则的**错误**代码示例：

```jsx
<input aria-labeledby="address_label" />
```

此规则的**正确**代码示例：

```jsx
<input aria-labelledby="address_label" />
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.22 中添加的。

## 参考资料

<RuleReferences />
