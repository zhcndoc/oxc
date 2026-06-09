---
title: "unicorn/prefer-logical-operator-over-ternary | Oxlint"
rule: "unicorn/prefer-logical-operator-over-ternary"
category: "Style"
version: "0.0.15"
default: false
type_aware: false
fix: "fixable_suggestion"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-logical-operator-over-ternary.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_logical_operator_over_ternary.rs`;
</script>

<RuleHeader />

### 它的作用

此规则会查找可以简化为逻辑运算符的三元表达式。

### 为什么这不好？

使用逻辑运算符比三元表达式更短，也更简单。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const foo = bar ? bar : baz;
console.log(foo ? foo : bar);
```

以下是此规则的**正确**代码示例：

```javascript
const foo = bar || baz;
console.log(foo ?? bar);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.15 中添加的。

## 参考资料

<RuleReferences />
