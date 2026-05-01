---
title: "eslint/no-nonoctal-decimal-escape"
category: "Correctness"
version: "0.2.10"
default: true
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_nonoctal_decimal_escape.rs`;
</script>

<RuleHeader />

### 作用

此规则不允许在字符串字面量中使用 \8 和 \9 转义序列。

### 为什么这不好？

ECMAScript 规范将字符串字面量中的 \8 和 \9 视为一种遗留特性

### 示例

此规则的**错误**代码示例：

```javascript
let x = "\8";
let y = "\9";
```

此规则的**正确**代码示例：

```javascript
let x = "8";
let y = "\\9";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v0.2.10 中添加。

## 参考资料

<RuleReferences />
