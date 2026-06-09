---
title: "eslint/no-implied-eval | Oxlint"
rule: "eslint/no-implied-eval"
category: "Suspicious"
version: "1.66.0"
default: true
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-implied-eval"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_implied_eval.rs`;
</script>

<RuleHeader />

### 它的作用

不允许向 `setTimeout()`、`setInterval()` 和
`execScript()` 传递字符串。

### 为什么这不好？

向这些 API 传递字符串时，会在运行时将该字符串作为 JavaScript 源代码求值。
这与 `eval()` 有许多相同的安全性、可读性和
性能问题。请改为传递函数。

### 示例

此规则的**错误**代码示例：

```js
setTimeout("alert('Hi!')", 100);
setInterval("doWork()", 1000);
window.setTimeout("doWork()", 100);
```

此规则的**正确**代码示例：

```js
setTimeout(() => alert("Hi!"), 100);
setInterval(doWork, 1000);
window.setTimeout(doWork, 100);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.66.0 中新增。

## 参考资料

<RuleReferences />
