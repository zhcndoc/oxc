---
title: "jsx-a11y/html-has-lang"
category: "Correctness"
version: "0.0.18"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/html_has_lang.rs`;
</script>

<RuleHeader />

### 它的作用

确保每个 HTML 文档都具有 lang 属性。

### 为什么这不好？

如果网页未指定语言，
屏幕阅读器会假定为用户设置的默认语言。
对于使用多种语言并以多种语言访问网站的用户来说，
语言设置会成为一个问题。

### 示例

以下是此规则的**错误**代码示例：

```jsx
<html />
```

以下是此规则的**正确**代码示例：

```jsx
<html lang="en" />
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.18 中添加。

## 参考

<RuleReferences />
