---
title: "unicorn/prefer-regexp-test | Oxlint"
rule: "unicorn/prefer-regexp-test"
category: "Pedantic"
version: "0.0.16"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_regexp_test.rs`;
</script>

<RuleHeader />

### 它的作用

优先使用 `RegExp#test()` 而不是 `String#match()` 和 `String#exec()`。

### 为什么这不好？

当你想知道字符串中是否找到了某个模式时，请使用
[`RegExp#test()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
而不是 [`String#match()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
或 [`RegExp#exec()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)，
因为它只会返回布尔值，因此效率更高。

### 示例

此规则的**错误**代码示例：

```javascript
if (string.match(/unicorn/)) {
}
if (/unicorn/.exec(string)) {
}
```

此规则的**正确**代码示例：

```javascript
if (/unicorn/.test(string)) {
}
Boolean(string.match(/unicorn/));
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.16 中添加的。

## 参考资料

<RuleReferences />
