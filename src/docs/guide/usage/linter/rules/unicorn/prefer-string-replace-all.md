---
title: "unicorn/prefer-string-replace-all | Oxlint"
rule: "unicorn/prefer-string-replace-all"
category: "Pedantic"
version: "0.0.18"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_string_replace_all.rs`;
</script>

<RuleHeader />

### 作用

在使用带有全局标志的正则表达式时，优先使用 [`String#replaceAll()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll) 而不是 [`String#replace()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)。

### 为什么这不好？

[`String#replaceAll()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll) 方法更快也更安全，因为你不必使用正则表达式，也不必在字符串不是字面量时记得对其进行转义。而当它与正则表达式一起使用时，意图也会更加清晰。

### 示例

以下是此规则的**错误**代码示例：

```js
foo.replace(/a/g, bar);
```

以下是此规则的**正确**代码示例：

```js
foo.replace(/a/, bar);
foo.replaceAll(/a/, bar);

const pattern = "not-a-regexp";
foo.replace(pattern, bar);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.18 中添加的。

## 参考资料

<RuleReferences />
