---
title: "unicorn/prefer-string-slice | Oxlint"
rule: "unicorn/prefer-string-slice"
category: "Pedantic"
version: "0.0.18"
default: false
type_aware: false
fix: "conditional_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-slice.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_string_slice.rs`;
</script>

<RuleHeader />

### 它的作用

优先使用 [`String#slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice) 而不是 [`String#substr()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr) 和 [`String#substring()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring)。

### 为什么这不好？

[`String#substr()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr) 和 [`String#substring()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring) 是两种较少人熟知的、用于截取字符串的旧式方式。最好使用 [`String#slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)，因为它更常用，行为更清晰，并且有一个一致的 [`Array` 对应方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)。

### 示例

此规则的**错误**代码示例：

```javascript
"foo".substr(1, 2);
```

此规则的**正确**代码示例：

```javascript
"foo".slice(1, 2);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.18 中添加。

## 参考资料

<RuleReferences />
