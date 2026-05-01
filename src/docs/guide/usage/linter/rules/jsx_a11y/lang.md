---
title: "jsx-a11y/lang"
category: "正确性"
version: "0.1.1"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/lang.rs`;
</script>

<RuleHeader />

### 它的作用

`<html>` 元素上的 lang 属性必须是有效的 IETF BCP 47 语言标签。

### 为什么这不好？

如果网页的语言没有被指定为有效语言，
屏幕阅读器会假定使用用户设置的默认语言。
对于会说多种语言并以不止一种语言访问网站的用户来说，
语言设置会成为一个问题。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<html>
<html lang="foo">
```

以下是此规则的**正确**代码示例：

```jsx
<html lang="en">
<html lang="en-US">
```

### 资源

- [eslint-plugin-jsx-a11y/lang](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/v6.9.0/docs/rules/lang.md)
- [IANA Language Subtag Registry](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry)

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.1.1 中添加。

## 参考

<RuleReferences />
