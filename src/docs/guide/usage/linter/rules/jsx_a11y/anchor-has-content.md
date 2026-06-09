---
title: "jsx-a11y/anchor-has-content | Oxlint"
rule: "jsx-a11y/anchor-has-content"
category: "正确性"
version: "0.0.18"
default: false
type_aware: false
fix: "conditional_suggestion"
upstream: "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-has-content.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/anchor_has_content.rs`;
</script>

<RuleHeader />

### 它的作用

强制要求锚点具有内容，并且该内容对屏幕阅读器可访问。
可访问意味着它没有使用 `aria-hidden` 属性隐藏。

或者，你也可以使用 `title` 属性或 `aria-label` 属性。

### 为什么这不好？

没有内容的锚点元素可能会让依赖屏幕阅读器理解内容的用户感到困惑。

### 示例

以下是此规则的**正确**代码示例：

```jsx
<a>锚点内容！</a>
<a><TextWrapper /></a>
<a dangerouslySetInnerHTML={{ __html: 'foo' }} />
<a title='foo' />
<a aria-label='foo' />
```

以下是此规则的**错误**代码示例：

```jsx
<a />
<a><TextWrapper aria-hidden /></a>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.18 中添加。

## 参考资料

<RuleReferences />
