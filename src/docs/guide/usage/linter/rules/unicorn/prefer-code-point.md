---
title: "unicorn/prefer-code-point"
category: "Pedantic"
version: "0.0.16"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 本文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_code_point.rs`;
</script>

<RuleHeader />

### 它的作用

更倾向于使用 `String.prototype.codePointAt` 而不是 `String.prototype.charCodeAt`。
更倾向于使用 `String.fromCodePoint` 而不是 `String.fromCharCode`。

### 为什么这不好？

Unicode 在 [`String#codePointAt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt) 和 [`String.fromCodePoint()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint) 中支持得更好。

[`String.fromCodePoint()` 和 `String.fromCharCode()` 的区别](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint#compared_to_fromcharcode)

### 示例

此规则的**错误**代码示例：

```javascript
"🦄".charCodeAt(0);
String.fromCharCode(0x1f984);
```

此规则的**正确**代码示例：

```javascript
"🦄".codePointAt(0);
String.fromCodePoint(0x1f984);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.16 中添加的。

## 参考资料

<RuleReferences />
