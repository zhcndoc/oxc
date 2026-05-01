---
title: "jsx-a11y/prefer-tag-over-role"
category: "正确性"
version: "0.1.1"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/prefer_tag_over_role.rs`;
</script>

<RuleHeader />

### 它的作用

强制使用语义化的 HTML 标签，而不是 `role` 属性。

### 为什么这不好？

使用语义化的 HTML 标签可以提高可访问性和代码可读性。

### 示例

以下是此规则的 **错误** 代码示例：

```jsx
<div role="button" />
```

以下是此规则的 **正确** 代码示例：

```jsx
<button />
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.1.1 中添加的。

## 参考资料

<RuleReferences />
