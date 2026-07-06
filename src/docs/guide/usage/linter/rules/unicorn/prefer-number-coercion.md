---
title: "unicorn/prefer-number-coercion | Oxlint"
rule: "unicorn/prefer-number-coercion"
category: "Pedantic"
version: "1.71.0"
default: false
type_aware: false
fix: "fixable_suggestion"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-number-coercion.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_number_coercion.rs`;
</script>

<RuleHeader />

### 作用

优先使用 `Number()`，而不是 `parseFloat()` 和以 10 为基数的 `parseInt()`。

### 为什么这不好？

`parseFloat()` 和 `parseInt()` 会解析数字前缀并忽略后面的文本。
`Number()` 会解析完整输入，在进行值转换时更符合预期。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const value = parseFloat(input);
const integer = parseInt(input, 10);
```

以下是此规则的**正确**代码示例：

```javascript
const value = Number(input);
const integer = Math.trunc(Number(input));
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.71.0 中添加。

## 参考文献

<RuleReferences />
