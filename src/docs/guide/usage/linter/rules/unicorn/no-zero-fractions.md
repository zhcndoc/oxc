---
title: "unicorn/no-zero-fractions | Oxlint"
rule: "unicorn/no-zero-fractions"
category: "Style"
version: "0.0.18"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_zero_fractions.rs`;
</script>

<RuleHeader />

### 它的作用

防止使用零小数部分。

### 这为什么不好？

例如，在 JavaScript 中，`1`、`1.0` 和 `1.` 之间没有区别，因此为了保持一致性和简洁性，建议优先使用前者。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const foo = 1.0;
const foo = -1.0;
const foo = 123_456.000_000;
```

以下是此规则的**正确**代码示例：

```javascript
const foo = 1;
const foo = -1;
const foo = 123456;
const foo = 1.1;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.18 中加入。

## 参考资料

<RuleReferences />
