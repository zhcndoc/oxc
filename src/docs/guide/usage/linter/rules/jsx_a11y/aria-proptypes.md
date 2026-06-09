---
title: "jsx-a11y/aria-proptypes | Oxlint"
rule: "jsx-a11y/aria-proptypes"
category: "Correctness"
version: "1.36.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-proptypes.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/aria_proptypes.rs`;
</script>

<RuleHeader />

### 作用

强制元素不要使用无效的 ARIA 状态和值。

### 为什么这很糟糕？

使用无效的 ARIA 状态和值可能会误导屏幕阅读器和其他辅助技术。
这可能导致网站的无障碍功能失效，使残障用户难以有效使用该网站。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<div aria-level="yes" />
<div aria-relevant="additions removalss" />
```

以下是此规则的**正确**代码示例：

```jsx
<div aria-label="foo" />
<div aria-labelledby="foo bar" />
<div aria-checked={false} />
<div aria-invalid="grammar" />
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.36.0 中添加。

## 参考资料

<RuleReferences />
