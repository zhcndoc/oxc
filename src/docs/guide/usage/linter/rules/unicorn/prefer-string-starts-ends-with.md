---
title: "unicorn/prefer-string-starts-ends-with | Oxlint"
rule: "unicorn/prefer-string-starts-ends-with"
category: "Correctness"
version: "0.0.18"
default: true
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-starts-ends-with.md"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_string_starts_ends_with.rs`;
</script>

<RuleHeader />

### 它的作用

优先使用 [`String#startsWith()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith) 和 [`String#endsWith()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)，而不是使用 `/^foo/` 或 `/foo$/` 的正则表达式。

::: warning
此规则已弃用。请改用类型感知的 [`typescript/prefer-string-starts-ends-with`](https://oxc.rs/docs/guide/usage/linter/rules/typescript/prefer-string-starts-ends-with.html) 规则。
:::

### 为什么这不好？

使用 `String#startsWith()` 和 `String#endsWith()` 更具可读性，而且性能更好，因为它不需要解析正则表达式。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const foo = "hello";
/^abc/.test(foo);
```

以下是此规则的**正确**代码示例：

```javascript
const foo = "hello";
foo.startsWith("abc");
```

## How to Use

<RuleHowToUse />

## 版本

此规则添加于 v0.0.18。

## 参考资料

<RuleReferences />
