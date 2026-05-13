---
title: "eslint/prefer-numeric-literals | Oxlint"
rule: "eslint/prefer-numeric-literals"
category: "Style"
version: "0.7.0"
default: false
type_aware: false
fix: "conditional_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/prefer_numeric_literals.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用 `parseInt()` 和 `Number.parseInt()`，而应使用二进制、八进制和十六进制
字面量。

### 为什么这不好？

`parseInt()` 和 `Number.parseInt()` 函数可用于将二进制、八进制和
十六进制字符串转换为整数。由于二进制、八进制和十六进制字面量已在 ES2015 中得到支持，
此规则鼓励使用这些数值字面量，而不是 `parseInt()` 或
`Number.parseInt()`。

### 示例

以下是此规则的**错误**代码示例：

```javascript
parseInt("111110111", 2) === 503;
parseInt(`111110111`, 2) === 503;
parseInt("767", 8) === 503;
parseInt("1F7", 16) === 503;
Number.parseInt("111110111", 2) === 503;
Number.parseInt("767", 8) === 503;
Number.parseInt("1F7", 16) === 503;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.7.0。

## 参考资料

<RuleReferences />
