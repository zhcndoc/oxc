---
title: "unicorn/escape-case | Oxlint"
rule: "unicorn/escape-case"
category: "Pedantic"
version: "0.0.19"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/escape-case.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/escape_case.rs`;
</script>

<RuleHeader />

### 作用

强制使用大写字符而不是小写字符来定义转义序列值。
这通过使转义值与标识符更易区分来提升可读性。

### 为什么这不好？

在转义序列中使用小写字符会降低可读性，并使其更难与周围代码区分。
大多数样式指南都建议使用大写以保持一致性和清晰性。

### 示例

此规则的**错误**代码示例：

```javascript
const foo = "\xa9";
const foo = "\ud834";
const foo = "\u{1d306}";
const foo = "\ca";
```

此规则的**正确**代码示例：

```javascript
const foo = "\xA9";
const foo = "\uD834";
const foo = "\u{1D306}";
const foo = "\cA";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.19 中添加。

## 参考资料

<RuleReferences />
